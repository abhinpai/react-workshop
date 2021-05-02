import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = lazy(() => import('./app'));
const Hotstar = lazy(() => import('./hotstar/Hotstar'));
const Netflix = lazy(() => import('./netflix/Netflix'));

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path='/home' component={App} />
          <Route path='/netflix' component={Netflix} />
          <Route path='/hotstar' component={Hotstar} />
          <Route exact path='/' component={App} />
        </Switch>
      </Suspense>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
