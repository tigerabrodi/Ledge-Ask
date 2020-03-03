import React, {Fragment, useState} from 'react';
import {connect} from "react-redux"
import {login} from "../../redux/auth/auth.actions"
import "./Auth.css"
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../redux/alert/alert.actions';

const Login = ({auth: {isAuthenticated}, login}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const {email, password} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    


    const onSubmit = e => {
        e.preventDefault();
            login(email, password)
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
                    <label htmlFor="Email">Email</label>
                    <input type="email" name="email" placeholder="Enter Your Email.." value={email} onChange={e => onChange(e)} className="form-control" required  />
                    </div>
                    <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input type="password" value={password} placeholder="Enter Your Password.." name="password" className="form-control" onChange={e => onChange(e)} required />
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

export default connect(mapStateToProps, {login})(Login);

