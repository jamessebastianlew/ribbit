import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

const SignupPage = () => {
    const [languages, setLanguages] = useState([]);
    const [formState, setFormState] = useState({});
    const imageRef = useRef(null);
    const history = useHistory();

    useEffect(() => {
        fetch('http://localhost:5000/api/get/languages', {
            method: 'get'
        }).then((res) => {
            return res.json();
        }).then((languages) => {
            setLanguages(languages);
        }).catch((err) => {
            throw new Error('while fetching langauges');
        });
    }, []);

    const handleChange = (event) => {
        setFormState((state) => {
            return { ...state, [event.target.name]: event.target.value };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData;
        formData.append('username', formState.username);
        formData.append('nativeLanguage', formState.nativeLanguage);
        formData.append('learnLanguage', formState.learnLanguage);
        formData.append('avatar', imageRef.current.files[0], imageRef.current.files[0].name);

        fetch('http://localhost:5000/api/post/signup', {
            method: 'POST',
            body: formData
        }).then((res) => {
            history.push('/');
        }).catch((err) => {
            throw err;
        });
        
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fname">Username:</label>
                <input required type="text" id="username" name="username" placeholder="Enter a username" onChange={handleChange}/>
                <label htmlFor="nativeLanguage">Native Language:</label>
                <select required defaultValue="default" name="nativeLanguage" id="nativeLanguage" onChange={handleChange}>
                    <option key={0} value="default" disabled>Select Native Language</option>
                    {languages.map((language, ind) => <option key={ind + 1} value={`${language}`}>{language}</option>)}
                </select>
                <label htmlFor="learnLanguage">Learning Language:</label>
                <select required defaultValue="default" name="learnLanguage" id="learnLanguage" onChange={handleChange}>
                    <option key={0} value="default" disabled>Select Learning Language</option>
                    {languages.map((language, ind) => <option key={ind + 1} value={`${language}`}>{language}</option>)}
                </select>
                <input required ref={imageRef} type="file" id="avatar" name="avatar" placeholder="Choose Profile Picture" accept="image/*"/>
                <input type="submit" value="Create Account" />
            </form>
            <Link to='/login'><button>Log in</button></Link>
        </div>
    );
}

export default SignupPage;