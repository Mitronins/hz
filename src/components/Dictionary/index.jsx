import React, {Component} from 'react';
import {connect} from 'react-redux';

import styles from './styles.scss';

import request from "../../../utils/request";
import OneWord from './OneWord';
import {setWords} from '../../AC';

class Dictionary extends Component {

    state = {
        en_word: '',
        ru_word: '',
        note: '',
        isError: false,
        id: 0,
        isLoading: false,
    };

    componentWillMount = () => {
        this.getDictionary();
    };

    getDictionary = async () => {
        this.setState({isLoading: true});
        const token = 'Token ' + localStorage.getItem('token');
        const result = await request(`/api/dictionary/`, {}, 'get', {headers: {Authorization: token}});
        this.setState({isLoading: false});
        const {response, error} = result;
        if (Boolean(error)) {
            this.setState({isError: true});
            return;
        }
        this.props.setWords(response.data[0].words.reverse());
        this.setState({
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

    getListWords = () => this.props.words.map(word => <OneWord key={word.id} updateDictionary={this.getDictionary} word={word}/>);

    render() {
        const {isLoading} = this.state;
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
                    <button className={styles.btn} onClick={this.handleAddWord}>Добавить</button>
                </div>

                <div className={styles.list}>
                    {isLoading && <div className={styles.loading}/>}
                    {!isLoading && this.getListWords()}
                </div>
            </div>
        );
    }
}

export default connect(({words}) => ({words}), {setWords})(Dictionary);