import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { handleResponse } from "variables/serverFunc.jsx";
import { withStyles } from "@material-ui/core/styles";
import TaskCard from "../../components/TaskCard/TaskCard.jsx";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";

const style = {
  container: {
    padding: 75
  },
  nav: {
    padding: 20
  },
  item: {
    padding: 15
  },
  button: {
    margin: 10
  },
  textField: {

  }
}

function TaskArray(props) {
  const { classes, match } = props;

  const [tasks, setTasks] = useState([]);
  const [filtedTask, setFiltedTask] = useState([]);
  const [values, setValues] = useState({});

  React.useEffect(fetchTaskList, []);

  function fetchTaskList() {
    const apiUrl = "https://littlefish33.cn:8080/questionnaire/previews/valid";
    const requestOption = {
      method: "GET"
    };

    fetch(apiUrl, requestOption)
      .then(handleResponse)
      .then(response => {
        let ret = [];
        if (response !== null) {
          for (let i = 0; i < response.length; i++) {
            let task = response[i];
            let details = {
              taskID: task.taskID,
              reward: task.money,
              missionType: task.taskType,
              finishedNumber: task.finishedNumber,
              totalNumber: task.number,
              startTime: task.publishTime,
              endTime: task.endTime,
              description: task.description
            };

            ret.push({
              title: task.taskName,
              ownership: task.creator,
              details: details
            });
          }
        }
        setTasks(ret);
        setFiltedTask(ret);
      });
  }

  const createViews = elem => {
    return (
      <Grid className={classes.item} item xs={4}>
        <TaskCard title={elem.title} ownership={elem.ownership} details={elem.details} match={match}/>
      </Grid>
    );
  };

  function stringToDate(time) {
    // 一个字符串  2019-06-12T12:00 转为 Date对象
    // let time = _time.toString();
    console.log("stringToDate");
    if (time.length !== 16) return null;
    console.log("stringToDate valid");
    let year = time.slice(0, 4);
    let month = time.slice(5, 7);
    let day = time.slice(8, 10);
    let min = time.slice(11, 13);
    let sec = time.slice(14, 16);
    let date = new Date(year, month - 1, day, min, sec);
    return date;
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const filterButtonClick = () => {
    let moneyParam = {
      min: parseInt(values.moneyMin),
      max: parseInt(values.moneyMax)
    }
    let temp = stateFilter(tasks, moneyFilter, moneyParam);

    let searchParam = {
      keyWord: values.search
    }
    temp = stateFilter(temp, searchFilter, searchParam);

    let timeParam = {
      begin: values.beginTime,
      end: values.endTime
    };
    console.log("time filter");
    //temp = stateFilter(temp, timeFilter, timeParam);

    setFiltedTask(temp);
  }

  const stateFilter = (arr, func, param) => {
    console.log("state filter");
    let ret = [];
    for (let task of arr) {
      console.log(task);
      if (func(task, param)) ret.push(task);
    }
    return ret;
  };

  const searchFilter = (task, param) => {
    return task.title.indexOf(param.keyWord) !== -1;
  }

  const moneyFilter = (task, param) => {
    let money = parseInt(task.details.reward);
    return (
      (isNaN(param.min) || money >= param.min) &&
      (isNaN(param.max) || money <= param.max)
    );
  };

  const timeFilter = (task, param) => {
    let taskBegin = stringToDate(task.details.startTime);
    let taskEnd = stringToDate(task.details.endTime);
    let paramBegin = stringToDate(param.begin);
    let paramEnd = stringToDate(param.end);

    console.log(taskBegin);
    console.log(taskEnd);
    console.log(paramBegin);
    console.log(paramEnd);
    return (
      (paramBegin === null || taskBegin >= paramBegin) &&
      (paramEnd === null || (taskEnd !== null && taskEnd <= paramEnd))
    );
  };

  return (
    <div>
      <Grid className={classes.nav} container spacing={2}>
        <Grid className={classes.item} item xs={2}>
          <TextField
            id="outlined-name"
            label="搜索"
            className={classes.textField}
            value={values.search}
            onChange={handleChange("search")}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid className={classes.item} item xs={2}>
          <TextField
            id="datetime-local"
            label="开始时间"
            type="datetime-local"
            onChange={handleChange("beginTime")}
            value={values.beginTime}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid className={classes.item} item xs={2}>
          <TextField
            id="datetime-local"
            label="终止时间"
            type="datetime-local"
            onChange={handleChange("endTime")}
            value={values.endTime}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid className={classes.item} item xs={2}>
          <TextField
            id="outlined-number"
            label="最小"
            value={values.moneyMin}
            onChange={handleChange("moneyMin")}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid className={classes.item} item xs={2}>
          <TextField
            id="outlined-number"
            label="最大"
            value={values.moneyMax}
            onChange={handleChange("moneyMax")}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid className={classes.item} item xs={2}>
          <Button variant="contained" color="primary" className={classes.button} onClick={filterButtonClick}>
            筛选
          </Button>
        </Grid>
      </Grid>
      <Grid className={classes.container} container spacing={2}>
        {filtedTask.map(createViews)}
      </Grid>
    </div>
  );
}

export default withStyles(style)(TaskArray);