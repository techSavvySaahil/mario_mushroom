import React, { Component } from 'react';
import '../styles/box.css'

class Box extends Component{
  // function for removing mushroom
  render(){
    return(
      <div className="box-wrap">
      {this.props.mushArr.includes(this.props.pos) && 
        <div className={this.props.pos === this.props.highlight ? 'highlight': undefined}>M</div>
      }
      {!this.props.mushArr.includes(this.props.pos) && 
        <div className={this.props.pos === this.props.highlight ? 'highlight': undefined}>O</div>
      }
      </div>
    )
  }
}

export default Box;