import React from "react";
import Drawer from "./components/ResponsiveDrawer";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Drawer />
      </div>
    </Router>
  );
}

export default App;
