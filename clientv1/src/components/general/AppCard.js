import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import dateFormatter from "../../util/dateFormat";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { Avatar, Button } from "@material-ui/core";

const useStyle = makeStyles({
  avatar: {
    backgroundColor: red[500],
  },
  card: {
    margin: "2%",
    padding: "1%",
    minWidth: "400px",
  },
  more: {
    marginLeft: "auto",
  },
});

const AppCard = ({ patient, onEdit, onDelete, report, handleMore }) => {
  const classes = useStyle();
  console.log(patient);
  return (
    <Card key={report ? report.id : patient.id} className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="user-name" className={classes.avatar}>
            {patient.firstName && patient.firstName.substr(0, 1)}
          </Avatar>
        }
        title={patient.firstName + " " + patient.lastName}
        subheader={`${report ? "Kontrolluar" : "Regjistruar"} me date ${
          report ? dateFormatter(report.date) : dateFormatter(patient.createdAt)
        }`}
      />
      <CardContent>
        {!report && (
          <>
            <Typography>
              {patient.birthDay
                ? `Datelindja ${dateFormatter(patient.birthDay)}`
                : `Viti i lindjes ${patient.yearOfBirth}`}
            </Typography>
            <Typography>Adresa:{patient.address}</Typography>
          </>
        )}
        {report && (
          <>
            <Typography>
              Shtypja Minimale {report.anamnesis.tension.min} mmHg
            </Typography>
            <Typography>
              Shtypja Maksimale {report.anamnesis.tension.max} mmHg
            </Typography>
            <Typography>Saturimi {report.anamnesis.saturation} SpO2</Typography>
            <Typography>Pulsi {report.anamnesis.pulse}</Typography>
          </>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <Button color="secondary" onClick={onDelete}>
          <Typography>Fshije</Typography>
        </Button>
        <Button color="primary" onClick={onEdit}>
          <Typography>Edito</Typography>
        </Button>
        {!report && (
          <Button color="primary" className={classes.more} onClick={handleMore}>
            <Typography>Vizitat Mjekesore</Typography>
          </Button>
        )}
        {report && (
          <Button color="primary" className={classes.more} onClick={handleMore}>
            <Typography>Printo</Typography>
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default AppCard;
