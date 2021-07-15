import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import RecordView from './components/RecordView.js';
import GlobalProvider from './contexts/global-context.js';

import LoginPage from './LoginPage.js';
import SignupPage from './SignupPage.js';
import ConversationsListPage from './ConversationsListPage.js';
import FeedPage from './FeedPage.js';
import RecordFeedPage from './RecordFeedPage.js';

const App = () => {
    const [logged, setLogged] = useState(false);
    return (
        <GlobalProvider>
            <Router>
                <Switch>
                    <Route path='/signup' exact><SignupPage /></Route>
                    <Route path='/login' exact><LoginPage setLogged={setLogged}/></Route>
                        
                    {
                        logged ?
                        <>
                        <Route path='/conversations-list' exact><ConversationsListPage /></Route>
                        <Route path='/feed' exact><FeedPage /></Route>
                        <Route path='/record-feed' exact><RecordFeedPage /></Route>
                        <Redirect to='/feed' /> 
                        </>
                        :
                        <Redirect to='/login' />
                     }

                    <Route path='/'>
                        { logged ? <Redirect to='/feed' /> : <Redirect to='/login' /> }
                    </Route>

                </Switch>
            </Router>
        </GlobalProvider>

    );
};

export default App;