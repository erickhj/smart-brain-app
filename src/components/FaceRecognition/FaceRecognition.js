import React from 'react';
import './FaceRecognition.css'
import Boxobject from './Boxobject'
const FaceRecognition =({imageUrl,box})=>{
    //console.log(box[0].region_info.bounding_box.topRow)
    return(
        <div className="center ma">
        <div className=" absolute">
            <img id='inputimage'src={imageUrl} alt="none" width='500px' height='auto'/>
            {
                
                box[0].region_info!==undefined?(box.map((current,i)=>{
                   // console.log(box[0].region_info)                    
                    const image = document.getElementById('inputimage');
                    const width = Number(image.width);
                    const height = Number(image.height);
                    return(
                        <Boxobject
                            top={box[i].region_info.bounding_box.top_row*width}
                            bottom={height-(box[i].region_info.bounding_box.bottom_row*height)}
                            left={box[i].region_info.bounding_box.left_col*width}
                            right={width-(box[i].region_info.bounding_box.right_col*width)}
                        />
                    )
                })):<h1>Hello</h1>
            }
        </div>
        </div>
    )
}

export default FaceRecognition;//<Boxobject box={box}></Boxobject>
