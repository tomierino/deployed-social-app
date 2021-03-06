import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AccountMenu from "./AccountMenu";
import { ReactComponent as Octopus } from "../images/octopus.svg";
import ScrollToTop from "./ScrollToTop";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    background: "#212121",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: {
    height: 72,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  divider: {
    display: "inline",
    height: "50px",
  },
  homeButton: {
    padding: "8px",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

function Header(props) {
  const classes = useStyles();
  let homeLink = "";

  if (props.authenticated) {
    homeLink = "/home";
  } else {
    homeLink = "/";
  }

  const renderLinks = () => {
    if (props.authenticated) {
      // User is signed in
      return (
        <div>
          {/* <Link to="/signout" style={{ textDecoration: "inherit" }}>
            <Button>Sign out</Button>
          </Link>
          <Divider
            className={classes.divider}
            variant="middle"
            orientation="vertical"
          /> */}
          <AccountMenu />
        </div>
      );
    } else {
      // User is not signed in
      return (
        <Typography>
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <Button className={classes.menuButton}>Sign in</Button>
          </Link>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button color="primary" variant="contained">
              Sign up
            </Button>
          </Link>
        </Typography>
      );
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar} position="fixed">
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <Typography
              component="h1"
              variant="h5"
              noWrap
              className={classes.title}
            >
              <Link to={homeLink}>
                <IconButton className={classes.homeButton} disableRipple>
                  <Octopus style={{ width: "60px", height: "60px" }} />
                </IconButton>
              </Link>
            </Typography>
            {renderLinks()}
          </Toolbar>
        </Container>
      </AppBar>
      <ScrollToTop />
      <div className={classes.appBarSpacer} />
    </div>
  );
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
