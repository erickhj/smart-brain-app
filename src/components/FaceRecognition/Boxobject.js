import React from 'react';

/*const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);*/
const Boxobject =({top,bottom,right,left})=>{
    //console.log(top,bottom,right,left)
        return(
        
            <div key={top} className='bounding-box' style={{top:top,
                right:right,
                bottom:bottom,
                left:left}}></div>
        
    )
    

    
}

export default Boxobject;
/**
 * const regions2map=data.outputs[0].data.regions
    //console.log(data.outputs[0].data.regions);
    const boxtemp={}
    regions2map.map((current,i)=>{
      let tempregion=regions2map[i].region_info.bounding_box;
      const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
      boxtemp[i].leftCol=tempregion.left_col*width;
      boxtemp[i].topRow=tempregion.top_row*height;
      boxtemp[i].rightCol=width-(tempregion.bottom_row*width);
      boxtemp[i].bottomRow=height-(tempregion.bottom_row*height)
      return(
      //  console.log(regions2map[i].region_info.bounding_box)

        this.setState({box:boxtemp})
      )
    })
 */