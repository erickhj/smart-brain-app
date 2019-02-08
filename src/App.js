import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from'./components/Signin/Signin';
import Register from'./components/Register/Register';
import './App.css';



const initalState=
{
    input:'',
    imageUrl:'',
    box:{},
    route:'signin',
    isSignedIn:false,
    user:{
      id:'',
      name:'',
      email:'',
      entries:0,
      joined:''
    }
}

class App extends Component {
  constructor (){
    super();
    this.state=initalState;
  }

  loadUser=(data)=>{
    //console.log(this.state)
    this.setState({user : {
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined
      }})
    }
  calculateFaceLocation=(data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width= Number(image.height);
    const height=Number(image.width);
    //console.log(width,height);
    return{
      leftCol:clarifaiFace.left_col*width,
      topRow:clarifaiFace.top_row*height,
      rightCol:width-(clarifaiFace.bottom_row*width),
      bottomRow:height-(clarifaiFace.bottom_row*height)
    }
  }
  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState(initalState)
    }else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route});
  }
  displayFaceBox=(box)=>{
    //console.log(box)
    this.setState({box:box});
  }
  inInputChange=(event)=>{
      this.setState({input:event.target.value})
  }
  
  onbuttonSubmit=()=>{
    this.setState({imageUrl:this.state.input})
    fetch('https://afternoon-bayou-56422.herokuapp.com/imageurl',
    {
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        input:this.state.input
      })
    })
    .then(response=>response.json())
    .then(response=> {
      if(response)
      {
        fetch('https://afternoon-bayou-56422.herokuapp.com/image',
        {
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            id:this.state.user.id
          })
        })
        .catch(console.log)
        .then(response=>response.json())
      .then(count=>{
        this.setState(Object.assign(this.state.user,{entries:count}))
      })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err=>console.log(err));
  }
  render() {
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {this.state.route==='home'?
         <div><Logo/>
         <Header entries={this.state.user.entries} name={this.state.user.name}/>
         <SearchBar inInputChange={this.inInputChange}
          onbuttonSubmit={this.onbuttonSubmit}/>
         <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
         </div>:(this.state.route==='signin'?
         <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>:
         <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
         )}
      </div>
    );
  }
}

export default App;
