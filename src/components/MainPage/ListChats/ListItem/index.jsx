import React, {Component} from 'react';
import NavLink from "react-router-dom/es/NavLink";

import styles from './styles.scss';


class ListItem extends Component {

    render() {
        const { id, msg } = this.props;
        return (
            <NavLink to={`/chats/${id}`} className={styles.container}>
                <div className={styles.id}>{id}</div>
                <div className={styles.msg}>{msg}</div>
            </NavLink>
        );
    }
}

export default ListItem;
