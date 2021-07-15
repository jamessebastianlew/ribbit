import React, { useState, useContext } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { GlobalContext } from './contexts/global-context.js';

const LoginPage = ({ logged, setLogged }) => {
    const [formState, setFormState] = useState({});
    const { globalState, globalDispatch } = useContext(GlobalContext);
    const history = useHistory();

    const handleChange = (event) => {
        setFormState((state) => {
            return { ...state, [event.target.name]: event.target.value };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { username } = formState;
        const data = { username };
        fetch('http://localhost:5000/api/post/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }).then((res) => {
            return fetch('http://localhost:5000/api/post/get-user', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
        }).then((res) => {
            return res.json();
        }).then((user) => {
            for(const key in user) {
                globalDispatch({ type: 'SET_KEY', payload: {
                    key: key,
                    value: user[key],
                }})
            };
            setLogged(true);
            history.push('/');
        }).catch((err) => {
            console.error(err);
        });
    };

    return (
        <div>
            {logged ? <Redirect to='/' /> : null}
            <form onSubmit={handleSubmit}>
                <header>Login</header>
                <label htmlFor="username">Username:</label>
                <input required type="text" id="username" name="username" placeholder="Enter your username" onChange={handleChange}/>
                <input type="submit" value="Log In" />
            </form>
            <Link to='/signup'><button>Create an Account</button></Link>
        </div>
    );
}

export default LoginPage;