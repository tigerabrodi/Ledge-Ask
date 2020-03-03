import React, {Fragment, useState, useEffect} from 'react';
import "./Dashboard.css"
import {connect} from "react-redux";
import Spinner from "../layout/Spinner"
import { getUserQuestions } from '../../redux/question/question.actions';
import { updateUserImage } from '../../redux/auth/auth.actions';
import defaultUserImage from "../assets/default-image-mern.png"
import QuestionItem from "../questions/QuestionItem/QuestionItem"
import {Link} from "react-router-dom"

const Dashboard = ({question: {questions, loading}, auth: {user}, getUserQuestions, updateUserImage}) => {
    

    useEffect(() => {
        if (user) {
        getUserQuestions(user._id);
        }
    }, [questions, user])

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState("Upload Image");
    const [imageFile, setImageFile] = useState(false);

    const onChange = e => {
        setFile(e.target.files[0]);
        setImageFile(!imageFile);
        setFileName(e.target.files[0].name)
      };

      const onSubmit = e => {
          e.preventDefault();
          updateUserImage(file);
          setFileName("Upload Image")
          setImageFile(!imageFile);
      }

    return loading || !user ? <Spinner /> : (
        <Fragment>
        <div className="container">
        <div className="row">
        <div className="col-10">
        <div className="text-center">
        <Link className="btn btn-outline-slate" to="/add/question"> <i className="fas fa-plus" /> </Link>
                <p className="btn-outline-slate dashboard-slate">Ask Question</p>
                <img src={user.image ? user.image : defaultUserImage} alt="avatar" className="dashboard-image" />
                    <h3 className="dashboard-name mt-2">{user.name} </h3>
                    <p className="dashboard-profession"> {user.profession} </p>
            <form onSubmit={onSubmit} className="image-upload-form mt-1">
        <div class="input-group mb-3">
        <div class="custom-file">
          <input type="file" onChange={e => onChange(e)} class="custom-file-input" />
          <label class="custom-file-label">{fileName}</label>
        </div>
      </div>
      {imageFile && (
                               <input type="submit" value="Submit Upload" className="btn btn-outline-slate" /> 
      )}

        </form>
        <h1 className="dashboard-questions-title">{questions ? "Questions" : "You Currently Have No Questions"} </h1>

        {questions && (
            <Fragment>
                  {questions.map(question => (
            <QuestionItem key={question._id} user={question.user} question={question} />
        ))}  
        </Fragment>
        )}

        </div>
        </div>
        </div>
        </div>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    question: state.question
})

export default connect(mapStateToProps, {getUserQuestions, updateUserImage})(Dashboard);
