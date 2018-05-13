import React, {Component} from 'react';

import styles from './styles.scss';


class OneQuestion extends Component {

    state = {
        selectedOption: null,
        text: ''
    };

    getAnswers = () => {
        const {question} = this.props;
        const inputs = this.props.question.answers.map(answer =>
            <div key={answer.id} className={styles.answers}>
                <input key={answer.id}
                       type="radio"
                       id={answer.id}
                       name={question.id}
                       checked={this.state.selectedOption === answer.text}
                       onChange={this.handleOptionChange}
                       value={answer.text}/>
                <label htmlFor={answer.id}>{answer.text}</label>
            </div>);
        return <div className={styles.answers}>{inputs}</div>
    };

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
        const {question} = this.props;
        for (let i = 0; i < question.answers.length; i++) {
            if (changeEvent.target.value === question.answers[i].text) {
                question.answers[i].is_true ? this.props.getAnswer(question.id, true) : this.props.getAnswer(question.id, false);
            }
        }
    };

    handleTextInput = (changeEvent) => {
        this.setState({
            text: changeEvent.target.value
        });
        const {question} = this.props;
        question.answers[0].text === changeEvent.target.value ? this.props.getAnswer(question.id, true) : this.props.getAnswer(question.id, false);
    };

    render() {
        const {question} = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.title}>{question.text}</div>
                {question.type === 0 && <div>
                    <div className={styles.answers}>
                        {this.getAnswers()}
                    </div>
                </div>}
                {question.type === 1 &&
                <div>
                    <input onChange={this.handleTextInput} className={styles.inpt} type="text"
                           placeholder={'Введите ответ'}/>
                </div>}

            </div>
        );
    }

}

export default OneQuestion;