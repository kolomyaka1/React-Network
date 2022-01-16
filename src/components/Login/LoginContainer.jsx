import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Login from './Login';


function LoginContainer() {


    return( 
        <div>
            <Formik
                initialValue={{
                    email: '',
                    password: '',
                }}
                validateOnBlur
                onSubmit={(values) => { console.log(values) }}
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                    <div className={s.login__block}>
                        <form>
                            <h2 className={s.login__title}>LOGIN</h2>
                            <div>Email</div><input type={props.email} onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.email} />
                            <div className={s.login__password}>Password</div><input type={password} />
                            <div className={s.login__button}><button className={s.login__button1} type='submit'>Войти</button></div>
                        </form>
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default LoginContainer;