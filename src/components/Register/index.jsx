import React, {Component} from 'react';
import axios from 'axios';

import styles from './styles.scss';


class Register extends Component {

    state = {
        name: '',
        username: '',
        password: '',
        isEmptyFields: false,
        usernameTouched: false,
        passwordTouched: false,
        nameTouched: false,
        isLoginUsed: false,
        isLoad: false,
    };

    handleRegister = async () => {
        const {name, username, password} = this.state;
        if (name.length === 0 || username.length === 0 || password.length === 0) {
            this.setState({isEmptyFields: true});
            return;
        }
        this.setState({isEmptyFields: false, isLoad: true});
        try {
            const response = await axios.post('http://localhost:8000/register/', {name, username, password});
            this.setState({isLoad: false});
            console.log(response);
        } catch (error) {
            if (error.response.data.username[0] === 'A user with that username already exists.') {
                console.log('asdasd');
                this.setState({isLoginUsed: true});
            }
            this.setState({isLoad: false});
            console.error(error.response.data);
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
                <div className={styles.title}>Регистрация</div>
                <span className={styles.description}>Имя</span>
                <input
                    className={[this.getClassName('name'), styles.inpt].join(' ')}
                    onChange={this.handleChange('name')}
                    type="text"/>
                <span className={styles.description}>Логин</span>
                <input
                    className={[this.getClassName('username'), styles.inpt].join(' ')}
                    onChange={this.handleChange('username')}
                    type="text"/>
                <span className={styles.description}>Пароль</span>
                <input
                    className={[this.getClassName('password'), styles.inpt].join(' ')}
                    onChange={this.handleChange('password')}
                    type="password"/>
                <button
                    className={styles.register}
                    onClick={this.handleRegister}>Регистрация
                </button>
                {this.state.isEmptyFields && <div className={styles.err}>Заполните все поля</div>}
                {this.state.isLoginUsed && <div className={styles.err}>Такой логин уже занят</div>}
            </div>
        );
    }
}

export default Register;