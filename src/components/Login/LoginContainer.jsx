import React from 'react';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import Login from './Login';
import s from './Login.module.css'


const SignupForm = () => {
    const formik = useFormik({
        initialValues : {
            email : '',
            password : '',
        },
        onSubmit : values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return(
        <div className={s.wrapper__content}>
        <div className={s.login__block}>
            <h2 className={s.login__title}>LOGIN</h2>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email</label><br />
                <input type="email"
                id='email'
                name='email'
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                /><br />
                {formik.errors.email ? <div>{formik.errors.email}</div>
                : null}

                <label htmlFor="password" className={s.login__password}>Password</label><br/>
                <input type="password" 
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                />

                <button type='submit' className={s.login__button}>Войти</button>    
            </form>  
        </div>
        </div>
        // <Login />
    )
} 

export default SignupForm;