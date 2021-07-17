import React, { useEffect, useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Divider, Typography, ListItemText } from "@material-ui/core";
import dateFormatter from "../util/dateFormat";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import http from "../service/httpService";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import AddIcon from "@material-ui/icons/Add";
import TherapyFormGroup from "./TherapyFormGroup";
import _ from "lodash";
const RegisterReport = () => {
  const [selectedDate, setSelectedDate] = React.useState(Date.now());
  const [minHg, setMinHg] = useState();
  const [maxHg, setMaxHg] = useState();
  const [saturation, setSaturation] = useState();
  const [pulse, setPulse] = useState();
  const [fatura, setFatura] = useState(false);
  const [kupon, setKupon] = useState(false);
  const [patients, setPatients] = useState([]);
  const [id, setId] = useState();
  const [error, setError] = useState(false);
  const [showSnackBar, setShowSnackbar] = useState(false);
  const [info, setInfo] = useState("");
  const [remoteError, setRemoteError] = useState(false);
  const [therapy, setTherapy] = useState([]);
  const [services, setServices] = useState([]);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const nameRef = useRef(null);
  const therapyReference = null;

  const setTherapyReference = (element) => (therapyReference = element);
  const useStyle = makeStyles({
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
    list: {
      margin: 0,
    },
    name: {
      margin: 0,
    },
    therapybutton: {
      width: 200,
      marginLeft: 500,
    },
  });
  const classes = useStyle();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const search = async (e) => {
    const data = await http.getPatients({ search: e.target.value });
    if (!data.error) {
      setPatients(data);
    }
  };
  const handleListClick = (patient) => {
    nameRef.current.value = patient.name;
    setError(false);

    setId(patient._id);
    setPatients([]);
  };

  const addTherapyField = async () => {
    setTherapy((therapy) => [
      ...therapy,
      { id: _.uniqueId(), service: {}, quantity: 1 },
    ]);
    if (services.length == 0) {
      const data = await http.getServices();
      console.log(data);
      if (!data.error) {
        setServices(data);
      }
    }
  };
  const handleService = (id, value) => {
    console.log(value);
    const index = therapy.findIndex((th) => th.id === id);
    therapy[index].service = value;
    console.log(therapy);
    setTherapy(therapy);
  };
  const handleQuantity = (id, value) => {
    const index = therapy.findIndex((th) => th.id === id);
    therapy[index].quantity = value;
    setTherapy(therapy);
  };
  const handleCloseTherapyForm = (id) => {
    const newTherapy = therapy.filter((th) => th.id !== id);
    setTherapy(newTherapy);
  };
  const handleSubmit = async () => {
    const data = {
      _id: id,
      min: minHg,
      max: maxHg,
      pulse,
      saturation,
      therapy,
    };
    console.log(data);
    const info = await http.postReport(data);
    console.log("Info " + info);
    if (info.error) setRemoteError(true);
    setInfo(info);
    setShowSnackbar(true);
    window.open(`${http.baseURL}/pdf?id=${info.id}`, "_blank");
  };
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <h1>Formular i Regjistrimit te Vizites Mjekesore</h1>

        <TextField
          id="name"
          label="Emri i Pacientit"
          margin="normal"
          variant="outlined"
          onChange={search}
          className={classes.name}
          inputRef={nameRef}
          error={error}
          onKeyPress={(e) => {
            console.log(e.key);
            if (e.key == "Enter" && !id) setError(true);
          }}
          onFocus={(e) => {
            setError(false);
            e.target.value = "";
            setId(false);
          }}
          helperText={
            error && "Nuk u gjet ndonje pacient.Regjistro nje te tille."
          }
        />
        {patients && (
          <List component="div" className={classes.list}>
            {patients.map((patient) => (
              <ListItem button onClick={() => handleListClick(patient)}>
                <ListItemText
                  primary={`${patient.name} ${
                    dateFormatter(patient.birthday) || patient.yearOfBirth
                  }`}
                />
              </ListItem>
            ))}
          </List>
        )}
        <Divider />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Tensioni</Typography>
          <TextField
            id="minpressure"
            label="Shtypja Minimale"
            type="number"
            variant="outlined"
            onChange={(e) => {
              setMinHg(e.target.value);
            }}
          />
          <TextField
            id="maxpressure"
            label="Shtypja Maksimale"
            type="number"
            variant="outlined"
            onChange={(e, value) => {
              setMaxHg(e.target.value);
            }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <TextField
            id="saturation"
            label="Saturimi"
            type="number"
            variant="outlined"
            onChange={(e, value) => {
              setSaturation(e.target.value);
            }}
          />
          <TextField
            id="Pulsi"
            label="Pulsi"
            type="number"
            variant="outlined"
            onChange={(e, value) => {
              setPulse(e.target.value);
            }}
          />
        </Box>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Data e vizites"
            format="dd/MM/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <FormControlLabel
          control={
            <Checkbox
              checked={fatura}
              onChange={() => setFatura(!fatura)}
              name="fatura"
              color="primary"
            />
          }
          label="Shtyp dhe faturen"
        />
        <FormControlLabel
          checked={kupon}
          onChange={() => setKupon(!kupon)}
          control={<Checkbox name="kupon" color="primary" />}
          label="Raport me kupon fiskal"
          checked={kupon}
        />
        {therapy &&
          therapy.map((th) => (
            <TherapyFormGroup
              key={th.id}
              id={th.id}
              name={th.name}
              quantity={th.quantity}
              onService={handleService}
              onQuantity={handleQuantity}
              onCloseField={handleCloseTherapyForm}
              services={services}
            />
          ))}
        <Button
          className={classes.therapybutton}
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={addTherapyField}
        >
          Shto terapi
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Regjistro
        </Button>
      </form>

      <Snackbar
        open={showSnackBar}
        autoHideDuration={3000}
        onClose={() => {
          setShowSnackbar(false);
        }}
      >
        <Alert severity={remoteError ? "error" : "success"}>
          {info && info.info}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisterReport;
