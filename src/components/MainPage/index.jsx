import React, {Component} from 'react';
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";

import ListChats from './ListChats';
import Chat from './Chat';

import styles from './styles.scss';


class MainPage extends Component {

    render() {
        return (
            <div className={styles.container}>
                <ListChats/>
                <Switch>
                    <Route path='/chats/:id' component={Chat}/>
                </Switch>
            </div>
        );
    }
}

export default MainPage;
