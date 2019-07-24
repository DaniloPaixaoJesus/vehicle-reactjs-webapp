import React from 'react';
//  import SockJsClient from 'react-stomp';
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
      items: []
    };
  }

  componentDidMount() {
     // let exampleSocket = new WebSocket('ws://localhost:8085/livestatus-websocket');
    // exampleSocket.onmessage = e => {
    //   console.log(e.data)
    // }

      let socket = new SockJS('http://ec2-35-174-0-145.compute-1.amazonaws.com:8085/livestatus-websocket');
      let stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
	        stompClient.subscribe('/topic/status', function (data) {
	        	var vehicleStatus = JSON.parse(data.body);
            console.log(vehicleStatus);
            // const { error, isLoaded, items } = this.state;
            // items.map(item => {  
            //   if(scoreJson.vin == item.vin){
            //     return {scoreJson}
            //   }
            // });
                
	            
	        });
      });
      
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

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.vin}>
              Vin: {item.vin} - {item.status}
            </li>
          ))}
        </ul>
      );
    }
  }

}

const card = {
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s'
}

const container = {
  padding: '2px 16px'
}

export default App;
