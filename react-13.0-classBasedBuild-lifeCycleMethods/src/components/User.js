import classes from './User.module.css';
import { Component } from 'react';

class User extends Component {
  //informational *****
  //this.state;
  //this.props;
  // constructor(){

  componentWillUnmount(){
    console.log('User Will Unmount')
  }

  // }
  render(){
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
