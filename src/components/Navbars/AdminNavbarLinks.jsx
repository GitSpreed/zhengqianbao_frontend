import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

import NotificationsPage from "views/Notifications/Notifications.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import { handleResponse } from "variables/serverFunc.jsx";
import { Link, Route } from "react-router-dom";

const apiUrl = "https://littlefish33.cn:8080";

class HeaderLinks extends React.Component {
<<<<<<< HEAD
  
  
=======
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      notReadNum: 1
    };
  }
>>>>>>> 8eacbbc7b342bcc5dd501a9361671333e6192ac6

  constructor(props){
    
    super(props);
    if(!localStorage.getItem('user-token')){
      console.log(this.props);
      this.props.history.push('/login');
      //console.log("XXX");
    }
    this.state = {
      open: false,
      notReadNum: 1
    };
<<<<<<< HEAD
  }

  componentDidMount = () => {
    if(!localStorage.getItem('user-token')){
      //console.log("XXX");
    }else{
      // 获取未读消息数目,显示在logo上
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user-token")
=======

    fetch(apiUrl + "/message/count", requestOptions)
      .then(handleResponse)
      .then(response => {
        if (response.code === 200) {
          this.setState({ notReadNum: response.msg });
>>>>>>> 8eacbbc7b342bcc5dd501a9361671333e6192ac6
        }
      };
      fetch(apiUrl + "/message/count", requestOptions)
        .then(handleResponse)
        .then(response => {
          if (response.code === 200) {
            this.setState({ notReadNum: response.msg });
          }
        });
    }
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div>
        <div className={classes.searchWrapper}>
          <CustomInput
            formControlProps={{
              className: classes.margin + " " + classes.search
            }}
            inputProps={{
              placeholder: "Search",
              inputProps: {
                "aria-label": "Search"
              }
            }}
          />
          <Button color="white" aria-label="edit" justIcon round>
            <Search />
          </Button>
        </div>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Dashboard"
          className={classes.buttonLink}
        >
          <Dashboard className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Dashboard</p>
          </Hidden>
        </Button>
        <div className={classes.manager}>
          <Link to="/notifications">
            <Button
              buttonRef={node => {
                this.anchorEl = node;
              }}
              color={window.innerWidth > 959 ? "transparent" : "white"}
              justIcon={window.innerWidth > 959}
              simple={!(window.innerWidth > 959)}
              aria-owns={open ? "menu-list-grow" : null}
              aria-haspopup="true"
              onClick={this.handleToggle}
              className={classes.buttonLink}
            >
              <Notifications className={classes.icons} />
              {this.state.notReadNum !== "0" && (
                <span className={classes.notifications}>
                  {" "}
                  {this.state.notReadNum}{" "}
                </span>
              )}
            </Button>
          </Link>
        </div>
        <Link to="/user">
          <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-label="Person"
            className={classes.buttonLink}
          >
            <Person className={classes.icons} />
            <Hidden mdUp implementation="css">
              <p className={classes.linkText}>Profile</p>
            </Hidden>
          </Button>
        </Link>
        <Route path="/notifications" />
        <Route path="/user" />
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
