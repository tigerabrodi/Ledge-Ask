import React, {useEffect, Fragment} from 'react';
import {connect} from "react-redux"
import { getUserQuestions } from '../../redux/question/question.actions';
import {useParams} from "react-router-dom"
import { getUserById } from '../../redux/auth/auth.actions';
import "./SingleUser.css";
import defaultUserImage from "../assets/default-image-mern.png"
import Spinner from "../layout/Spinner"
import QuestionItem from "../questions/QuestionItem/QuestionItem"

const SingleUser = ({question: {questions, loading}, getUserQuestions, getUserById, auth}) => {

    let {userId} = useParams();

    useEffect(() => {
        getUserQuestions(userId)
        getUserById(userId);
    }, []);

    return loading || auth.loading || !auth.user ? <Spinner /> : 
     (
        <Fragment>
            <div className="single-user-wrapper">
            <div className="single-user-img-wrapper">
            {auth.user && (
                                <img src={auth.user.image ? auth.user.image : defaultUserImage} alt="avatar"/>
            )}
            </div>
            <div className="single-user-info-wrapper">
            <h2> {auth.user.name} </h2>
            <p>{auth.user.profession}</p>
            </div>
            </div>
            <br />
            {questions && (
                <Fragment>
                <div className="container">
                <div className="row">
                <h1 className="single-user-name"> {auth.user.name.trim().split(' ')[0]}s Questions </h1>
                                {questions.map(question => (
                                    <div className="col-12">
                                                                            <QuestionItem key={question._id} user={question.user} question={question} />
                                    </div>
                ))}
                </div>
                </div>

                </Fragment>
            )}
        </Fragment>
    );
}

const mapStateToProps = state => ({
    question: state.question,
    auth: state.auth
});

export default connect(mapStateToProps, {getUserQuestions, getUserById})(SingleUser);
