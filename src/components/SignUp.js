import {useState} from 'react';
import { Link } from 'react-router-dom';

function SignUp(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    async function signUpUser() {
        try {
        const body = {
            email,
            password,
            firstName,
            lastName,
        };
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        const loginResponse = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!loginResponse.ok) {
            throw new Error(data.message);
        }

        props.getUser();
        } catch (err) {
        console.log('error?');
        props.updateUser(undefined);
        console.log({ err });
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        signUpUser();
        
    }

    return(
        <div className="signUpPage">
            <div className="signUp">
                <input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                <input type="email" placeholder="e-mail" className="emailSignUp" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" className="passwordSignUp" onChange={(e) => setPassword(e.target.value)} />
                <button className="signUpButton" onClick={handleSubmit}>Sign Up</button>
                <Link to="/login">
                Already have an account? Sign in
              </Link>
            </div>
        </div>
    )
}

export default SignUp;