import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {GetAllCars} from '../services/cars'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import './MapView.css';

export class MapView extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        vehicles: []
      }
    }
  
    displayMarkers = () => {
      return this.state.vehicles.map((v, index) => {
        console.log('displayMarkers=>', v)
        return <Marker key={index} id={index} position={{
         lat: '-23.494119',//v.geolocation.latitude,
         lng: '-46.855306'//v.geolocation.longitude
       }}
       onClick={() => console.log("You clicked me!=>", v.vin)} />
      })
    }

    componentDidMount() {
        this.getAllVehicles();
    }

    async getAllVehicles(){
        let retorno = await GetAllCars();
        console.log('retorno=>', retorno);
        this.setState({vehicles:retorno});
    }
  
    render() {
      return (
        <div className="App">
            <header className="App-header">
                <div className="container">
                    <Link to="/">List View</Link>
                </div>
            </header>
            <Map
                google={this.props.google}
                zoom={16}
                style={mapStyles}
                initialCenter={{ lat: -23.40311566, lng: -46.33379166}}
            >
                {this.displayMarkers()}
            </Map>
        </div>
      );
    }
}

const mapStyles = {
    width: '100%',
    height: '100%',
  };

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapView);