import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Divider, Typography, Button } from "@material-ui/core";
import http from "../service/httpService";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const RegisterPatient = () => {
  const [name, setName] = useState();
  const [address, setAddress] = useState("Fushe Kosove");
  const [date, setDate] = useState();
  const [year, setYear] = useState();
  const [enableYear, setEnableYear] = useState(false);
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

  const handleDateChange = (date) => {
    setDate(date);
    if (date !== null) setEnableYear(true);
    if (date == null) setEnableYear(false);
  };
  const handleSubmit = async () => {
    const data = {
      name: name,
      address,
      year,
      birthday: date,
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
    <div>
      <Backdrop
        className={classes.backdrop}
        open={showBackDrop}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form className={classes.root} noValidate autoComplete="off">
        <Typography variant="h4" component="h4" display="inline">
          Formular i Regjistrimit te Pacienteve
        </Typography>
        <TextField
          id="name"
          label="Emri dhe Mbiemri  i Pacientit"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="address"
          label="Adresa e Pacientit"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date Lindja"
            format="dd/MM/yyyy"
            value={date}
            onChange={handleDateChange}
            onBlur={() => {}}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <TextField
          id="year"
          label="Viti i lindjes"
          type="number"
          disabled={enableYear}
          onChange={(e) => setYear(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Regjistro
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
    </div>
  );
};

export default RegisterPatient;
