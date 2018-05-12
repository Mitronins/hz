import React, {Component} from 'react';

import styles from './styles.scss';


class ListLessons extends Component {

    render() {
        const {lesson} = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.title}>{lesson.title}</div>
                <div className={styles.description}>{lesson.description}</div>
                {lesson.status === 0 && <div className={styles.clock}/> }
                {lesson.status === null && <div className={styles.spread}/>}
                {lesson.status === 1 && <div className={styles.check}/>}
                {lesson.status === 0 && <span className={styles.status}>В процессе</span> }
                {lesson.status === null && <span className={styles.status}>Не начато</span>}
                {lesson.status === 1 &&<span className={styles.status}>Закончено</span>}
            </div>
        );
    }
}

export default ListLessons;