import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate();


  const unAuthedGet = async (path) => {
    try {
      console.log(document.host);
      const res = await fetch(document.location.origin+path, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
          credentials: "include"
      });
      if(res.status!==200)
        throw new Error('error');
      return res
    }
    catch (error){
      return null;
    }
  }


    const unAuthedPost = async (path, body) => {
      try{
        const result = await fetch(document.location.origin+path, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        if(result.status!==200)
          throw new Error('error');

        return result;

      }
      catch(error){
        return null;
      }
    }


  const authedGet =  async (path) => {
    try {
      const res = await fetch(document.location.origin+path, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
          credentials: "include"
      });
      if(res.status!==200)
        throw new Error('error');
      return res;

    }
    catch (error){
      await triggerUpdate();
      const res = await fetch(document.location.origin+path, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
          credentials: "include"
      });
      if(res.status!==200)
        return null;

      return res;
    }
  }


  const triggerUpdate = async () => {
    try {

      const res = await fetch(document.location.origin+'/api/auth/whoami', {
          method: "GET",
          headers: {"Content-Type": "application/json"},
          credentials: "include"
      });
      if(res.status!==200)
        throw new Error('error');
      setUser(await res.json());
    }
    catch (error){
        setUser(null);
        navigate('/login')
    }
  }


  const authedPost = async(path, body) => {
    try{
      const result = await fetch(document.location.origin+path, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if(result.status!==200)
        throw new Error('error');

      return result;

    }
    catch(error){
      await triggerUpdate();
      const result = await fetch(document.location.origin+path, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if(result.status!==200)
        return null;

      return result;
    }
  }


  useEffect(() => {
    triggerUpdate();
  }, []);


  return (
    <AuthContext.Provider value={{user, triggerUpdate, authedPost, authedGet, unAuthedGet, unAuthedPost}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

export const useAuth = () => {
  return useContext(AuthContext);
};
