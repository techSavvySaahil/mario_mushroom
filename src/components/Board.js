import React, {Component} from 'react';
import Box from './Box';

class Board extends Component {
  state = {
    rows: Array.from(Array(this.props.height).keys()),
    columns: Array.from(Array(this.props.width).keys()),
    mushArr: [],
    currentHighlight: '0,0',
    direction: 'none',
    intervalId: '',
    stepsTaken: 0
  }
  
  changeDirection = (newDir)=> {
    if(this.state.mushArr.length) {
      let id = this.state.intervalId;
      if(id) {
        clearInterval(id);
      }
      this.setState({
        direction: newDir
      });
      let newPos = this.state.currentHighlight;
      let split = newPos.split(',');
      let row = split[0];
      let col = split[1];
      let end = '';
      switch(newDir) {
        case 37: //left
          end = `${row},0`;
          break;
        case 39: //right
          end = `${row},${this.props.width}`;
          break;
        case 38: //up
          end = `0,${col}`;
          break;
        case 40: //down
          end = `${this.props.height},${col}`;
          break;
        default:
          end = `${row},${this.props.width}`;
      }

      id = setInterval(()=>{
        if(newPos != end){
          newPos = this.moveMario(newPos, newDir);
          console.log(this.state.stepsTaken);
          this.setState((prevState)=>({stepsTaken: prevState.stepsTaken+1}));
        }
        else {
          clearInterval(id);
          newDir = newDir>38 ? newDir-2 : newDir+2;
          this.changeDirection(newDir);
        }
      },1000);
      this.setState({intervalId: id});
    }
  }
  moveMario= (newPos, newDir)=> {
    let split = newPos.split(',');
    let row = parseInt(split[0]);
    let col = parseInt(split[1]);
    switch(newDir) {
      case 37:
        newPos = `${row},${col-1}`;
        break;
      case 39:
        newPos = `${row},${col+1}`;
        break;
      case 38:
        newPos = `${row-1},${col}`;
        break;
      case 40:
        newPos = `${row+1},${col}`;
        break;
      default:
        newPos = newPos;
    }
    this.setState({currentHighlight: newPos});
    let mushArr = this.state.mushArr;
    let index = mushArr.indexOf(newPos);
    if(~index) {
      mushArr.splice(index,1);
      this.setState({mushArr});
      if(!mushArr.length) {
        clearInterval(this.state.intervalId);
      }
    }
    return newPos;
  }
  generateRandomMush() {
    let width = this.props.width;
    let height = this.props.height;
    this.setState({
      rows: Array.from(Array(parseInt(this.props.height)).keys()),
      columns: Array.from(Array(parseInt(this.props.width)).keys())
    });
    let arr = [];

    for(let i=0; i<height; i++) {
      let row = parseInt(Math.random()*height);
      let col = parseInt(Math.random()*width);
      let pos = `${row},${col}`;
      if(arr.includes(pos)) {
        i--;
      }
      else {
        arr.push(pos);
      }
    }
    this.setState({
      mushArr: arr
    })
  }

  _handleKeyDown = (event)=> {
    this.changeDirection(event.keyCode);
  }

  componentDidMount() {
    if(this.props.width && this.props.height) {
      this.generateRandomMush();
    }
    document.addEventListener("keydown", this._handleKeyDown);
  }

  render() {
    return(
      <div>
      {this.state.rows && this.state.rows.map((elem,row)=> (
        <div key={row}>
        {this.state.columns && this.state.columns.map((elem,col)=>(
          <Box key={`${row},${col}`} pos={`${row},${col}`}
          mushArr={this.state.mushArr} highlight={this.state.currentHighlight} />
        ))}
        </div>
      ))}
      </div>
    )
  }
}

export default Board;