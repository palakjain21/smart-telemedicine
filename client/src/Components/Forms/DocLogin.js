import React from 'react';
import { useState } from 'react';
import { useHistory, Link, Redirect} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeNavbar from '../HomeNavbar/HomeNavbar';
import Cookies from 'js-cookie';
import { doctorLoginApi } from '../../api/index';


const DocLogin = () => {
  const [loginEmail, setloginEmail] = useState('');
  const [loginPassword, setloginPassword] = useState('');
  const history = useHistory();

  const updateEmail = (e) => {
    setloginEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setloginPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    if (!loginPassword || !loginEmail) {
      toast.dark('Enter Email and Password', {
        position: 'top-right',
        autoClose: 100000,
      });
    } else {
      e.preventDefault();
      const data = await doctorLoginApi(loginEmail, loginPassword);
      if (data.success === true) {
         Cookies.set('token', data.token);
         history.push('/docdashboard');
       }
       if (data.success === false) {
         toast.dark('Wrong Credentials');
         setloginEmail('');
         setloginPassword('');
       }
    }
  };

  if (Cookies.get('token')) return <Redirect to="/docdashboard"></Redirect>;

  return (
    <div className="signincontainer">
      <HomeNavbar />
      <div className="Home">
        <div className="main-container">
          <h1 className="signin">LOGIN</h1>
          <div className="container">
            <form>
            <label>Email</label>
              <input
                className="input"
                type="email"
                name="email"
                value={loginEmail}
                placeholder="Email"
                onChange={updateEmail}
              />
              <label>Password</label>
              <input
                className="input"
                type="password"
                name="password"
                value={loginPassword}
                placeholder="Password"
                onChange={updatePassword}
              />

              <button onClick={handleLogin} className="button" type="submit">
                Submit
              </button>
              <ToastContainer position="top-right" autoClose={1000} />
            </form>
          </div>
        </div>
        <div className="main">
          <p className="text">Don't have an account ? Signup Here!</p>
          <Link to="/docsignup">
            <button className="signup" type="submit">
              SIGN UP
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DocLogin;
