import { useState } from "react"
import SignupStyle from "./All.module.css";
// import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Header from "./Header";
const Register = () => {
    const navigate = useNavigate();
    const [signup, setSignup] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        dob: "",
        phone: "",
    });

    const handleSignUp = async (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/register', signup)
            .then((res) => {
                console.log(res);
                console.log("Successfully signed up!");
                navigate("/login")
            })
            .catch(err => console.log(err));

        setSignup({
            name: "",
            email: "",
            password: "",
            age: "",
            dob: "",
            phone: "",
        });
    };
    const resetForm = () => {
        setSignup({
            name: "",
            email: "",
            password: "",
            age: "",
            dob: "",
            phone: "",
        });
    };

    return (
        <>
            <Header />
            <div className='grid grid-cols-12 justify-center'>

                <div className='col-span-6 col-start-4 p-5'>
                    <h1 className='text-white text-4xl font-semibold text-center'>Register Yourself Here !</h1>
                    <img src="/signup.svg" alt="Signup logo" width={200} height={200} className='mx-auto my-8 ' />

                    <form onSubmit={handleSignUp}>

                        <input type='text' name='username' placeholder='Username...' className={SignupStyle.signupInput} onChange={(e) => setSignup({ ...signup, name: e.target.value, })} value={signup.name} />

                        <input type='email' name='email' placeholder='Email...' className={SignupStyle.signupInput} onChange={(e) => setSignup({ ...signup, email: e.target.value, })} value={signup.email} />

                        <input type='password' name='password' placeholder='Password...' className={SignupStyle.signupInput} onChange={(e) => setSignup({ ...signup, password: e.target.value, })} value={signup.password} />

                        <input type='number' name='age' placeholder='Age...' className={SignupStyle.signupInput} onChange={(e) => setSignup({ ...signup, age: e.target.value, })} value={signup.age} />

                        <input type='date' name='dob' placeholder='date of birth...' className={SignupStyle.signupInput} onChange={(e) => setSignup({ ...signup, dob: e.target.value, })} value={signup.dob} />

                        <input type='number' name='phone' placeholder='Phone...' className={SignupStyle.signupInput} onChange={(e) => setSignup({ ...signup, phone: e.target.value, })} value={signup.phone} />

                        <button className='px-4 py-2 font-semibold text-lg bg-blue-600 rounded w-[45%] mx-2 hover:bg-blue-400' type='submit'>Signup</button>

                        <button type='button' onClick={resetForm} className='px-4 py-2 font-semibold text-lg bg-red-600 rounded w-[45%] mx-2 hover:bg-red-400'>Clear</button>
                    </form>
                    {JSON.stringify(signup)}
                </div>
            </div>
        </>
    )
}

export default Register