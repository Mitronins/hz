import React, {Component} from 'react';

import styles from './styles.scss';
import {Link} from "react-router-dom";


class OneLesson extends Component {

    render() {
        const {lesson} = this.props;
        return (
            <Link to={`/lesson/${lesson.id}`} className={styles.container}>
                <div className={styles.title}>{lesson.title}</div>
                <div className={styles.description}>{lesson.description}</div>
                {lesson.status === 0 && <div className={styles.clock}/>}
                {lesson.status === null && <div className={styles.spread}/>}
                {lesson.status === 1 && <div className={styles.check}/>}
                {lesson.status === 0 && <span className={styles.status}>В процессе</span>}
                {lesson.status === null && <span className={styles.status}>Не начато</span>}
                {lesson.status === 1 && <span className={styles.status}>Закончено</span>}
            </Link>
        );
    }

}

export default OneLesson;