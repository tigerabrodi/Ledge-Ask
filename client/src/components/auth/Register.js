import React, {Fragment, useState} from 'react';
import {connect} from "react-redux"
import {register} from "../../redux/auth/auth.actions"
import "./Auth.css"
import { Redirect, withRouter } from 'react-router-dom';
import { setAlert } from '../../redux/alert/alert.actions';

const Register = ({auth: {isAuthenticated}, register}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        profession: ""
    });

    const {name, email, password, password2, profession} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    


    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert("danger", "Passwords do not match")
        } else {
            register(name, email, password, profession)

        }
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <div className="register-form-wrapper">
                <div className="register-form">
                    <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                    <label htmlFor="Name">Name</label>
                    <input type="text" name="name" placeholder="Enter Your Name.." value={name} onChange={e => onChange(e)} className="form-control" required  />
                    </div>
                    <div className="form-group">
                    <label htmlFor="Profession">Profession</label>
                    <input type="text" value={profession} placeholder="What do you do..." name="profession" className="form-control" onChange={e => onChange(e)} required />
                    </div>
                    <div className="form-group">
                    <label htmlFor="Email">Email</label>
                    <input type="email" placeholder="Enter Your Email.." name="email" value={email} className="form-control" onChange={e => onChange(e)}   required />
                    </div>
                    <div className="form-group">
                    <label htmlFor="Passowrd">Password</label>
                    <input type="password" name="password" value={password} onChange={e => onChange(e)} placeholder="Enter Your Password.."  className="form-control" required />
                    </div>
                    <div className="form-group">
                    <label htmlFor="Confirm Password">Confirm Password</label>
                    <input type="password" value={password2} onChange={e => onChange(e)} className="form-control" name="password2" placeholder="Confirm Your Password.." required />
                    </div>
                    <button className="btn btn-outline-slate btn-register">Submit</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {register})(Register);

