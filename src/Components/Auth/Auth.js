import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import bcrypt from "bcryptjs";

import {
  Avatar,
  Paper,
  Grid,
  Container,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import LockOutLinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signin, signup } from "../../action/auth";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

function Auth() {
  const [formData, setFormData] = useState(initialState);
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const state = null;
  const dispatch = useDispatch();
  const history = useHistory();

  const [isSignup, setIsSignUp] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // setFormData((prevval) => {
    //   ...prevavl,
    //   [name]:value,
    //  });
  };
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const googleSuccess = async (res) => {
    console.log(res);
    const result = await res?.profileObj;
    const token = await res?.tokenId;
    console.log(result);
    try {
      dispatch({
        type: "AUTH",
        data: {
          result,
          token,
        },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="842199201294-bk59f2dstfooqhpq4icnhg11mf81gm1f.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Sign In With Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
          />

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
