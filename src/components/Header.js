import {useState} from 'react';
import { Link } from 'react-router-dom';

function Header(props){

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const handleSubmit = async (e) => {
        try {
          e.preventDefault();
          const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message);
          }
    
          props.getUser();
        } catch (err) {
          setError(err.message);
        }
      };

    return(
        <div className="header wrapper">
            <h2>Movies</h2>
            <div className="loginHeader">
                <div>
                  <input type="email" placeholder="e-mail" className="emailHeader" onChange={(e) => { setEmail(e.target.value); }} />
                  <input type="password" placeholder="password" className="passwordHeader" onChange={(e) => { setPassword(e.target.value); }} />
                  <button className="loginButtonHeader" onClick={handleSubmit} >Sign In</button>
                </div>
                <p>{error}</p>
                <Link to="/signup">
                  Don't have an account? Sign Up
                </Link>
            </div>
        </div>
    )
}

export default Header;