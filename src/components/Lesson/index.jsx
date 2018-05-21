import React, {Component} from 'react';

import styles from './styles.scss';
import request from "../../../utils/request";

class Lesson extends Component {
    state = {
        isLoading: true,
        isError: false,
        lesson: {
            chapters: []
        },
    };

    componentWillMount = () => {
        this.getLesson();
        this.startLesson();
    };

    startLesson = async () => {
        const {id} = this.props.match.params;
        const token = 'Token ' + localStorage.getItem('token');
        const result = await request(`/api/lessons/${id}/start/`, {}, 'post', {headers: {Authorization: token}});
    };

    stopLesson = async () => {
        const {id} = this.props.match.params;
        const token = 'Token ' + localStorage.getItem('token');
        const result = await request(`/api/lessons/${id}/stop/`, {}, 'post', {headers: {Authorization: token}});
        Boolean(result.response) ? this.props.history.push('/lessons') : alert('Произошла ошибка');
    };

    getLesson = async () => {
        const {id} = this.props.match.params;
        const token = 'Token ' + localStorage.getItem('token');
        const result = await request(`/api/lessons/${id}/`, {}, 'get', {headers: {Authorization: token}});

        const isError = Boolean(result.error);
        this.setState({
            isLoading: false,
            isError
        });


        if (!isError) {
            this.setState({
                lesson: result.response.data
            });
        }
    };

    getChapters = (lesson) => {
        return lesson.chapters.map(chapter =>
            <div key={chapter.id}>
                <div className={styles.chapter}>{chapter.title}</div>
                <div className={styles.text}><pre>{chapter.text}</pre></div>
            </div>)
    };

    render() {
        const {isLoading, lesson, isError} = this.state;
        return (
            <div className={styles.container}>
                {isLoading && <div className={styles.loading}/>}
                {isError && <div className={styles.error}/>}
                {!isError && !isLoading && <div>
                    <div className={styles.title}>{lesson.title}</div>
                    <div className={styles.description}>{lesson.description}</div>
                    {this.getChapters(lesson)}
                </div>}
                {lesson.status !== 1 && <button className={styles['stop-lesson']} onClick={this.handleSuccessLesson}>Пройдено!</button>}
                {lesson.status === 1 && <div className={styles['success-lesson']}>Уже пройдено!</div>}
            </div>
        );
    }

    handleSuccessLesson = () => {
        this.stopLesson()
    }
}

export default Lesson;