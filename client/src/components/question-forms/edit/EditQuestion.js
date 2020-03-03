import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { getQuestion, updateQuestion } from '../../../redux/question/question.actions';

const EditQuestion = ({question: {question, loading}, getQuestion, history, updateQuestion}) => {

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })
    
    let {id} = useParams();
    
    useEffect(() => {
        getQuestion(id);
        setFormData({
            title: loading || !question.title ? "" : question.title,
            description: loading || !question.description ? "" : question.description,
        })
    }, [getQuestion, loading])

    const {title, description} = formData;


    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        updateQuestion(formData, id, history)
}

    return (
        <Fragment>
    <div className="register-form-wrapper">
        <div className="register-form">
            <form onSubmit={e => onSubmit(e)}>
            <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" placeholder="Change The Title To..." value={title} onChange={e => onChange(e)} className="form-control" required  />
            </div>
            <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea type="text" value={description} placeholder="Change Your Description To..." name="description" className="form-control" onChange={e => onChange(e)} required col="10" row="3"></textarea>
            </div>
            <button className="btn btn-outline-slate btn-register">Submit</button>
            </form>
        </div>
    </div>
        </Fragment>
    );
    }

const mapStateToProps = state => ({
    question: state.question
});


export default withRouter(connect(mapStateToProps, {getQuestion, updateQuestion})(EditQuestion));
