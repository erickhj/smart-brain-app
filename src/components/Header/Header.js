import React from 'react';

const Header =({name,entries})=>{

    return(
        <div>
            <h1 className=" f2 white">
            {`${name}, your current entry is ... ${entries}`}</h1>
        </div>
    )
}

export default Header;