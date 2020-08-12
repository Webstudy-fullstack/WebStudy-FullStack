import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { withCookies, useCookies } from 'react-cookie';
import axios from "axios";
import Dashboard from "./Dashboard";
import Login from "./auth/Login";
import Join from "./auth/Join";

	
 
const App = () => {
  
const [ cookies, removeCookie ] = useCookies([ 'user' ]);
const [ hasCookie, setHasCookie ] = useState(false);
useEffect(() => {
if (cookies.user && cookies.user !== 'undefined') {
setHasCookie(true);
}
}, [ cookies ]);
return (
<div className="App">
<h1>TEST LOGIN</h1>
{!hasCookie ? <Redirect to="/logged_in" /> : <Redirect to="/dashboard" />}
<Switch>
<Route
exact path="/logged_in"
render={routerProps => {
return (
<Login
{...routerProps}
setHasCookie={setHasCookie}
/>
);
}}
/>
<Route
exact path="/join"
component={Join}
/>
<Route
exact path="/dashboard"
render={routerProps => {
return (
<Dashboard
{...routerProps}
setHasCookie={setHasCookie}
removeCookie={() => {
removeCookie('user');
setHasCookie(false);
}}
/>
);
}}
/>
</Switch>
</div>
);
};
export default withCookies(App);

