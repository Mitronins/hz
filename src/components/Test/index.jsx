import React, {Component} from 'react';
import request from "../../../utils/request";

import styles from './styles.scss';


class Test extends Component {
    state = {
        isLoading: true,
        isError: false,
        test: {
            chapters: []
        },
    };

    componentWillMount = () => {
        this.getTest();
        this.startTest();
    };

    startTest = async () => {
        const {id} = this.props.match.params;
        const token = 'Token ' + localStorage.getItem('token');
        const result = await request(`/api/tests/${id}/start/`, {}, 'post', {headers: {Authorization: token}});
    };

    stopTest = async () => {
        const {id} = this.props.match.params;
        const token = 'Token ' + localStorage.getItem('token');
        const result = await request(`/api/tests/${id}/stop/`, {}, 'post', {headers: {Authorization: token}});
    };

    getTest = async () => {
        const {id} = this.props.match.params;
        const token = 'Token ' + localStorage.getItem('token');
        const result = await request(`/api/tests/${id}/`, {}, 'get', {headers: {Authorization: token}});

        const isError = Boolean(result.error);
        console.log(isError);
        this.setState({
            isLoading: false,
            isError
        });


        if (!isError) {
            this.setState({
                test: result.response.data
            });
        }
    };

    render() {
        const {isLoading, test, isError} = this.state;
        return (
            <div className={styles.container}>
                {isLoading && <div className={styles.loading}/>}
                {isError && <div className={styles.error}>ошибка</div>}
                {!isError && !isLoading && <div>
                    <div className={styles.title}>{test.title}</div>
                    <div className={styles.description}>{test.description}</div>
                </div>}
            </div>
        );
    }
}

export default Test;