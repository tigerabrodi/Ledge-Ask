import React, { Fragment, useState, useEffect } from 'react';
import {connect} from "react-redux"
import "./Questions.css"
import {useParams} from "react-router-dom"
import { getQuestions } from '../../../redux/question/question.actions';
import Pagination from '../Pagination/Pagination';
import QuestionItem from '../QuestionItem/QuestionItem';
import Spinner from '../../layout/Spinner';


const Questions = ({question: {questions, loading, totalQuestions}, getQuestions}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage] = useState(5);
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
    let {category} = useParams();

    useEffect(() => {
        getQuestions(currentPage, category);
    }, [currentPage]);

    return loading || !totalQuestions || !questions ? <Spinner /> :  (
        <Fragment>
            <div className="container">
            <div className="row">
            <div className="col text-center">
            <h1 className="questions-title"> {category + " "} Questions  </h1>
            </div>
            </div>
            </div>

            <div className="container">
            <div className="row">
            {questions.map(question => (
                <div className="col-md-12">
                    <QuestionItem  key={question._id} user={question.user} question={question} />
                </div>
            ))}
            <div className="col text-center">
            {questions && (
                            <Pagination questionsPerPage={questionsPerPage} totalQuestions={totalQuestions} paginate={paginate} />

            )}
            </div>
            </div>
            </div>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    question: state.question
})

export default connect(mapStateToProps, {getQuestions})(Questions);
