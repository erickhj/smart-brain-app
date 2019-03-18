import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from'./components/Signin/Signin';
import Register from'./components/Register/Register';
import Profile from './components/Profile/Profile'
import './App.css';
import Modal from './components/Modal/Modal'



const initalState=
{
    input:'',
    imageUrl:'',
    box:[{}],
    route:'signin',
    isSignedIn:false,
    isProfileOpen:false,
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

  componentDidMount(){
    const token=window.sessionStorage.getItem('token')
    if(token){
      fetch('http://localhost:3000/signin',{
        method:'post',
        headers:{
          'Content-Type':'application/json',
          'Authorization': token
        }
      })
      .then(resp=>resp.json())
      .then(data=>{
        if(data && data.id){
          fetch(`http://localhost:3000/profile/${data.id}`,{
            method:'get',
            headers:{
              'Content-Type':'application/json',
              'Authorization': token
            }
          }).then(resp=>resp.json())
          .then(user=>{
            if(user&&user.email){
              //console.log(user)
              this.loadUser(user)
              this.onRouteChange('home')
            }
          })
        }
      }).catch(console.log)
  }
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
    this.setState({box:data.outputs[0].data.regions})
    
    /*const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width,height);
    return{
      leftCol:clarifaiFace.left_col*width,
      topRow:clarifaiFace.top_row*height,
      rightCol:width-(clarifaiFace.bottom_row*width),
      bottomRow:height-(clarifaiFace.bottom_row*height)
    }*/
  }
  onRouteChange=(route)=>{
    if(route==='signout'){
      return this.setState(initalState)
    }else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route});
  }
  displayFaceBox=(box)=>{
    //this.setState({box:box});
  }
  inInputChange=(event)=>{
      this.setState({input:event.target.value})
  }
  
  onbuttonSubmit=()=>{
    this.setState({imageUrl:this.state.input})
    fetch('http://localhost:3000/imageurl',
    {
      method:'post',
      headers:{
        'Content-Type':'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body:JSON.stringify({
        input:this.state.input
      })
    })
    .then(response=>response.json())
    .then(response=> {
      //console.log(response)
      if(response)
      {
        
        fetch('http://localhost:3000/image',
        {
          method:'put',
          headers:{
            'Content-Type':'application/json',
            'Authorization': window.sessionStorage.getItem('token')
          },
          body:JSON.stringify({
            id:this.state.user.id
          })
        })
        .then(respo=>respo.json())
      .then(count=>{
        console.log("ger",count)
        this.setState(Object.assign(this.state.user,{entries:count}))
      })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err=>console.log(err));
  }

  toggleModal=()=>{
    this.setState(prevState=>({
      ...prevState,
      isProfileOpen:!prevState.isProfileOpen
    }))
  }
  render() {
    const{isProfileOpen}=this.state;
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}
        toggleModal={this.toggleModal}/>
        { isProfileOpen &&
          <Modal>
          <Profile isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} user={this.state.user} loadUser={this.loadUser}/>
          </Modal>
        }
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
