import React, {Component} from 'react';

import styles from './styles.scss';

import request from "../../../utils/request";
import OneWord from './OneWord';

class Dictionary extends Component {

    state = {
        en_word: '',
        ru_word: '',
        note: '',
        isError: false,
        words: [],
        id: 0,
    };

    componentWillMount = () => {
        this.getDictionary();
    };

    getDictionary = async () => {
        const token = 'Token ' + localStorage.getItem('token');
        const result = await request(`/api/dictionary/`, {}, 'get', {headers: {Authorization: token}});
        const {response, error} = result;
        if (Boolean(error)) {
            this.setState({isError: true});
            return;
        }
        this.setState({
            words: response.data[0].words.reverse(),
            id: response.data[0].id
        });
    };

    changeInputWord = (type) => (ev) => {
        this.setState({
            [type]: ev.target.value
        })
    };

    handleAddWord = async () => {
        const token = 'Token ' + localStorage.getItem('token');
        const {en_word, ru_word, note, id} = this.state;
        if (en_word.length === 0 || ru_word.length === 0 || note.length === 0) {
            alert('Заполните все поля');
            return;
        }
        const result = await request(`/api/dictionary/${id}/add/`, {
            en_word,
            ru_word,
            note
        }, 'post', {headers: {Authorization: token}});
        if (Boolean(result.response)) {
            this.setState({
                en_word: '',
                ru_word: '',
                note: ''
            });
            this.getDictionary();
        } else {
            alert('При добавлении произошла ошибка');
        }
    };

    getListWords = () => this.state.words.map(word => <OneWord key={word.id} word={word}/>);

    render() {
        return (
            <div className={styles.container}>
                <div className={styles['form-words']}>
                    Английский вариант:
                    <input onChange={this.changeInputWord('en_word')} className={styles.inpt} type="text"
                           value={this.state.en_word}/>
                    Русский вариант:
                    <input onChange={this.changeInputWord('ru_word')} className={styles.inpt} type="text"
                           value={this.state.ru_word}/>
                    Заметка
                    <textarea onChange={this.changeInputWord('note')} className={styles.area} value={this.state.note}/>
                    <button onClick={this.handleAddWord}>Добавить</button>
                </div>
                <div className={styles.list}>
                    {this.getListWords()}
                </div>
            </div>
        );
    }
}

export default Dictionary;