import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import s from './Login.module.css';
import './LoginStyles.css';
import { login } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { authAPI } from '../API/api';
import { Navigate } from 'react-router';

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

// const MyCheckbox = ({ children, ...props }) => {
//     const [field, meta] = useField({ ...props, type: 'checkbox' });
//     return (
//         <div>
//             <label className="checkbox-input">
//                 <input type="checkbox" {...field} {...props} />
//                 {children}
//             </label>
//             {meta.touched && meta.error ? (
//                 <div className="error">{meta.error}</div>
//             ) : null}
//         </div>
//     );
// };

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Почта указана неверно')
        .required('Обязательное поле'),
    password: Yup.string()
        .max(15, 'Должно быть не более 15 символов')
        .required('Обязательное поле'),
})

const SignupForm = (props) => {
    
    if (props.isAuth) {
        return <Navigate replace to='/Profile' />
    }

    return (
        <div className={s.login__block}>
            <h1 className={s.login__title}>LOGIN</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    isRemember: '',
                }}
                onSubmit={values => {
                    let {email, password, isRemember} = values;
                    props.login(email, password, isRemember);
                    
                }}
                validationSchema={validationSchema}
            >
                {({
                    handleSubmit
                }) => (
                    <Form className={s.login__form} onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}>
                        <div className={s.login__email}>
                            <MyTextInput
                                className
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="user@react-network.com"
                            />
                        </div>

                        <div className={s.login__password} >
                            <MyTextInput
                                label='Password'
                                name='password'
                                type='password'
                            />
                        </div>

                        {/* <MyCheckbox name="isRemember">
                            Remember me
                        </MyCheckbox> */}

                        <div className={s.login__button}>
                            <button className={s.login__buton1} type="submit" >Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

let mapStateToProps = (state) => {
    return {
        isAuth : state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {login})(SignupForm);