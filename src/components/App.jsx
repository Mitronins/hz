import React, {Component} from 'react';
import {connect} from "react-redux";
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import {Router, Redirect} from "react-router-dom";
import createHistory from 'history/createBrowserHistory';


import Login from './Login/index';
import MainPage from './MainPage/index';
import Chat from "./MainPage/Chat";
// import Chat from "./MainPage/Chat";

export const history = createHistory();

class App extends Component {


    render() {
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        {this.props.auth && <Route path='/chats' component={MainPage}/>}
                        <Route path='/chats/:id' component={Chat}/>
                        <Route exact path='/login' component={Login}/>
                        <Redirect to="/login"/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default connect(({auth}) => ({auth}), null)(App);
