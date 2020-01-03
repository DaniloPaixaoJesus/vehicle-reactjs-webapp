import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MapAllVehicles from './screens/MapAllVehicles';
import VehicleMap from './screens/VehicleMap';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/allvehicles" component={MapAllVehicles} />
            <Route path="/map/:vin" component={VehicleMap} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));
serviceWorker.unregister();
