import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Landing, Login, SignUp, Home, ErrorFallback } from "./index.js";
import "../Assets/CSS/Design-System.css";

// eslint-disable-next-line no-unused-vars
const HandleErrorFallback = ({ error }) => {
   return <ErrorFallback />;
};

const App = () => {
   return (
      <Router>
         <ErrorBoundary FallbackComponent={HandleErrorFallback}>
            <Switch>
               <Route exact path="/">
                  <Landing />
               </Route>
               <Route exact path="/login">
                  <Login />
               </Route>
               <Route exact path="/signup">
                  <SignUp />
               </Route>
               <Route path="/home">
                  <Home />
               </Route>
            </Switch>
         </ErrorBoundary>
      </Router>
   );
};

render(<App />, document.getElementById("root"));
