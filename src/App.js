import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SecondPage from './pages/SecondPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <BrowserRouter>
            <div id="page-body">
              <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/2" component={SecondPage} exact />
              </Switch>
            </div>
          </BrowserRouter>
      </header>
    </div>
  );
}

export default App;