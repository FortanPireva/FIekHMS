import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Divider, Typography, Button } from "@material-ui/core";
import http from "../../service/httpService";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [showSnackBar, setShowSnackbar] = useState(false);
  const [remoteError, setRemoteError] = useState(false);
  const [info, setInfo] = useState("");
  const useStyle = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& > *": {
        flex: 1,
        margin: "20px 0",
        width: "50%",
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));
  const classes = useStyle();

  const handleSubmit = async () => {
    const data = {
      email: email,
      password: password,
    };
    setShowBackDrop(true);
    const info = await http.postPatient(data);
    console.log("Info " + JSON.stringify(info));
    if (info.error) setRemoteError(true);
    setInfo(info);
    setShowBackDrop(false);
    setShowSnackbar(true);
  };
  return (
    <Container maxWidth="md">
      <Backdrop
        className={classes.backdrop}
        open={showBackDrop}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form className={classes.root} noValidate autoComplete="off">
        <Typography variant="h4" component="h4" display="inline">
          Login
        </Typography>
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="address"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Login
        </Button>
        <Snackbar
          open={showSnackBar}
          autoHideDuration={3000}
          onClose={() => {
            setShowSnackbar(false);
          }}
        >
          <Alert severity={remoteError ? "error" : "success"}>
            {info.info}
          </Alert>
        </Snackbar>
      </form>
    </Container>
  );
};

export default Login;
