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
        <div>
            <Header />
            <div>
                Log in to your account!
            </div>

            <div>
                <div>
                    <label htmlFor="username" >
                        Username
                    </label>
                </div>
                <div >
                    <input
                    id="username"
                    name="username"
                    required
                    
                    value={userName} onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password" >
                       Password
                    </label>
                </div>
                <div >
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        onClick={handleLogin}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign in
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Login;