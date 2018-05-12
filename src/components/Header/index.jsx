import React, {Component} from 'react';
import styles from './styles.scss';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {deleteAuth} from '../../AC';


class Header extends Component {

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.menu}>
                    <Link to={'/'}>Главная</Link>
                    <Link to={'/lessons'}>Уроки</Link>
                    <Link to={'/tests'}>Тесты</Link>
                    <Link to={'/dictionary'}>Словарь</Link>
                    <Link to={'/login'} onClick={this.handleExit}>Выход</Link>
                </div>
            </div>
        );
    }

    handleExit = () => {
        localStorage.clear();
        this.props.deleteAuth();
    };
}

export default connect(null, {deleteAuth})(Header);