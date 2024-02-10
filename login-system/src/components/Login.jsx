import SignupStyle from './All.module.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Header from './Header';

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  })

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:5000')
      .then(res => {
        if (res.data.valid) {
          navigate('/dashboard')
        } else {
          navigate('/login');
        }
      })
      .catch(err => console.log(err))
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(login.email)) {
      alert("email should be correct");
      return;
    }
    if (login.password.length < 8) {
      alert('passswors shiould be atleat 8 letters');
      return;
    }

    try {

      //valid data.
      axios.post("http://localhost:5000/login", login)
        .then(res => {
          if (res.data.Login) {
            navigate('/dashboard')
          } else {
            alert("no record found");
          }
          console.log(res);

        })
        .catch(err => console.log(err))

    } catch (error) {
      console.log(error);
    }


  }

  const resetForm = () => {
    setLogin({
      email: "",
      password: "",
    })
  }

  return (
    <>
      <Header />
      <div className='grid grid-cols-12 justify-center py-28'>

        <div className='col-span-6 col-start-4 p-5'>
          <h1 className='text-white text-4xl font-semibold text-center'>Login to Get Access !</h1>
          <img src="/login.svg" alt="Signup logo" width={250} height={250} className='mx-auto my-8 ' />

          <form onSubmit={handleLogin}>
            <input type='email' name='email' placeholder='Email...' className={SignupStyle.signupInput} value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} />

            <input type='password' name='password' placeholder='Password...' className={SignupStyle.signupInput} value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} />

            <button className='px-4 py-2 font-semibold text-lg bg-green-600 rounded w-[45%] mx-2 hover:bg-green-400' type='submit'>Login</button>
            <button onClick={resetForm} className='px-4 py-2 font-semibold text-lg bg-red-600 rounded w-[45%] mx-2 hover:bg-red-400' type='button'>Clear</button>
          </form>
          {/* {JSON.stringify(login)} */}
        </div>
      </div>
    </>
  )
}

export default Login