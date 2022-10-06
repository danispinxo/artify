import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import "../styles/userAuth.scss"
import axios from 'axios'
import { useNavigate } from "react-router";
import { DataContext } from "../context/dataContext";


export default function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dataState = useContext(DataContext);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data) => {
    axios.post('/login', {data})
    .then((res) => {console.log('Logged in successfully!', res.data)
    dataState.setUser(res.data)
    navigate('/')})
    .catch((err) => setError(err.response.data.message))
  };

  return (
  <section className="text-center text-lg-start">
  <div className="container py-4">
    <div className="row g-0 align-items-center">
      <div className="col-lg-6 mb-5 mb-lg-0">
        <div className="card cascading-right">
          <div className="card-body p-5 shadow-5 text-center">
            <h2 className="fw-bold mb-5">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
             
              <div className="form-outline mb-4">
                <input placeholder="Email" type="email" className="form-control" {...register("email", { required: true })} />
                {errors.email && <p className="error-message">Email is required</p>}
              </div>

              <div className="form-outline mb-4">
                <input placeholder="Password" type="password" className="form-control" {...register("password", { required: true })}/>              
                {errors.password && <p className="error-message">Password is required</p>}
              </div>

              <div className="form-outline mb-4">
                {error && <p className="error-message">{error}</p>}
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-4">
                Login
              </button>

            </form>
          </div>
        </div>
      </div>

      <div className="col-lg-6 mb-5 mb-lg-0">
        <img src="images/login/register.jpg" className="w-100 rounded-4 shadow-4" alt="" />
      </div>
    </div>
  </div>
</section>
  );
}
