import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { useState, useRef } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
const styles = makeStyles({
  form_group: {
    display: "flex",
    justifyContent: "space-between",
  },
});
const TherapyFormGroup = ({
  onService,
  onQuantity,
  onCloseField,
  id,
  quantity,
  services,
  serviceName = "",
}) => {
  const [search, setSearch] = useState(false);
  const [name, setName] = useState(serviceName);
  const ref = useRef(null);
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <TextField
          id="service"
          label="Shërbimi"
          type="text"
          ref={ref}
          value={name}
          variant="outlined"
          onChange={(e, value) => {
            setSearch(true);
            setName(e.target.value);
          }}
        />
        {search && (
          <List component="div">
            {services
              .filter((service) => service.name.toLowerCase().startsWith(name))
              .map((service) => (
                <ListItem
                  button
                  onClick={() => {
                    setName(service.name);
                    setSearch(false);
                    onService(id, service);
                  }}
                >
                  <ListItemText
                    primary={`${service.name} | ${service.price} Euro`}
                  />
                </ListItem>
              ))}
          </List>
        )}
      </Box>
      <Box>
        <TextField
          id="quantity"
          label="Sasia"
          type="number"
          value={quantity}
          variant="outlined"
          onChange={(event, value) => onQuantity(id, event.target.value)}
        />
        <IconButton color="secondary" onClick={() => onCloseField(id)}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TherapyFormGroup;
