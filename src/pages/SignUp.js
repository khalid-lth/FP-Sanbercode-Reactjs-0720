import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SideBar from "../layout/sidebar"
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "grey"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
      margin:"auto",
      borderRadius: "50px",
      minWidth: "450px",
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [input, setInput] = useState({ username: "", password: "" });
  const [statusForm] = useState("register");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (statusForm === "register") {
      axios
        .post(`https://backendexample.sanbersy.com/api/users`, {
          username: input.username,
          password: input.password,
        })
        .then((res) => {
          console.log(res);
        });
    }
    setInput({
      username: "",
      password: "",
    });
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    switch (name) {
      case "username": {
        setInput({ ...input, username: value });
        break;
      }
      case "password": {
        setInput({ ...input, password: value });
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
    <SideBar/>
    <Card className={classes.root}>
      <CardContent>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="username"
            autoComplete="off"
            autoFocus
            onChange={handleChange}
            value={input.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={input.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link style={{textDecoration:"none"}} to="/login" variant="body2">
                {"Sign In!"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
      </CardContent>
    </Card>
    </Container>
  );
};

export default SignUp;
