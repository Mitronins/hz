import React, {Component} from 'react';

import ListItem from './ListItem';

import styles from './styles.scss';

const chats = [{id: 3, msg: 'csada asdas dasd'}, {id: 32, msg: 'asd fndggfhd ff'}]
class ListChats extends Component {

    render() {
        return (
            <div className={styles.container}>
               {chats.map((chat) => <ListItem key={chat.id} id={chat.id} msg={chat.msg}/>)}
            </div>
        );
    }
}

export default ListChats;
