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
import { useHistory, useParams } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EditPatient = () => {
  const [name, setName] = useState();
  const [address, setAddress] = useState("Fushe Kosove");
  const [date, setDate] = useState();
  const [year, setYear] = useState();
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [showSnackBar, setShowSnackbar] = useState(false);
  const [remoteError, setRemoteError] = useState(false);
  const [info, setInfo] = useState("");

  const { id } = useParams();
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

  useEffect(() => {
    const fetchPatient = async () => {
      console.log(id);
      const data = await http.getPatient(id);
      console.log(data);
      if (data.birthday) setDate(data.birthday);
      if (data.yearOfBirth) {
        setYear(data.yearOfBirth);
      }
      setName(data.name);
      setAddress(data.address);
    };
    fetchPatient();
  }, [id]);
  const handleDateChange = (date) => {
    setDate(date);
  };
  const handleSubmit = async () => {
    const data = {
      _id: id,
      name: name,
      address,
      year,
      birthday: date,
    };
    setShowBackDrop(true);
    const info = await http.editPatient(data);
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
          Edito te Dhenat e Pacientit
        </Typography>
        <TextField
          id="name"
          label="Emri dhe Mbiemri  i Pacientit"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="address"
          label="Adresa e Pacientit"
          value={address || ""}
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
          value={year || ""}
          onChange={(e) => setYear(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Perditeso
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

export default EditPatient;
