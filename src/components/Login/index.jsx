import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

import styles from './styles.scss';


class Login extends Component {

    state = {
        username: '',
        password: '',
        isFalseLogin: false,
        isEmptyFields: false,
        isLoad: false
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
                this.setState({isFalseLogin: false});
                this.setState({isEmptyFields: false});
            } else {
                this.setState({isFalseLogin: true})
            }

        } catch (error) {
            this.setState({isEmptyFields: false});
            this.setState({isFalseLogin: true});
            this.setState({isLoad: false});
            console.error(error);
        }
    };

    changeLogin = (ev) => {
        this.setState({
            username: ev.target.value
        });
    };

    changePassword = (ev) => {
        console.log(ev.target.value);
        this.setState({
            password: ev.target.value
        });
    };

    getClassName = type => this.state[type].length === 0
        ? styles["form-input__error"] : '';


    handleChange = type => ev => {
        const {value} = ev.target;
        this.setState({
            [type]: value
        })
    };

    render() {
        return (
            <div className={styles.container}>
                {this.state.isLoad && <div className={styles.load}/>}
                <div className={styles.title}>Авторизация</div>
                <span className={styles.description}>Логин</span>
                <input
                    className={[this.getClassName('username'), styles.inpt].join(' ')}
                    onChange={this.changeLogin}
                    type="text"/>
                <span className={styles.description}>Пароль</span>
                <input
                    className={[this.getClassName('password'), styles.inpt].join(' ')}
                    onChange={this.changePassword}
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

export default Login;