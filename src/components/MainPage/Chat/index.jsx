import React, {Component} from 'react';

import styles from './styles.scss';


class Chat extends Component {

    render() {
        console.log(this.props.match.params.id)
        return (
            <div className={styles.container}>
                <div className={styles.chat}>
                    // тут сообщения
                </div>
                <input type="text" className={styles.inp}/>
            </div>
        );
    }
}

export default Chat;
