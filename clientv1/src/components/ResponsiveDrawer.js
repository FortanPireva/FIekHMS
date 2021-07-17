import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import PersonIcon from "@material-ui/icons/Person";
import ReceiptIcon from "@material-ui/icons/Receipt";
import GroupIcon from "@material-ui/icons/Group";
import CheckIcon from "@material-ui/icons/Check";
import applinks from "../util/applinks";
import { Switch, Route } from "react-router-dom";
import Reports from "./Reports";
import { Patients } from "./Patients";
import RegisterPatient from "./RegisterPatient";
import RegisterReport from "./RegisterReport";
import AppList from "./general/AppList";
import { Edit } from "@material-ui/icons";
import EditPatient from "./EditPatient";
import EditReport from "./EditReport";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const links = [
  {
    title: "Regjistro Kontrollë",
    icon: ReceiptIcon,
    link: applinks.registerReport,
  },
  {
    title: "Regjistro Pacient",
    icon: PersonIcon,
    link: applinks.registerPatient,
  },
  { title: "Pacientët", icon: GroupIcon, link: applinks.patients },

  { title: "Raportet Mjekesore", icon: ReceiptIcon, link: applinks.reports },

  { title: "Validetit per rikontrolle", icon: CheckIcon },
];
const reports = [
  { title: "Raportet Ditore", icon: ReceiptIcon, link: "/" },
  { title: "Raportet Javore", icon: ReceiptIcon, link: "/" },
  { title: "Raportet Mujore", icon: ReceiptIcon, link: "/" },
];
function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <AppList data={links} />

      <Divider />
      <AppList data={reports} />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Ordinanca Jeta
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path={applinks.reports}>
            <Reports />
          </Route>
          <Route path={applinks.patients}>
            <Patients />
          </Route>
          <Route path={applinks.registerPatient}>
            <RegisterPatient />
          </Route>
          <Route path={applinks.registerReport}>
            <RegisterReport />
          </Route>

          <Route
            path={applinks.editPatient + "/:id"}
            children={<EditPatient />}
          />

          <Route
            path={applinks.editReport + "/:id"}
            children={<EditReport />}
          />
          <Route>
            <h1>No Route found</h1>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
