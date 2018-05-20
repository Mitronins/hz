import React, {Component} from 'react';
import {connect} from 'react-redux';

import styles from './styles.scss';
import request from "../../../../utils/request";
import {deleteWord} from '../../../AC';

class OneWord extends Component {
    state = {
        isLoading: false
    };

    handleClickDelete = async () => {
        this.setState({
            isLoading: true
        });
        const { word } = this.props;
        const token = 'Token ' + localStorage.getItem('token');
        const result = await request(`/api/dictionary/${word.dictionary}/delete/`, {id_word: word.id}, 'post', {headers: {Authorization: token}});
        this.setState({
            isLoading: false
        });
        Boolean(result.response) ? this.props.deleteWord(word.id) : alert('Произошла ошибка');
    };

    render() {
        const {word} = this.props;
        const {isLoading} = this.state;
        return (
            <div className={styles.container}>
                {isLoading && <div className={styles.loading} />}
                Английский вариант:
                <div className={styles.word}>{word.en_word}</div>
                Русский вариант:
                <div className={styles.word}>{word.ru_word}</div>
                Заметка:
                <div className={styles.word}>{word.note}</div>
                <div onClick={this.handleClickDelete} className={styles.delete}/>
            </div>
        );
    }
}

export default connect(null, {deleteWord})(OneWord);