import React, {useEffect, useState, Fragment} from 'react';
import { connect } from 'react-redux';
import {useParams, withRouter, Link} from "react-router-dom"
import { getAnswers, addAnswer } from '../../../redux/answer/answer.actions';
import "./Question.css"
import { getQuestion, deleteQuestion } from '../../../redux/question/question.actions';
import Moment from "react-moment";
import defaultUserImage from "../../assets/default-image-mern.png"
import Spinner from "../../layout/Spinner"
import AnswerItem from '../answer/AnswerItem';

const Question = ({auth, history, question: {question}, answer: {answers, loading}, getAnswers, getQuestion, addAnswer, deleteQuestion}) => {

    let {id} = useParams();

    const [addAnswerInput, setAddAnswerInput] = useState("")

    useEffect(() => {
        getAnswers(id);
        getQuestion(id);
    }, [answers])

    return !question || loading || question.loading ? <Spinner /> :   (
        <Fragment> 
            <div className="single-question-wrapper">
                <div className="single-question-author-wrapper">
                    <div className="single-question-author-img" onClick={() => history.push(`/user/${question.user._id}`)}>
                    <img src={question.user.image ? question.user.image : defaultUserImage} alt="avatar"/>
                    </div>
                    <h3> {question.user.name} </h3>
                    <p> {question.user.profession} </p>
                </div>
                <div className="single-question-content">
                    <h2>{question.title} </h2>
                    <p> {question.description} </p>
                </div>
                <div className="single-question-category-wrapper">
                    <h4> Category: {" " + question.category} </h4>
                    <div className="single-question-buttons-wrapper">
                    {auth.user && (
                        <Fragment>
                        {question.user._id === auth.user._id && (
                            <Fragment>
                    <Link className="btn btn-outline-slate" to={`/edit/${question._id}`}> <i className="fas fa-edit" /> </Link>
                    <button className="btn btn-outline-slate" onClick={() => {
                        deleteQuestion(question._id);
                       history.push("/dashboard");
                    }}> <i className="fas fa-trash" /> </button>     
                    </Fragment>
                        )}
                        </Fragment>
                    )}

                    </div>
                </div>
            </div>
        <div className="add-answer">
        {auth.isAuthenticated && (
            <Fragment>
            
        <input type="text" value={addAnswerInput} onChange={(e) => setAddAnswerInput(e.target.value)} className="form-control"/>
        <button className="btn btn-outline-slate" onClick={() => {
            addAnswer(addAnswerInput, question._id);
            setAddAnswerInput("");
            }
            }>Add Answer</button>
            </Fragment>
        )}
        </div>
            <div className="answer-big-wrapper">
            {answers.map(answer => (

                <AnswerItem defaultUserImage={defaultUserImage} answer={answer} key={answer._id} /> 

            ))}
            </div>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    question: state.question,
    answer: state.answer
})

export default withRouter(connect(mapStateToProps, {getAnswers, getQuestion, addAnswer, deleteQuestion})(Question));
