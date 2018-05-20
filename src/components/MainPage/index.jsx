import React, {Component} from 'react';

import styles from './styles.scss';
import {Link} from "react-router-dom";


class MainPage extends Component {

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.menu}>
                    <Link to={'/lessons'} className={cn(styles.menuElement, styles.lessons)} />
                    <Link to={'/tests'} className={cn(styles.menuElement, styles.tests)}/>
                </div>
                <Link to={'/dictionary'} className={styles.dictionary}/>
            </div>
        );
    }
}

export default MainPage;