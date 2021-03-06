import React, { useEffect, useState } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import * as actions from "../../actions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const MAX_UN_LEN = 20;
const MIN_PW_LEN = 8;
const MAX_PW_LEN = 100;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    "&:-webkit-autofill:active": {
      WebkitBoxShadow: "0 0 0 1000px black inset",
      backgroundColor: "black",
    },
  },
}));

// Field renderer so Material-UI works with Redux Form
const renderTextField = ({ label, input, ...custom }) => (
  <TextField
    label={label}
    fullWidth
    variant="filled"
    autoComplete="new-password"
    margin="normal"
    placeholder={label}
    {...input}
    {...custom}
  />
);

function SignupCard(props) {
  const dispatch = useDispatch();
  const { handleSubmit } = props;
  const classes = useStyles();

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = (formProps) => {
    let valid = true;

    formProps.username = formProps.username.trim();
    formProps.password = formProps.password.trim();

    // Test username for forbidden characters
    if (/[!$%^&*()+|\s~=`\\#{}\[\]:";'<>?,\/]/.test(formProps.username)) {
      valid = false;
      setUsernameError("Username contains forbidden character(s).");
    }

    // Test password for forbidden characters
    if (/[\s]/.test(formProps.password)) {
      valid = false;
      setPasswordError("Password cannot contain spaces.");
    }

    return valid;
  };

  const onSubmit = (formProps) => {
    if (validateForm(formProps)) {
      // Callback navigates user to '/home' path when they sign in
      props.signup(formProps, () => {
        // The 'history' prop comes from Redux Router
        props.history.push("/home");
      });
    }
  };

  // Clears error message when component mounts
  useEffect(() => {
    dispatch(props.clearError());
  }, []);

  return (
    // Destructure handleSubmit from props object (provided by reduxForm)
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Field
            className={classes.textField}
            name="username"
            component={renderTextField}
            label="Username"
            helperText={usernameError}
            inputProps={{
              maxLength: MAX_UN_LEN,
            }}
            required
          />
          <Field
            className={classes.textField}
            name="password"
            component={renderTextField}
            label="Password"
            type="password"
            helperText={passwordError}
            inputProps={{
              minLength: MIN_PW_LEN,
              maxLength: MAX_PW_LEN,
            }}
            required
          />
          <Typography variant="subtitle1" style={{ color: "red" }}>
            {props.errorMessage}
          </Typography>
          <Typography variant="subtitle1">
            Already have an account? Sign in{" "}
            <Link href="/signin" style={{ color: "#4791db" }}>
              here
            </Link>
            .
          </Typography>
          <Button
            className={classes.submit}
            type="submit"
            color="primary"
            variant="contained"
          >
            Sign up
          </Button>
        </form>
      </div>
    </Container>
  );
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

// compose() just allows us to apply multiple HOCs to a single component with better syntax
export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signup" })
)(SignupCard);
