'use strict';

import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class AppRoutes extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
      </MuiThemeProvider>
    );
  }
}
