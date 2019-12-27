import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {GetAllCars} from '../services/cars'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import './MapView.css';

export class MapView extends Component {
    constructor(props) {
      super(props);
  
      /*this.state = {
        vehicles: []
      }*/
      this.state = {
        vehicles: []
      }
    }
  
    displayMarkers = () => {
      return this.state.vehicles.map((v, index) => {
        console.log('displayMarkers=>', v)
        return <Marker key={index} id={index} position={{
            lat: v.latitude,
            lng: v.longitude
       }}
       onClick={() => console.log("You clicked me!=>", v.vin)} />
      })
    }

    componentDidMount() {
        this.getAllVehicles();
    }

    async getAllVehicles(){
        //let retorno = await GetAllCars();
        //console.log('retorno=>', retorno);
        //this.setState({vehicles:retorno});

        this.setState({
            vehicles: [
                        //{latitude: 47.3084488, longitude: -122.2140121},
                        //{latitude: 47.5524695, longitude: -122.0425407}
                        {latitude: -23.492797, longitude: -46.851263},
                        {latitude: -23.500549, longitude: -46.841415}
                    ]
            });
    }
  
    render() {
      return (
        <div className="MapView">
            <header className="MapView-header">
                <div className="MapView-menu">
                    <Link to="/">Back to List View</Link>
                </div>
            </header>
            <Map
                google={this.props.google}
                zoom={12}
                style={mapStyles}
                initialCenter={{ lat: -23.508956, lng: -46.832757}}
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