import { Fragment, Component/*, useState, useEffect*/ } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext from '../store/users-context';
import ErrorBoundry from './ErrorBoundry';

// const DUMMY_USERS = [
//   { id: 'u1', name: 'Max' },
//   { id: 'u2', name: 'Manuel' },
//   { id: 'u3', name: 'Julie' },
// ];
class UserFinder extends Component {
  // can only add one static context per class

  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: ''
    }
  };
  componentDidMount() {
    // Send http request, stuff, etc is 
    // Similar with useEffect w/wout dependencies

    this.setState({
      filteredUsers: this.context.users
    })
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm))
      });
    }

  };
  // componentWillUnmount in User.js
  searchChangeHandler(e) {
    this.setState({
      searchTerm: e.target.value
    });
  };
  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type='search' onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundry>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundry>
      </Fragment>
    )
  }
};


// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type='search' onChange={this.searchChangeHandler.bind(this)} />
//       </div>
//       <Users users={this.state.filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;