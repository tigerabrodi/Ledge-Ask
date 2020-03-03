import React, {Fragment} from 'react';
import {Link} from "react-router-dom"
import "./Home.css"

const Home = () => {
    return (
        <Fragment>
            <h1 className="category-title">Business or Tech ?</h1>
            <div className="category-wrapper">
                <div className="category-box">
                    <div className="category-box-wrapper">
                        <div className="img-wrapper">
                            <img
                                src="https://www.gannett-cdn.com/-mm-/c0e49843098aaa35fd763b5fdfd0f7fa746509d4/c=0-39-2236-1302/local/-/media/2017/06/28/USATODAY/USATODAY/636342824209625695-GettyImages-493829717.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp"
                                alt="business"/>
                        </div>
                        <h1>Business</h1>
                        <div className="category-paragraph-wrapper">
                            <p>Are you interested in Business? Do you feel like you need guidance? Is there
                                any decision you need to make? Feel free to ask anything!</p>
                        </div>
                        <Link to="/questions/Business" className="btn btn-outline-slate mb-3">Business</Link>
                    </div>
                </div>
                <div className="category-box">
                    <div className="category-box-wrapper">
                        <div className="img-wrapper">
                            <img
                                src="https://www.tececorp.com/wp-content/uploads/2019/05/050318_LRR_MEN_WomenTech-1-1.jpg"
                                alt="business"/>
                        </div>
                        <h1>Technology</h1>
                        <div className="category-paragraph-wrapper">
                            <p>Are you interested in Technology? Need help with Web Development? Something related to Hardware? Feel free to ask anything!</p>
                        </div>
                        <Link to="/questions/Tech" className="btn btn-outline-slate mb-3">Technology</Link>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Home;
