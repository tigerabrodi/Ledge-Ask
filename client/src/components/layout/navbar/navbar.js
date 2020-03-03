import React, {Fragment} from 'react';
import "./navbar.css"
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../../redux/auth/auth.actions"

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
    const authLinks = (
        <ul className="navbar-nav ml-auto">
        <li className="nav-item text-green-weed">
            <Link className="nav-link font-weight-bold" to="/">Questions</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link text-green-weed" to="/dashboard">
            <i className="fas fa-user" /> {" "}
            <span className="hide-sm font-weight-bold">Dashboard</span>
            </Link>
        </li>
        <li className="nav-item">
        <a onClick={logout} className="nav-link text-green-weed" href="#!">
        <i className="fas fa-sign-out-alt" /> {" "}
        <span className="hide-sm font-weight-bold">Logout</span>
        </a>
    </li>
    </ul>
    );

    const guestLinks = (
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
        <Link className="nav-link text-green-weed font-weight-bold" to="/">Questions</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link text-green-weed font-weight-bold" to="/register">Register</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link text-green-weed font-weight-bold" to="/login">Login</Link>
        </li>
    </ul>
    );

    return (
        <nav className="navbar navbar-dark navbar-expand-md mb-3">
        <div className="container">
            <Link className="navbar-brand" to="/"> <i className="fas fa-brain" /> {" "} LedgeAsk</Link>
            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                {!loading && (
                    <Fragment> {isAuthenticated ? authLinks : guestLinks} 
                    </Fragment>
                )}
            </div>
        </div>
    </nav>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {logout})(Navbar);