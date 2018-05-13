import React, {Component} from 'react';

import styles from './styles.scss';


class OneQuestion extends Component {

    getAnswers = () => {
        const {question} = this.props;
        const inputs = this.props.question.answers.map(answer =>
            <div key={answer.id} className={styles.answers}>
                <input key={answer.id}
                       type="radio"
                       id={answer.id}
                       name={question.id}
                       value={answer.text}/>
                <label htmlFor={answer.id}>{answer.text}</label>
            </div>);
        return <div className={styles.answers}>{inputs}</div>
    };

    render() {
        const {question} = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.title}>{question.text}</div>
                {question.type === 0 && <div>
                    <div className={styles.answers}>
                        {this.getAnswers()}
                        {/*{this.getLabelAnswers()}*/}
                    </div>
                </div>}
                {question.type === 1 &&
                <div>
                    <input className={styles.inpt} type="text" placeholder={'Введите ответ'}/>
                </div>}
                <button onClick={this.handleOkClick} className={styles['btn-ok']}>OK</button>
            </div>
        );
    }

    handleOkClick = () => {

    }
}

export default OneQuestion;