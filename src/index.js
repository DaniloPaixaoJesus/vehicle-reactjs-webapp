import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MapView from './components/MapView';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/map" component={MapView} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));
serviceWorker.unregister();
