(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{103:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a.n(n),o=a(44),s=a.n(o),r=(a(56),a(45)),l=a(46),c=a(49),u=a(47),d=a(50),m=a(48),h=a.n(m),p=a(7),v=a.n(p),g=(a(25),a(41),a(94),a(95),function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={error:null,isLoaded:!1,items:[],vin:""},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.getAllVehicles()}},{key:"getAllVehicles",value:function(){var e=this;fetch("http://swedish-challenge.danilopaixao.com.br:8080/vehicle-service/api/v1/vehicles").then(function(e){return e.json()}).then(function(t){console.log(t),e.vehicles=t,e.setState({isLoaded:!0,items:t})},function(t){e.setState({isLoaded:!0,error:t})})}},{key:"updateData",value:function(e){console.log("updateData-Vin:",e),console.log("updateData-Vin.vin:",e.vin),console.log("updateData-Vin.status:",e.status),console.log("this.state.items=>",this.state.items);var t=this.state.items.map(function(t){return t.vin==e.vin&&(t.status=e.status),t});this.setState({items:t})}},{key:"render",value:function(){var e=this,t=this.state,a=t.error,n=t.isLoaded,o=t.items;t.vin;return a?i.a.createElement("div",null,"Error: ",a.message):n?i.a.createElement("div",{style:{width:"100%",height:"100%",display:"flex",margin:"20px",padding:"20px",wordBreak:"break-all"}},i.a.createElement("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",integrity:"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T",crossorigin:"*"}),o.map(function(e){return i.a.createElement(v.a,{style:{width:"550px",margin:"5px",padding:"5px"},id:e.vin},i.a.createElement(v.a.Body,null,i.a.createElement(v.a.Title,null,e.name),i.a.createElement(v.a.Subtitle,{className:"mb-2 text-muted"},e.vin),i.a.createElement(v.a.Text,null,e.status),i.a.createElement(v.a.Text,null,e.driverLicenseCategory),i.a.createElement(v.a.Text,null,e.driverAddress)))}),i.a.createElement(h.a,{url:"http://ec2-35-174-0-145.compute-1.amazonaws.com:8085/livestatus-websocket",topics:["/topic/status"],onMessage:function(t){console.log("entrou aqui",t),e.updateData(t)}})):i.a.createElement("div",null,"Loading...")}}]),t}(i.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},51:function(e,t,a){e.exports=a(103)},56:function(e,t,a){},94:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},95:function(e,t,a){}},[[51,1,2]]]);
//# sourceMappingURL=main.73dcef9e.chunk.js.map