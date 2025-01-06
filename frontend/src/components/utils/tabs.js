import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const apiUrl = process.env.REACT_APP_API_URL;

const LoginForm = () => {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);

    const navigate = useNavigate()


    console.log('phone',phone)
    console.log('password',password)

    const handleSubmit = async (e) => {
        e.preventDefault();
        let body = {
            phone,
            password
        }
        try {
          const response = await fetch(`/auth/login`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',  // Set the Content-Type to JSON
              },
              credentials: 'include', 
            

          });
          console.log('response',response)

          if (response.ok) {
            console.log('login succesful')
            navigate('/homepage')
          } else {
            const errorData = await response.json();
            setError(errorData.message || 'Something went wrong');
          }
        //   setPassword("")
        //   setPhone("")
  
        } catch (err) {
          setError(err.response?.data?.message || 'Something went wrong');
        }
      };


  return (
    <>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" onSubmit={handleSubmit}>
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Phone Number</label>
          <div class="mt-2">
            <input onInput={(e)=> setPhone(e.target.value)}  name="phone" id="phone"  required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>
  
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input onClick={(e)=> setPassword(e.target.value)} type="password" name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>
  
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
  
     
    </div>
  </div>
  </>
  );
};

const SignupForm = () => {
  return (
   <>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Register</h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input type="email" name="email" id="email" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>
  
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            
          </div>
          <div class="mt-2">
            <input type="password" name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>
  
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
        </div>
      </form>
  
    
    </div>
  </div>
   </>
  );
};

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('login');


  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="tabs flex flex-row justify-center gap-4 ml-4">
        <button
          className={activeTab === 'login' ? 'active' : 'text-black'}
          onClick={() => handleTabChange('login')}
        >
          Login
        </button>
        <button
          className={activeTab === 'signup' ? 'active' : 'text-black'}
          onClick={() => handleTabChange('signup')}
        >
          Signup
        </button>
      </div>

      <div className="form-content">
        {activeTab === 'login' ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default Tabs;
