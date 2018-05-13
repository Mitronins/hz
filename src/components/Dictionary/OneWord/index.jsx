import React, {Component} from 'react';

import styles from './styles.scss';

class OneWord extends Component {

    render() {
        const {word} = this.props;
        return (
            <div className={styles.container}>
                Английский вариант:
                <div className={styles.word}>{word.en_word}</div>
                Русский вариант:
                <div className={styles.word}>{word.ru_word}</div>
                Заметка:
                <div className={styles.word}>{word.note}</div>
            </div>
        );
    }
}

export default OneWord;