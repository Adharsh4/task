import './App.css';
import {Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Header from './components/Header';
import Task from './components/Task';
import Tasks from './components/Tasks';


function App() {

  

  return (
    <div className="App">
      <div className="SideNav">
        
      </div>
      <div className="Content">
        <div className="Header">
        </div>

        <div className="Section">
        <div className="Tasks">
            <div className="first-task">
            <Switch>
                
                <Route path="/task">
                    <Header />
                    <Task/>
                </Route>
                <Route path="/">
                    <Header />
                    <Tasks/>
                </Route>
                <Redirect to="/" />
            </Switch>
                
            </div>
        </div>
        </div>
      </div>
    </div>
    
  );
}

export default withRouter(App);
