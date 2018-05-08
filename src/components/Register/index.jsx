import React, {Component} from 'react';
import axios from 'axios';

import styles from './styles.scss';


class Register extends Component {

    state = {
        name: '',
        username: '',
        password: '',
        isEmptyFields: false
    };

    handleRegister = async () => {
        const {name, username, password} = this.state;
        if (name.length === 0 || username.length === 0 || password.length === 0) this.setState({isEmptyFields: true});

        try {
            const response = await axios.post('http://localhost:8000/register/', {name, username, password});
            console.log(response);
        } catch (error) {
            console.error(error);
        }

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
                    onClick={this.handleRegister}>Регистрация</button>
                {this.state.isEmptyFields && <div className={styles.err}>Заполните все поля</div>}
            </div>
        );
    }
}

export default Register;