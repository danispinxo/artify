import React from "react";
import { useForm } from "react-hook-form";
import "../styles/userAuth.scss"


export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
 
  <section className="text-center text-lg-start">
  <div className="container py-4">
    <div className="row g-0 align-items-center">
      <div className="col-lg-6 mb-5 mb-lg-0">
        <div className="card cascading-right">
          <div className="card-body p-5 shadow-5 text-center">
            <h2 className="fw-bold mb-5">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
             
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input placeholder="First Name" type="text" id="form3Example1" className="form-control" {...register("firstName", { required: true })} />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input placeholder="Last Name" type="text" id="form3Example2" className="form-control" {...register("lastName", { required: true })} />
                  </div>
                </div>
              </div>

              <div className="form-outline mb-4">
                <input placeholder="Email" type="email" id="form3Example3" className="form-control" {...register("email", { required: true })} />
              </div>

              <div className="form-outline mb-4">
                <input placeholder="Password" type="password" id="form3Example4" className="form-control" {...register("password", { required: true })}/>              
              </div>
  
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign up
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
