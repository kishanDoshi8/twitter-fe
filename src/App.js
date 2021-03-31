import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeScreen from './components/home/Home';
import LoginScreen from './components/login/LoginScreen';
import { Provider } from 'react-redux';
import store from './store';
import Register from './components/login/Register';
import Navbar from './components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import { faBell, faHashtag, faHome, faInbox, faUser } from '@fortawesome/free-solid-svg-icons';
import Nav from './components/Navbar/Nav';
import Tweet from './components/home/Tweet';

function App() {
    const [selected, setSelected] = useState(window.location.pathname.split('/')[1]);

    const tabs = ['Home', 'Explore', 'Notifications', 'Messages', 'Profile'];

    const icons = new Map();
    icons.set("Home", faHome);
    icons.set("Explore", faHashtag);
    icons.set("Notifications", faBell);
    icons.set("Messages", faInbox);
    icons.set("Profile", faUser);

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
                            <Nav isSelected ={selected === 'tweet'} >
                                <Tweet />
                            </Nav>
                        </Navbar>
                    </Route>

                    <Route exact path="/explore">
                        <Navbar tabs={tabs} icons={icons} selected={selected} setSelected={setSelected}>
                            <Nav isSelected ={selected === 'explore'} >
                                Explore Y'all
                            </Nav>
                        </Navbar>
                    </Route>

                    <Route exact path="/notifications">
                        <Navbar tabs={tabs} icons={icons} selected={selected} setSelected={setSelected}>
                            <Nav isSelected ={selected === 'notifications'} >
                                ding ding
                            </Nav>
                        </Navbar>
                    </Route>

                    <Route exact path="/messages">
                        <Navbar tabs={tabs} icons={icons} selected={selected} setSelected={setSelected}>
                            <Nav isSelected ={selected === 'messages'} >
                                Ssup
                            </Nav>
                        </Navbar>
                    </Route>

                    <Route exact path="/profile">
                        <Navbar tabs={tabs} icons={icons} selected={selected} setSelected={setSelected}>
                            <Nav isSelected ={selected === 'profile'} >
                                Looking good!!
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
