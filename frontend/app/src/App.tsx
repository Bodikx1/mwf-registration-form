import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
//redux stuff
import { Provider } from 'react-redux';
import store from './redux/store';
// pages & components
import Signup from './pages/Signup';
import Main from './pages/Main';
import GuestRoute from './hoc/GuestRoute';
import PrivateRoute from './hoc/PrivateRoute';
// styles
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <PrivateRoute
              exact
              path='/'
              component={Main} />
            <GuestRoute
              exact
              path='/signup'
              component={Signup} />
          </Switch>
        </Router>
      </Provider>
    </div>
  )
}

export default App;