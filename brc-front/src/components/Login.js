import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

import Header from './Header';

const Login = (props) => {

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = 0 ;
            
            if(res === null){
                throw new Error("error");
            }
            setTimeout(() => {
                navigate('/sensors')
            }, 2000)
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div className=''>
            <Header />
            <div className='login-box-outside'>

            <div className='title'>
                Log in to your account!
            </div>

            <div className='login-box-inside'>
                <div className='label-box'>
                    <label htmlFor="username" >
                        Username
                    </label>
                </div>
                <div className='input-box'>
                    <input
                    id="username"
                    name="username"
                    required
                    
                    value={userName} onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className='label-box'>
                    <label htmlFor="password" >
                       Password
                    </label>
                </div>
                <div className='input-box'>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='btn-box'>
                    <button
                        onClick={handleLogin}
                        className="btn btn-primary"
                    >
                        Sign in
                    </button>
                </div>

            </div>
            </div>
        </div>
    )
}

export default Login;