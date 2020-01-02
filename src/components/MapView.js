import React, { Component } from 'react';
import SockJsClient from 'react-stomp';
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
        let retorno = await GetAllCars();
        let vehiclesTmp = retorno.map((v, index) => {
          return {
            vin: v.vin,
            latitude: v.geolocation.latitude,
            longitude: v.geolocation.longitude
         }
        });
        let vehiclesTmpArr = Array.from(vehiclesTmp);
        //console.log(vehiclesTmpArr);
        this.setState({
          vehicles: vehiclesTmpArr
          });
        /*this.setState({
            vehicles: [
                        {latitude: -23.492797, longitude: -46.851263},
                        {latitude: -23.500549, longitude: -46.841415}
                    ]
            });*/
    }

    updateData(data){
      let newVehicles = this.state.vehicles.map( v => {
        console.log(v);
        if(v.vin == data.vin){
          v.latitude = data.geolocation.latitude;
          v.longitude = data.geolocation.longitude;
        }
        return v
      });
      this.setState({vehicles:newVehicles});
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
            <SockJsClient url={process.env.REACT_APP_WEB_SOCKET_ENDPOINT} 
            topics={[process.env.REACT_APP_WEB_SOCKET_TOPIC]}
            onMessage={(data) => { 
              this.updateData(data)
             }}
          />
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