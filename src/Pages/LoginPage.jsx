import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../Firebase/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginWithGoogle, logging } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(res => {
        Swal.fire({
          title: 'Successful!',
          text: 'Successfully logged in to your account',
          icon: 'success',
        });
        navigate('/');
      })
      .catch(err => {
        Swal.fire({
          title: 'Oh no!',
          text: 'There was a problem logging in with Google',
          icon: 'error',
        });
      });
  };

  const onSubmit = data => {
    logging(data.email, data.password)
      .then(res => {
        Swal.fire({
          title: 'Successful!',
          text: 'Successfully logged in to your account',
          icon: 'success',
        });
        navigate('/');
      })
      .catch(err => {
        Swal.fire({
          title: 'Oh no!',
          text: 'There was a problem logging in',
          icon: 'error',
        });
      });
  };

  return (
    <div className="flex justify-center my-5">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
        <h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
        <p className="text-sm text-center dark:text-gray-600">
          Don't have an account?
          <Link to="/register" className="focus:underline hover:underline">
            Sign up here
          </Link>
        </p>
        <div className="my-6 space-y-4">
          <button
            onClick={handleGoogleLogin}
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Login with Google</p>
          </button>
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full dark:text-gray-600" />
          <p className="px-3 dark:text-gray-600">OR</p>
          <hr className="w-full dark:text-gray-600" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">Email address</label>
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">Password</label>
              </div>
              <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
          </div>
          <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
