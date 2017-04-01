'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">
                        <img src="img/logo.jpg" alt="" />
                    </a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li>
                            {/*<a href="home">Home</a>*/}
                            <Link to='/Home'> Home </Link>
                        </li>
                        <li>
                            {/*<a href="CreateRace">Create Race</a>*/}
                            <Link to='/CreateRace'> Create Race </Link>
                        </li>
                        <li>
                            {/*<a href="RunRace">Run Races</a>*/}
                            <Link to='/RunRace'> Run Race </Link>
                        </li>
                        <li>
                            {/*<a href="TestMap"> Test Map </a> */}
                            <Link to="/TestMap"> Test Map </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div>{this.props.children}</div>

        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                </div>
            </div>
        </div>
    </div>
    );
  }
}
