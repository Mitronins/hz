import React, {Component} from 'react';

import styles from './styles.scss';
import {Link} from "react-router-dom";


class OneTest extends Component {

    render() {
        const {test} = this.props;
        return (
            <Link to={`/test/${test.id}`} className={styles.container}>
                <div className={styles.title}>{test.title}</div>
                <div className={styles.description}>{test.description}</div>
                {test.status === 0 && <div className={styles.clock}/>}
                {test.status === null && <div className={styles.spread}/>}
                {test.status === 1 && <div className={styles.check}/>}
                {test.status === 0 && <span className={styles.status}>В процессе</span>}
                {test.status === null && <span className={styles.status}>Не начато</span>}
                {test.status === 1 && <span className={styles.status}>Закончено</span>}
            </Link>
        );
    }

}

export default OneTest;