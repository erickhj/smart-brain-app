import React from 'react';
import './Profile.css'
class Profile extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            name:this.props.user.name,
            age:this.props.user.age,
            pet:this.props.user.pet
        }
    }
    onProfileUpdate=(data)=>{
        fetch(`http://localhost:3000/profile/${this.props.user.id}`,{
            method:'post',
            headers:{
                'Content-Type':'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body:JSON.stringify({formInput:data})
        }).then(resp=>{
            if(resp.status===200||resp.status===304)
            {
            this.props.toggleModal();
            this.props.loadUser({...this.props.user,...data});}
        }).catch(console.log)
    }
    onFormChange=(event)=>{
        
        switch(event.target.name){
            case'user-name':
            this.setState({name:event.target.value})
            break;
            case 'user-age':
            this.setState({age:event.target.value})
            break;
            case 'user-pet':
            this.setState({pet:event.target.value})
            break;
            default:
            return;
        }
    }
    render(){
    const{user}=this.props
    const{name,age,pet}=this.state;
    return(
        <div className="profile-modal">
            <article className="br3 ba dark-gray b--black-10 mv4  center shadow-5 bg-white">
                <main className="pa4 black-80 w-100 ">
                <img
                    src="http://tachyons.io/img/logo.jpg"
                        className="br-100 h3 w3 dib" alt="avatar"/>
                        <h1>{this.state.name}</h1>
                        <h4>{`Images Summitted: ${user.entries}`}</h4>
                        <p>{`Member since :${new Date(user.joined).toLocaleDateString()}`}</p>
                    
                        
                         
                            <div className="mt2 fw6" htmlFor="user-name">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name:</label>
                                <input
                                    onChange={this.onFormChange}
                                    className="pa2 ba w-100"
                                    placeholder={'John'}
                                    type="text"
                                    name="user-name"
                                    id="name"
                                    
                                />
                            </div>
                            <div className="mt2 fw6" htmlFor="user-age">
                                <label className="db fw6 lh-copy f6" htmlFor="age">Age:</label>
                                <input
                                 onChange={this.onFormChange}
                                    className="pa2 ba w-100"
                                    placeholder={'56'}
                                    type="text"
                                    name="user-age"
                                    id="name"
                                    
                                />
                            </div>
                            <div className="mt2 fw6" htmlFor="user-pet">
                                <label className="db fw6 lh-copy f6" htmlFor="pet">Pet</label>
                                <input
                                 onChange={this.onFormChange}
                                    className="pa2 ba w-100"
                                    placeholder={'dragon'}
                                    type="text"
                                    name="user-pet"
                                    id="name"
                                    
                                />
                            </div>
                            <div className='mt4' style={{display:'flex',justifyContent:'space-evenly'}}>
                            <button className="btn-primary" onClick={()=>this.onProfileUpdate({name,age,pet})}>Save</button>
                            <button className="btn-danger" onClick={this.props.toggleModal}>Cancel</button>
                            </div>
                </main>
                <div className="modal-close" onClick={this.props.toggleModal}>&times;</div>
            </article>
        </div>
    )
    }
}

export default Profile