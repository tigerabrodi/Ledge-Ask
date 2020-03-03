import React, { Fragment, useState } from 'react';
import "./AnswerItem.css"
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateAnswer, deleteAnswer } from '../../../redux/answer/answer.actions';

const AnswerItem = ({answer: {text, user, _id}, history, defaultUserImage, auth, updateAnswer, deleteAnswer}) => {

    const [editMode, setEditMode] = useState(false);

    const [answerInput, setAnswerInput] = useState(text);

    const updateAnswerSubmit = () => {
        updateAnswer(answerInput, _id);
        setEditMode(false);
    }


    return (
        <Fragment>
        <div className="answer-wrapper">
            <div className="answer-author-wrapper">
            <div className="answer-image-wrapper" onClick={() => history(`/user/${user._id}`)}>
                <img src={user.image ? user.image : defaultUserImage} alt="avatar"/>
            </div>
            <div className="answer-author-text">
                <h3> {user.name} </h3>
                <p> {user.profession} </p>
            </div>
            </div>
            <div className="answer-text-wrapper">
                {editMode ? (
                    <Fragment>
                    <input type="text" onChange={(e) => setAnswerInput(e.target.value)} value={answerInput} className="form-control"/>
                    <button className="btn btn-outline-slate" onClick={() => updateAnswerSubmit()}>Submit</button>
                    </Fragment>
                ) : (
                   <p> {text} </p> 
                )}
            </div>
            {auth.user ? (
                <Fragment>
                {user._id === auth.user._id && (
                                                <div className="answer-buttons">
            <button className="btn btn-outline-slate answer-button" onClick={() => setEditMode(!editMode)}><i className="fas fa-edit" /> </button>
            <button className="btn btn-outline-slate answer-button" onClick={() => deleteAnswer(_id)}> <i className="fas fa-trash-alt" /> </button>
            </div>
                )}

            </Fragment>
            ) : null}


        </div>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default withRouter(connect(mapStateToProps, {updateAnswer, deleteAnswer})(AnswerItem));
