import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home.jsx';
import CreateDog from './components/CreateDog/CreateDog.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path={'/'} render={() => <LandingPage/>}/>
          <Route path={'/home'} render={() => <Home/>} />
          <Route path={'/dogs/create'} render={() => <CreateDog/>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
