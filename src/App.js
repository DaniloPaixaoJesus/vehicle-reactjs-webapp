import React from 'react';
import SockJsClient from 'react-stomp';
import DefaultCard from './cards';
import {GetAllCars} from '../src/services/cars';
import { Link } from 'react-router-dom'
import './App.css';

var vehicles = [];
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      owner: ''
    };
  }

  //componentDidMount() {
  componentWillMount(){
      this.getAllVehicles();
  }
  
  async getAllVehicles(){
    let retorno = await GetAllCars();
    
    retorno.forEach(v => {
      vehicles.push(v);
    });
    this.setState({
      isLoaded: true,
      items: retorno
    });
  }

  updateData(data){
    let newVehicles = this.state.items.map( v => {
      if(v.vin == data.vin){
        v.status = data.status;
      }
      return v
    });
    this.setState({items:newVehicles});
  }

  handleOnChange(e){
    const value = e.target.value;
    let vehiclesTmp = [...vehicles];
    let filteredVehicles = vehiclesTmp.filter( v => {
      if(value == 'TODOS'){
        return v
      }else if(v.status === value){
        return v
      }
    });
    this.setState({items:filteredVehicles});
    
  }

  handleOnChangeOwner(e){
    const value = e.target.value;
    let vehiclesTmp = [...vehicles];
    let filteredVehicles = vehiclesTmp.filter( v => {
      if(value == ''){
        return v
      }else if(v.driverName.toLowerCase().includes(value.toLowerCase())){
        return v
      }
    });
    this.setState({items:filteredVehicles});
  }

  render() {
    const { error, isLoaded, items, vin } = this.state;
    return <div className="App">
      <header className="App-header">
          <Link to="/map">MapView</Link>
          <div className="container">
              <form name="car-filter" className="car-filter">
                  <div className="group">
                      <label htmlFor ="owner">Owner: </label>
                      {/* <input name="owner" /> */}
                      <input name="owner" onChange={(event) => this.handleOnChangeOwner(event)} />
                  </div>                
                  <div className="group">
                      <label htmlFor ="status">Status: </label>
                      <select name="status" onChange={(event) => this.handleOnChange(event)}   >
                          <option value="TODOS" defaultValue>TODOS</option>
                          <option value="OFF">OFFLINE</option>
                          <option value="ON">ONLINE</option>
                      </select>
                  </div>                
              </form>
          </div>
      </header>
      <section className="car-infos">
          <div className="container">
              <DefaultCard infos={items} />
            </div>                  
      </section>
      <SockJsClient url={process.env.REACT_APP_WEB_SOCKET_ENDPOINT} 
            topics={[process.env.REACT_APP_WEB_SOCKET_TOPIC]}
            onMessage={(data) => { 
              this.updateData(data)
             }}
          />
    </div>
  }

}

export default App;
