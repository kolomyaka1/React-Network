import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import s from './Login.module.css';
import './LoginStyles.css';
import { login, getCaptcha } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';



const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label><br />
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const CaptchaInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
        <input {...field} {...props} className={s.login__captcha__input}/>
        {meta.touched && meta.error ? (
            <div className='error'>{meta.error}</div>
        ) : null}
        </>
    )
}


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
                    captcha: '',
                }}
                onSubmit={values => {
                    let { email, password, captcha } = values;
                    props.login(email, password, captcha);
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
                                placeholder="free@samuraijs.com"
                            />
                        </div>

                        <div className={s.login__password} >
                            <MyTextInput
                                label='Password'
                                name='password'
                                type='password'
                            />
                        </div>

                        {props.captcha 
                        ? <div className={s.login__captcha__block}> 
                            <img src={props.captcha} alt="captcha" className={s.login__captcha} />
                            <CaptchaInput label='captcha' name='captcha' type='text'/>
                          </div>
                        : null}

                        <div className={s.login__button}>
                            <button type="submit" >Войти</button>
                        </div>
                    </Form>
                )}
            </Formik>

        </div>
    );
};

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha
    }
}

export default connect(mapStateToProps, { login, getCaptcha })(SignupForm);


