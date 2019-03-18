import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon'

const Navigation =({onRouteChange,isSignedIn,toggleModal})=>{

    if (isSignedIn) {
        return (
            <nav>
                <ProfileIcon signout={onRouteChange} toggleModal={toggleModal}/>
               { 
               //<p onClick={() => onRouteChange('signout')} className=" f3 link dim black tr underline ph3 pointer">Sign Out</p>
               }
            </nav>)
    }else
    {
        return (
            <nav>
                <p onClick={() => onRouteChange('signin')} className=" f3 link dim black tr underline ph3 pointer">Sign In</p>
                <p onClick={() => onRouteChange('register')} className=" f3 link dim black tr underline ph3 pointer">Register</p>
            </nav>
        )

    }
    
    
} 

export default Navigation