import React from 'react';
import { Dropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem }
     from 'reactstrap';


class ProfileIcon extends React.Component{
constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state={
        dropdownOpen:false
    }
}
toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

render(){
    return(
        <div className="tr pa3">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle
                    tag="span"

                    data-toggle="dropdown"
                    aria-expanded={this.state.dropdownOpen}
                >
                <img
      src="http://tachyons.io/img/logo.jpg"
      className="br-100 h3 w3 dib" alt="avatar"/>
                </DropdownToggle>
                <DropdownMenu
                right
                className="b--transparent shadow-5" 
                style={{marginTop:'20px',backgroundColor:'rgba(255,255,255,.5)'}}>
                    <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
                    <DropdownItem onClick={()=>this.props.signout('signout')}>Sign Out</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
}

export default ProfileIcon;