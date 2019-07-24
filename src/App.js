import React from 'react';
import SockJsClient from 'react-stomp';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  
  vehicles;

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      vin:''
    };
  }

  componentDidMount() {
      // let socket = new SockJS('http://localhost:8085/livestatus-websocket');
      // let stompClient = Stomp.over(socket);
      // stompClient.connect({}, function (frame) {
	    //     stompClient.subscribe('/topic/status', function (data) {
	    //     	var vehicleStatus = JSON.parse(data.body);
      //       console.log(vehicleStatus);
      //       // const { error, isLoaded, items } = this.state;
      //       // items.map(item => {  
      //       //   if(scoreJson.vin == item.vin){
      //       //     return {scoreJson}
      //       //   }
      //       // });
                
	            
	    //     });
      // });
      this.getAllVehicles();
  }

  getAllVehicles(){
    fetch("http://swedish-challenge.danilopaixao.com.br:8080/vehicle-service/api/v1/vehicles")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.vehicles = result;
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  updateData(data){
    console.log('updateData-Vin:', data);
    console.log('updateData-Vin.vin:', data.vin);
    console.log('updateData-Vin.status:', data.status);
    console.log('this.state.items=>', this.state.items)
    let newVehicles = this.state.items.map( v => {
      if(v.vin == data.vin){
        v.status = data.status;
      }
      return v
    });
    this.setState({items:newVehicles});
  }

  render() {
    const { error, isLoaded, items, vin } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div style={{width: '100%', height: '100%', display: 'flex', margin: '20px', padding: '20px', wordBreak:'break-all'}} >
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="*"
          />
          {items.map(item => (
            <Card style={{ width: '550px', margin: '5px', padding: '5px' }} id={item.vin} >
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{item.vin}</Card.Subtitle>
                <Card.Text>
                {item.status}
                </Card.Text>
                <Card.Text>
                {item.driverLicenseCategory}
                </Card.Text>
                <Card.Text>
                {item.driverAddress}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        <SockJsClient url='http://localhost:8085/livestatus-websocket' topics={['/topic/status']}
            onMessage={(data) => { 
              //this.setState({vin:msg})
              console.log('entrou aqui', data);
              //var vehicleStatus = JSON.parse(data);
              this.updateData(data)
              
             }}
          />
          </div>
        
      );
    }
  }

}

export default App;
