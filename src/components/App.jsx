import React, {Component} from 'react';
import {connect} from "react-redux";
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";

import {deleteAuth, setToken} from "../AC";

import Login from './Login';
import Dictionary from './Dictionary';
import Header from './Header';
import Lesson from './Lesson';
import ListLessons from './ListLessons';
import Test from './Test';
import ListTests from './ListTests';
import Register from './Register';
import MainPage from './MainPage';
import {BrowserRouter, Redirect} from "react-router-dom";


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        {this.props.auth && <Route exact path='/' component={MainPage}/>}
                        {this.props.auth && <Route exact path='/lessons' component={ListLessons}/>}
                        {this.props.auth && <Route exact path='/tests' component={ListTests}/>}
                        {this.props.auth && <Route exact path='/lesson' component={Lesson}/>}
                        {this.props.auth && <Route exact path='/test' component={Test}/>}
                        {this.props.auth && <Route exact path='/dictionary' component={Dictionary}/>}
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/register' component={Register}/>
                        <Redirect to="/login"/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(({auth}) => ({auth}), null)(App);