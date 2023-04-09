import React, { useState } from 'react';
import axios from "axios"
import ErrorMessage from '../component/ErrorMessage';
import { useNavigate } from "react-router-dom";
import Spinner from '../component/Spinner';
import { setUser } from '../redux/slice/UserSlice';
import { useDispatch } from "react-redux"

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* 
            database operations CRUD
                create
                read
                update
                delete   
            
            http methods
                POST
                GET
                PUT / PATCH
                DELEET

            STATUS code
             2
                200
                // 201 - ceated...
                // 204 - created with not content
             3 - redirect  
             4
                400 - bad 
                401 - unauthencitate
                403 - forbidden / unauthorized
                404 - resource not found
            5
                500 - server error. 



    */
    const [is_submitting, setIsSubmitting] = useState(false)

    const [error, setError] = useState(null)

    const [payload, setPayload] = useState({
        email: "email@email.com",
        password: "password",
    })


    function handleSubmit(event) {
        event.preventDefault()
        setIsSubmitting(true)
        axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, payload)
            .then(res => {
                console.log({ res })

                axios.get(`${process.env.REACT_APP_SERVER_URL}/users/get-user`, {
                    headers: {
                        Authorization: `Bearer ${res.data.access_token}`
                    }
                })
                    .then(user_res => {
                        localStorage.setItem("access_token", res.data.access_token)
                        dispatch(setUser(user_res.data))
                        navigate("/")


                    }).catch(err => {

                    })

            }).catch(err => {
                console.log({ err })
                if (err.response.status == 400 || err.response.status == 401) {
                    setError(err.response.data.msg)
                    setIsSubmitting(false)
                }
            })
    }

    function handleChange(event) {
        // object destructiong // spread... 
        setPayload({ ...payload, [event.target.name]: event.target.value })
        // setError([...errors.filter(el => el.param != event.target.name), { param: event.target.name, msg: "" }])
    }

    return (
        <div>
            <h1>Login</h1>
            {
                error
                &&
                <div class="alert alert-danger" role="alert">
                    {error}
                </div>
            }
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email'
                        onChange={handleChange}
                        value={payload.email}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">password</label>
                    <input type="password" className="form-control" id="password" name='password'
                        onChange={handleChange}
                        value={payload.password} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={is_submitting ? true : false} >{
                    is_submitting
                    &&
                    <Spinner />
                } Submit</button>

            </form>

        </div>
    );
}

export default Login;
