import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  lisitem: {
    cursor: "pointer",
  },
});
const AppListItem = ({ data }) => {
  const classes = useStyles();

  return (
    <div>
      <ListItem
        button
        component={Link}
        to={data.link}
        className={classes.lisitem}
      >
        {data.icon && (
          <ListItemIcon>
            <data.icon />
          </ListItemIcon>
        )}

        <ListItemText primary={data.title} />
      </ListItem>
    </div>
  );
};

export default AppListItem;
