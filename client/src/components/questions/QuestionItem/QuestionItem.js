import React, { Fragment } from 'react';
import "./QuestionItem.css"
import {connect} from "react-redux"
import { likeQuestion } from '../../../redux/question/question.actions';
import { withRouter, Link } from 'react-router-dom';
import Moment from "react-moment"
import defaultUserImage from "../../assets/default-image-mern.png"


const QuestionItem = ({question: {title, date, dislikes, likes, _id}, user, history, auth, loading, likeQuestion}) => {


    return (
        <Fragment>
            <div className="question-item-wrapper">
                <div className="like-wrapper">
                    <i className="fas fa-arrow-up" onClick={() => likeQuestion(_id, auth.isAuthenticated, history)} />
                       <div>
                       {likes.length}
                       </div> 
                </div>
                <div className="question-item-box" onClick={() => history.push(`/question/${_id}`)}>
                    <div className="author-wrapper">
                    <div className="author-image-wrapper">
                        <img src={user.image ? user.image : defaultUserImage} alt="avatar"  />
                    </div>
                    <h3 className="author-name"> {user.name} </h3>
                    <p className="author-profession">{user.profession} </p>
                    </div>
                    <div className="question-wrapper">
                    <p> {title} </p>
                    <small>Posted on <Moment format="YYYY/MM/DD"> {date} </Moment> </small>
                    </div>
                    </div>
            </div>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default withRouter(connect(mapStateToProps, {likeQuestion})(QuestionItem));
