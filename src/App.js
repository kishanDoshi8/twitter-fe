import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeScreen from './components/home/Home';
import LoginScreen from './components/login/LoginScreen';
import { Provider } from 'react-redux';
import store from './store';
import Register from './components/login/Register';
import Navbar from './components/Navbar/Navbar';
import { useState } from 'react';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBell, faHashtag, faHome, faInbox, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from './components/Navbar/Nav';
import Tweet from './components/home/Tweet';

function App() {

    const [selected, setSelected] = useState('home');

    const tabs = ['home', 'explore', 'notifications', 'messages', 'profile'];

    // const icons = new Set(["faHome", "faHashTag", "faBell", "faInbox", "faUser"])
    const icons = new Map();
    icons.set("home", faHome);
    icons.set("explore", faHashtag);
    icons.set("notifications", faBell);
    icons.set("messages", faInbox);
    icons.set("profile", faUser);

  return (
    <div className="App">
        <Provider store={store} >
            <Router>
                <Switch>
                    <Route exact path="/">
                        <LoginScreen />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    
                    <Route exact path="/home">
                        <Navbar tabs={tabs} icons={icons} selected={selected} setSelected={setSelected}>
                            <Nav isSelected ={selected === 'home'} >
                                <HomeScreen />
                            </Nav>
                        </Navbar>
                    </Route>

                    <Route path="/tweet/">
                        <Navbar tabs={tabs} icons={icons} selected={selected} setSelected={setSelected}>
                            <Nav isSelected ={selected === 'home'} >
                                <Tweet />
                            </Nav>
                        </Navbar>
                    </Route>

                    <Route exact path="/explore">
                        <Navbar tabs={tabs} icons={icons} selected={selected} setSelected={setSelected}>
                            <Nav isSelected ={selected === 'explore'} >
                                <HomeScreen />
                            </Nav>
                        </Navbar>
                    </Route>
                </Switch>   
            </Router>
        </Provider>

    </div>
  );
}

export default App;
