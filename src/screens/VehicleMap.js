import React, { Component } from 'react';
import SockJsClient from 'react-stomp';
import { Link } from 'react-router-dom'
import {GetCarByVin} from '../services/cars'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import './VehicleMap.css';

export class VehicleMap extends Component {

    constructor(props) {
      super(props);
      this.state = {
        vehicle: {}
      }
    }

    displayMarker = () => {
        return <Marker key="1" id="1" position={{
            lat: this.state.vehicle.latitude,
            lng: this.state.vehicle.longitude
       }}
       onClick={() => console.log("You clicked me!=>", this.state.vehicle.vin)} />
    }

    //componentDidMount //componentWillMount
    componentWillMount() {       
      //console.log("VIN PARAMETER", this.props.match.params.vin)
      //"YS2R4X20005387949"
        this.getVehicleByVin(this.props.match.params.vin)
          .then(v => {
            console.log("v", v) ;
            this.latitude = v.geolocation.latitude;
            this.longitude = v.geolocation.longitude;
            let vehiclesTmp = {
              vin: v.vin,
              latitude: v.geolocation.latitude,
              longitude: v.geolocation.longitude
            }
            this.setState({
              vehicle: vehiclesTmp
              });
          });
    }

    async getVehicleByVin(vin){
        let retorno = await GetCarByVin(vin);
        let v = retorno[0]
        return v;
    }

    updateData(data){
      let vehicleTmp = this.state.vehicle;
      if(this.state.vehicle.vin == data.vin){
        vehicleTmp = {
          vin: data.vin,
          latitude: data.geolocation.latitude,
          longitude: data.geolocation.longitude
        }
      }
      this.setState({vehicle:vehicleTmp});
    }
  
    render() {
      if(this.state.vehicle.latitude){
        return (
          <div className="VehicleMap">
              <Map
                  google={this.props.google}
                  zoom={13}
                  style={mapStyles}
                  initialCenter={{ lat: this.state.vehicle.latitude?this.state.vehicle.latitude:-23.508956, 
                                  lng: this.state.vehicle.longitude?this.state.vehicle.longitude:-46.832757}}
              >
                {this.displayMarker()}
                  </Map> 
              <SockJsClient url={process.env.REACT_APP_WEB_SOCKET_ENDPOINT} 
              topics={[process.env.REACT_APP_WEB_SOCKET_TOPIC]}
              onMessage={(data) => { 
                this.updateData(data)
              }}
            />
          </div>
        );
      }else{
        return (
          <div className="VehicleMap">Carregando mapa</div>
        );
      }
    }
}

const mapStyles = {
    width: '100%',
    height: '100%',
  };

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(VehicleMap);