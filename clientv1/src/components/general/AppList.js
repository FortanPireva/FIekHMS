import React from "react";
import ListItem from "./AppListItem";
import List from "@material-ui/core/List";
const AppList = ({ data }) => {
  return (
    <List>
      {data.map((d) => (
        <ListItem data={d} key={d.title} />
      ))}
    </List>
  );
};

export default AppList;
