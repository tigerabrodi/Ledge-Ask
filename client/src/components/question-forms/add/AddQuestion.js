import React, {useState} from 'react';
import { connect } from 'react-redux';
import { askQuestion } from '../../../redux/question/question.actions';
import { withRouter } from 'react-router-dom';
import "./AddQuestion.css"

const AddQuestion = ({askQuestion, history}) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Business",
        Option1: "Business",
        Option2: "Tech"
    });

    const {title, description, category, Option1, Option2} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    

    const onChangeDropdown = () => setFormData({
        ...formData,
        category: Option1
    });

    const onChangeDropdown1 = () => setFormData({
        ...formData,
        category: Option2
    })


    const onSubmit = e => {
        e.preventDefault();
        askQuestion(formData, history)
    };

    return (
        <div className="register-form-wrapper">
        <div className="register-form">
            <form onSubmit={e => onSubmit(e)}>
            <div className="form-group">
            <label htmlFor="Title">Title</label>
            <input type="title" name="title" placeholder="Enter Your title.." value={title} onChange={e => onChange(e)} className="form-control" required  />
            </div>
            <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea type="description" value={description} placeholder="Enter Your description.." name="description" className="form-control" onChange={e => onChange(e)} col="10" row="3" required ></textarea>
            </div>
            <div class="btn-group">
            <button type="button" class="btn btn-outline-slate dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {category}
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" onClick={() => onChangeDropdown()}>{Option1} </a>
              <a class="dropdown-item" onClick={() => onChangeDropdown1()}>{Option2}</a>
            </div>
          </div>
          <br />
            <button className="btn btn-outline-slate btn-register">Submit</button>
            </form>
        </div>
    </div>
    );
}

export default withRouter(connect(null, {askQuestion})(AddQuestion));
