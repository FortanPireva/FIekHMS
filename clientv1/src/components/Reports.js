import React, { useState, useEffect } from "react";
import http from "../service/httpService";
import AppCard from "./general/AppCard";
import { makeStyles } from "@material-ui/core/styles";
import applinks from "../util/applinks";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  cardContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
});
const Reports = () => {
  const [reports, setReports] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const fetchDate = async () => {
      const data = await http.getReports();
      console.log(data);
      setReports(data);
    };
    fetchDate();
  }, []);
  const classes = useStyles();
  const handlePrint = (id) => {
    window.open(`${http.baseURL}/pdf?id=${id}`);
  };
  const handleDelete = async (report) => {
    const oldreports = [...reports];
    setReports(reports.filter((r) => report._id !== r._id));
    const data = await http.deleteReport(report._id);
    console.log(data);
    if (data.error) {
      setReports(oldreports);
    }
  };
  const handleEdit = (_id) => {
    history.push(applinks.editReport + "/" + _id);
  };
  return (
    <div className={classes.cardContainer}>
      {reports &&
        reports.map((report) => (
          <AppCard
            onDelete={() => handleDelete(report)}
            onEdit={() => {
              handleEdit(report._id);
            }}
            report={report}
            patient={report.patient}
            handleMore={() => handlePrint(report._id)}
          />
        ))}
    </div>
  );
};

export default Reports;
