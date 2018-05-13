import React, {Component} from 'react';

import request from '../../../utils/request';
import OneLesson from './OneLesson';

import styles from './styles.scss';

class ListLessons extends Component {
    state = {
        isLoading: true,
        isError: false,
        lessons: [],
        myLessons: []
    };

    componentWillMount = () => {
        this.getLessons();
    };

    getLessons = async () => {
        const token = 'Token ' + localStorage.getItem('token');
        const allLessons = request('/api/lessons/', {}, 'get', {headers: {Authorization: token}});
        const myLessons = request('/api/lessons/?my=1', {}, 'get', {headers: {Authorization: token}});
        const [{response: allLessonsRes, error: allLessonsError},
            {response: myLessonsRes, error: myLessonsError}] = [await allLessons, await myLessons];
        const isError = Boolean(allLessonsError || myLessonsError);
        this.setState({
            isLoading: false,
            isError
        });

        if (!isError) {
            this.setState({
                lessons:this.setLessonsState(allLessonsRes.data.results, myLessonsRes.data.results)
            });
        }
    };

    setLessonsState = (allLessons, myLessons) => {
        if (myLessons.length !== 0) {
            for (let i = 0; i < myLessons.length; i++) {
                for (let j = 0; j < allLessons.length; j++) {
                    if (myLessons[i].id === allLessons[j].id) {
                        allLessons[j].status = myLessons[i].status;
                    }
                }
            }
            return allLessons
        } else {
            return allLessons;
        }
    };

    getListLessons = () => this.state.lessons.map(lesson => <OneLesson key={lesson.id} lesson={lesson}/>);


    render() {
        const {isLoading, isError} = this.state;
        const lessons = this.getListLessons();
        return (
            <div className={styles.container}>
                {isLoading && <div className={styles.loading}/>}
                {!isLoading && isError && <div className={styles.error}>ошибка</div>}
                {!isLoading && !isError && <div>{lessons}</div>}
            </div>
        );
    }
}

export default ListLessons;