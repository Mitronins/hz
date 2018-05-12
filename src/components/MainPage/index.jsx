import React, {Component} from 'react';

import styles from './styles.scss';
import {Link} from "react-router-dom";


class MainPage extends Component {

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.menu}>
                    <Link to={'/lessons'} className={styles["menu-element"]}>Уроки</Link>
                    <Link to={'/tests'} className={styles["menu-element"]}>Тесты</Link>
                </div>
                <Link to={'/dictionary'} className={styles.dictionary}>Словарь</Link>
            </div>
        );
    }
}

export default MainPage;