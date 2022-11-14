import {useState} from 'react'
import { Link, useNavigate} from 'react-router-dom';
import {AiFillEyeInvisible, AiFillEye}  from "react-icons/ai"
import OAuth from '../components/OAuth';
import {createUserWithEmailAndPassword, getAuth, updateProfile} from "firebase/auth"
import { db } from "../firebase"
import { serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const [showPassword,setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const {name, email, password} = formData;
  const navigate = useNavigate();
  function onChange(e){
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e){
    e.preventDefault()
    try {
      const auth = getAuth()
      const UserCredential = await createUserWithEmailAndPassword
      (auth, email, password);

      
    updateProfile(auth.currentUser,{
      displayName: name
    })
      const user = UserCredential.user;
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy)
      toast.success("Sign up was successful")
      navigate("/");
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong the registration')
    }
  }
  return (

    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
      <div className='flex justify-center flex-wrap items-center'>
        <div className='sm:w-[95%] md:w-[67%] lg:w-[60%] mb-12 xl:mb-6 py-12 max-w-6xl mx-auto'>
          <img src="https://plus.unsplash.com/premium_photo-1661423729611-2ad9b64b98f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80" alt="key" 
          className='w-full rounded-2xl'/>
        </div>
        <div className='sm:w-[95%] md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <input 
            className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-md transition ease-in-out" 
            type="text"  
            id="name" 
            value={name} 
            onChange={onChange}
            placeholder="Full name"
            />
            <input 
            className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-md transition ease-in-out" 
            type="email"  
            id="email" 
            value={email} 
            onChange={onChange}
            placeholder="Email address"
            />
            <div className='relative mb-6'>
              <input 
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-md transition ease-in-out" 
              type= {showPassword? "text": "password"}
              id="password" 
              value={password} 
              onChange={onChange}
              placeholder="Password"
              />
              {showPassword ? 
                <AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>:
                <AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer'onClick={()=>setShowPassword((prevState)=>!prevState)}/>
              }
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className="mb-6">Have a account?
                <Link to="/sign-in" className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1'>Sign in</Link>
              </p>
              <p>
                <Link to="/forgot-password" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Forgot password?</Link>
              </p>
            </div>
          <button 
          className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
          type='submit'>Sign up</button>
          <div className='my-4  flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300'>
            <p className='font-semibold mx-4 text-center'>OR</p>
          </div>
          <OAuth/>
          </form>
        </div>
      </div>
    </section>
  )
}
