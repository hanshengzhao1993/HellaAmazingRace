'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';
import LoginPage from './components/LoginPage';
import CreateRace from './components/CreateRace';
import RunRace from './components/RunRace';
import TestMap from './components/TestMap';
import CheckPoint from './components/Checkpoint.jsx';
import RouteInfo from './components/Route_info';


const routes = (
  <div> 
  <Route path="/" component={Layout}>
    <IndexRoute component={LoginPage}/>
    <Route path="/home" component={IndexPage}/>
    <Route path="/CreateRace" component = {CreateRace}/>
    <Route path="/RunRace" component = {RunRace}/>    
  </Route>
  <Route path="/TestMap" component = {TestMap} />
  <Route path="/Checkpoint" component={CheckPoint} />
  <Route path="/route_info" component={RouteInfo} />
  <Route path="*" component={NotFoundPage}/>
  </div>
);

export default routes;
