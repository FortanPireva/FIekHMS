import React, { useState, useEffect } from "react";
import http from "../service/httpService";

import Card from "./general/AppCard";
import AppCard from "./general/AppCard";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import applinks from "../util/applinks";

const useStyles = makeStyles({
  cardContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
});
export const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [networkNotAvailable, setNetworkNotAvailable] = useState(false);
  const [retryNetwork, setRetryNetwork] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchDate = async () => {
      const data = await http.getPatients({ size: 5 });

      if (!data.error) {
        setNetworkNotAvailable(false);
        setPatients(data);
        setFilteredPatients(data);
      } else {
        setNetworkNotAvailable(true);
      }
    };
    fetchDate();
  }, [retryNetwork]);

  const handleDelete = async (patient) => {
    const oldpatients = [...patients];
    setPatients(patients.filter((p) => patient.id !== p.id));
    setFilteredPatients(patients.filter((p) => patient.id !== p.id));
    const data = await http.deletePatient(patient.id);
    console.log(data);
    if (data.error) {
      setPatients(oldpatients);
    }
  };
  const handleEdit = (id) => {
    history.push(applinks.editPatient + "/" + id);
  };

  const handleMore = (id) => {
    history.push(applinks.patients + "/" + id + applinks.reports);
  };
  const classes = useStyles();

  const search = (e) => {
    const value = e.target.value;

    if (value === "") {
      setFilteredPatients(patients);
      return;
    }
    const newpatients = patients.filter((p) =>
      p.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredPatients(newpatients);
  };
  return (
    <div className={classes.cardContainer}>
      <TextField
        id="name"
        label="Emri i Pacientit"
        margin="normal"
        variant="outlined"
        onChange={search}
        onKeyPress={(e) => {
          console.log(e.key);
        }}
        onFocus={(e) => {
          e.target.value = "";
        }}
      />
      {filteredPatients.length > 0 &&
        filteredPatients.map((patient) => (
          <AppCard
            patient={patient}
            onDelete={() => handleDelete(patient)}
            onEdit={() => handleEdit(patient.id)}
            handleMore={() => handleMore(patient.id)}
          />
        ))}
      {networkNotAvailable && (
        <div>
          <h1>Rrjeti nashta so ka bon</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setRetryNetwork(!retryNetwork)}
          >
            Provo përsëri
          </Button>
        </div>
      )}
    </div>
  );
};
