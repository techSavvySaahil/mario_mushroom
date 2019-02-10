import React, { Component } from 'react';
import '../styles/box.css'
import Mario from '../images/mario.png';
import Mushroom from '../images/mushroom.jpg';

class Box extends Component{
  // function for removing mushroom
  render(){
    return(
      <div className="box-wrap">
      {(this.props.highlight === this.props.pos) && 
        <div><img src={Mario} /></div>
      }
      {!(this.props.highlight === this.props.pos) && this.props.mushArr.includes(this.props.pos) && 
        <div><img src={Mushroom} /></div>
      }
      {!(this.props.highlight === this.props.pos) && !this.props.mushArr.includes(this.props.pos) && 
        <div>O</div>
      }
      </div>
    )
  }
}

export default Box;