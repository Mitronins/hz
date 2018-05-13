import React, {Component} from 'react';
import request from "../../../utils/request";
import {Map as IMap} from 'immutable';

import styles from './styles.scss';

import OneQuestion from './OneQuestion';


class Test extends Component {
    state = {
        isLoading: true,
        isError: false,
        test: {
            questions: []
        },
        rightAnswers: {}
    };

    componentWillMount = () => {
        this.getTest();
        this.startTest();
    };

    startTest = async () => {
        const {id} = this.props.match.params;
        const token = 'Token ' + localStorage.getItem('token');
        const result = await request(`/api/tests/${id}/start/`, {}, 'post', {headers: {Authorization: token}});
    };

    stopTest = async () => {
        const {id} = this.props.match.params;
        const token = 'Token ' + localStorage.getItem('token');
        let count = 0;
        for (let answer in this.state.rightAnswers) {
            if (this.state.rightAnswers[answer]) count++;
        }
        const result = await request(`/api/tests/${id}/stop/`, {right_answers: count}, 'post', {headers: {Authorization: token}});
        this.props.history.push('/tests');
    };

    getTest = async () => {
        const {id} = this.props.match.params;
        const token = 'Token ' + localStorage.getItem('token');
        const result = await request(`/api/tests/${id}/`, {}, 'get', {headers: {Authorization: token}});

        const isError = Boolean(result.error);
        this.setState({
            isLoading: false,
            isError
        });

        if (!isError) {
            this.setState({
                test: result.response.data
            });
        }
    };

    getAnswer = (idQuestion, rightAnswer) => {
        if (rightAnswer) {
            this.setState({rightAnswers: {...this.state.rightAnswers, [idQuestion]: true}});
        } else {
            this.setState({rightAnswers: {...this.state.rightAnswers, [idQuestion]: false}});
        }
    };

    getQuestion = () => this.state.test.questions.map(question =>
        <OneQuestion
            key={question.id}
            question={question}
            getAnswer={this.getAnswer}
        />);

    render() {
        const {isLoading, test, isError} = this.state;
        return (
            <div className={styles.container}>
                {isLoading && <div className={styles.loading}/>}
                {isError && <div className={styles.error}>ошибка</div>}
                {!isError && !isLoading && <div>
                    <div className={styles.title}>{test.title}</div>
                    <div className={styles.description}>{test.description}</div>
                    <div>{this.getQuestion()}</div>
                    <button onClick={this.handleOkClick} className={styles['btn-ok']}>OK</button>
                </div>}
            </div>
        );
    }

    handleOkClick = () => {
        if (Object.keys(this.state.rightAnswers).length !== this.state.test.questions.length) {
            alert('Ответьте на все вопросы');
            return;
        }
        this.stopTest();
    }
}

export default Test;