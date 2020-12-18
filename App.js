import React from 'react';
import ClassComp from "./components/classcomp"
import {Route,Link,BrowserRouter as Router} from "react-router-dom";
import Schedule from "./components/schedule";



function App() {
  return (
    <Router>
    
    <Route path="/" exact component = {ClassComp}/>
    <Route path="/schedule" component = {Schedule}/>
   
    </Router>
  );
}

export default App;