import React from 'react';
import './FaceRecognition.css'
const FaceRecognition =({imageUrl,box})=>{

    return(
        <div className="center ma">
        <div className=" absolute">
            <img id='inputimage'src={imageUrl} alt="none" width='500px' height='auto'/>
            <div className='bounding-box' style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}></div>
        </div>
        </div>
    )
}

export default FaceRecognition;