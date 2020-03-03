import React, { Fragment, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import './App.css';
import {Provider} from "react-redux"
import store from './redux/store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './redux/auth/auth.actions';
import Alert from "./components/layout/Alert"
import Navbar from "./components/layout/navbar/navbar"
import HomePage from './pages/home/HomePage';
import RegisterPage from "./pages/auth/RegisterPage"
import LoginPage from './pages/auth/LoginPage';
import QuestionsPage from './pages/questions/QuestionsPage';
import QuestionPage from './pages/questions/QuestionPage';
import PrivateRoute from './components/routing/PrivateRoute';
import EditQuestionPage from './pages/questions/EditQuestionPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import AddQuestionPage from './pages/questions/AddQuestionPage';
import SingleUserPage from './pages/user/SingleUserPage';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}


const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
    <Router>
    <Fragment>
    <Alert />
    <Navbar />
    <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/register" component={RegisterPage} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/questions/:category" component={QuestionsPage} />
    <Route exact path="/question/:id" component={QuestionPage} />
    <Route exact path ="/user/:userId" component={SingleUserPage} />
    <PrivateRoute exact path="/edit/:id" component={EditQuestionPage} />
    <PrivateRoute exact path="/dashboard" component={DashboardPage} />
    <PrivateRoute exact path="/add/question" component={AddQuestionPage} />
    </Switch>
    </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
