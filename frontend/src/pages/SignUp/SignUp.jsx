import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../utils/api';
import { useMutation } from 'react-query';
import { setUserSession } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import LargeButton from '../../components/Buttons/LargeButton.jsx';
import Input from '../../components/Form/Input.jsx';
import { useUserProvider } from '../../context/UserContext.jsx';

const SignUp = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { setUserInContext } = useUserProvider();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const newUser = async (data) => {
    try {
      const response = await api().post('/signup', data);
      console.log(response.user)

      if (response?.data.token) {
        setUserSession(response.data);
        setUserInContext();

      }
      return response.data;
    } catch (err) {
      setError(err.response?.data.error);
      throw err.response?.data.error;
    }
  };

  const mutation = useMutation(newUser, {
    onSuccess: () => {
      setError(null);
      window.location.href = '/workspace';
    },
    onError: (error) => {
      setError(error);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-c1'>
      <div className='bg-white/50 p-16 shadow-md w-full max-w-md flex flex-col items-center'>
        <h1 className='text-3xl mb-6 text-center text-gray-900'>register to flow</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 w-full flex flex-col items-center'>
          <div className='w-full'>
            <Input
              error={errors?.email?.message}
              label='Email'
              placeholder='Email'
              {...register('email', {
                required: { value: true, message: 'Email is required' },
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
              })}
            />
            {error && <p className='text-red-500'>{error}</p>}
          </div>

          <div className='w-full'>
            <Input
              className='border-black'
              error={errors?.name?.message}
              label='Name'
              placeholder='Name'
              {...register('name', { required: { value: true, message: 'Name is required' } })}
            />
          </div>

          <div className='w-full'>
            <Input
              error={errors?.password?.message}
              type='password'
              label='Password'
              placeholder='Password'
              {...register('password', {
                required: { value: true, message: 'Password is required' },
                minLength: { value: 6, message: 'Password needs at least 6 characters' },
              })}
            />
          </div>
          {/* <input className={style.submit} type='submit' value={'Sign up'} disabled={mutation.isLoading}></input>
            {error && <p style={{ color: 'red' }}>{error}</p>} */}
          <LargeButton onClick={handleSubmit(onSubmit)} text={'SIGN UP'} />
          <p
            className="cursor-pointer hover:underline"
            onClick={() => {
              navigate('/login');
            }}
          >
            I already have an account
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

//use navigate
