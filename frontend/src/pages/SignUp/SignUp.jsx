import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../utils/api';
import { useMutation } from 'react-query';
import { setUserSession } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { LargeButton } from '../../components/Buttons/LargeButton.jsx';
import Input from '../../components/ui/Input.jsx';

const SignUp = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const newUser = async (data) => {
    try {
      const response = await api().post('/signup', data);
      if (response?.data.token) {
        setUserSession(response.data);
        navigate('/workspace');
      }
      return response.data;
    } catch (err) {
      throw err.response?.data.error;
    }
  };

  const mutation = useMutation(newUser, {
    onSuccess: () => {
      setError(null);
      navigate('/workspace');
    },
    onError: (error) => {
      setError(error);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-gradient">
      <div className="bg-white p-16 rounded-3xl shadow-md w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 font-rubik">Register to Flow!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full flex flex-col items-center">

          <div className="w-full">
            <Input
              error={errors?.email?.message}
              label="Email"
              placeholder='Email'
              {...register('email', {
                required: { value: true, message: '*email is required' },
                pattern: { value: /^\S+@\S+$/i, message: '*Invalid email format' },
              })}
            />
          </div>

          <div className="w-full">
            <Input
              error={errors?.name?.message}
              label="Name"
              placeholder='Name'
              {...register('name', { required: { value: true, message: '*name is required' } })}
            />
          </div>

          <div className="w-full">
            <Input
              error={errors?.password?.message}
              label="Password"
              placeholder='Password'
              {...register('password', {
                required: { value: true, message: '*password is required' },
                minLength: { value: 6, message: '*password needs at least 6 characters' },
              })}
            />
          </div>
          {/* <input className={style.submit} type='submit' value={'Sign up'} disabled={mutation.isLoading}></input>
            {error && <p style={{ color: 'red' }}>{error}</p>} */}
          <LargeButton submit={handleSubmit(onSubmit)} text={"SIGN UP"} />
          <p className="w-full flex flex-row justify-center text-blue-600 hover:text-blue-800 text-sm font-space mono cursor-pointer"
            onClick={() => { navigate('/login'); }} >You have an account? Login!</p>

        </form>
      </div>
    </div>
  );
};

export default SignUp;

//use navigate
