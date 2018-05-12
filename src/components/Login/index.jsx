import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {connect} from 'react-redux';

import styles from './styles.scss';
import {setToken, setUser} from '../../AC';

class Login extends Component {

    state = {
        username: '',
        password: '',
        isFalseLogin: false,
        isEmptyFields: false,
        isLoad: false,
        usernameTouched: false,
        passwordTouched: false
    };

    handleLogin = async () => {
        const {username, password} = this.state;
        if (username.length === 0 || password.length === 0) {
            this.setState({isEmptyFields: true});
            return;
        }
        this.setState({isLoad: true});
        try {
            const response = await axios.post('http://localhost:8000/login/', {username, password});
            this.setState({isLoad: false});
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                this.props.setToken(response.data.token);
                this.setState({isFalseLogin: false});
                this.setState({isEmptyFields: false});
                this.props.history.push('/');
            } else {
                this.setState({isFalseLogin: true})
            }

        } catch (error) {
            this.setState({isEmptyFields: false, isFalseLogin: true, isLoad: false});
        }
    };


    getClassName = type => {
        const style = this.state[type].length === 0 ? styles["form-input__error"] : '';
        const field = type + 'Touched';
        if (this.state[field]) {
            return style;
        } else {
            return '';
        }
    };


    handleChange = type => ev => {
        const field = type + 'Touched';
        const {value} = ev.target;
        this.setState({
            [type]: value,
            [field]: true
        })
    };


    render() {
        return (
            <div className={styles.container}>
                {this.state.isLoad && <div className={styles.load}/>}
                <div className={styles.title}>Авторизация</div>
                <span className={styles.description}>Логин</span>
                <input
                    ref={'username'}
                    className={[this.getClassName('username'), styles.inpt].join(' ')}
                    onChange={this.handleChange('username')}
                    type="text"/>
                <span className={styles.description}>Пароль</span>
                <input
                    ref={'password'}
                    className={[this.getClassName('password'), styles.inpt].join(' ')}
                    onChange={this.handleChange('password')}
                    type="password"/>
                <button
                    className={styles.login}
                    onClick={this.handleLogin}>
                    Login
                </button>
                <Link
                    className={styles.register}
                    to={'/register'}>
                    Регистрация
                </Link>
                {this.state.isFalseLogin && <div className={styles.err}>Неверные данные</div>}
                {this.state.isEmptyFields && <div className={styles.err}>Заполните все поля</div>}
            </div>
        );
    }
}

export default connect(null, {setToken})(Login);