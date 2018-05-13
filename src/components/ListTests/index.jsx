import React, {Component} from 'react';
import request from "../../../utils/request";
import OneTest from "./OneTest";

import styles from './styles.scss';


class ListTests extends Component {
    state = {
        isLoading: true,
        isError: false,
        tests: [],
        myTests: []
    };

    componentWillMount = () => {
        this.getTests();
    };

    getTests = async () => {
        const token = 'Token ' + localStorage.getItem('token');
        const allTests = request('/api/tests/', {}, 'get', {headers: {Authorization: token}});
        const myTests = request('/api/tests/?my=1', {}, 'get', {headers: {Authorization: token}});
        const [{response: allTestsRes, error: allTestsError},
            {response: myTestsRes, error: myTestsError}] = [await allTests, await myTests];
        const isError = Boolean(allTestsError || myTestsError);
        this.setState({
            isLoading: false,
            isError
        });

        if (!isError) {
            this.setState({
                tests: this.setTestsState(allTestsRes.data.results, myTestsRes.data.results)
            });
        }
    };

    setTestsState = (allTests, myTests) => {
        if (myTests.length !== 0) {
            for (let i = 0; i < myTests.length; i++) {
                for (let j = 0; j < allTests.length; j++) {
                    if (myTests[i].id === allTests[j].id) {
                        allTests[j].status = myTests[i].status;
                    }
                }
            }
            return allTests
        } else {
            return allTests;
        }
    };

    getListTests = () => this.state.tests.map(test => <OneTest key={test.id} test={test}/>);


    render() {
        const {isLoading, isError} = this.state;
        const tests = this.getListTests();
        return (
            <div className={styles.container}>
                {isLoading && <div className={styles.loading}/>}
                {!isLoading && isError && <div className={styles.error}>ошибка</div>}
                {!isLoading && !isError && <div>{tests}</div>}
            </div>
        );
    }
}

export default ListTests;