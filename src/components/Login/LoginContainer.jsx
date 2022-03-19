import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import s from './Login.module.css';
import './LoginStyles.css';
import { login } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';



const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label><br />
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const MyCaptcha = ({ label, ...props }) => {
    
    const [field, meta] = useField(props);
    return (
        <>
            <input type="text" {...field} {...props} /><br/>
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
        .max(15, 'Не более 15 символов')
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
                    console.log(email, password,captcha);
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
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="kolomyakan@mail.ru"
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
                            ? <div className={s.login__captcha}>
                                <img src={props.captcha} alt="captcha" />
                                <MyCaptcha name="captcha" label='captcha' />                            </div>
                            : ''
                        }
                        <button type="submit" className={s.login__button1}>Отправить</button>
                    </Form>
                    
                )}
            </Formik>
        </div>
    );
};

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha,
    }
}

export default connect(mapStateToProps, { login })(SignupForm);

// const SignupForm = () => {
//     const formik = useFormik({
//         initialValues : {
//             email : '',
//             password : '',
//         },
//         onSubmit : values => {
//             alert(JSON.stringify(values, null, 2));
//         },
//     });
//     return(
//         <div className={s.wrapper__content}>
//         <div className={s.login__block}>
//             <h2 className={s.login__title}>LOGIN</h2>
//             <form onSubmit={formik.handleSubmit}>
//                 <label htmlFor="email">Email</label><br />
//                 <input type="email"
//                 id='email'
//                 name='email'
//                 onChange={formik.handleChange}
//                 value={formik.values.email}
//                 onBlur={formik.handleBlur}
//                 /><br />
//                 {formik.errors.email ? <div>{formik.errors.email}</div>
//                 : null}

//                 <label htmlFor="password" className={s.login__password}>Password</label><br/>
//                 <input type="password"
//                 id="password"
//                 name="password"
//                 onChange={formik.handleChange}
//                 value={formik.values.password}
//                 onBlur={formik.handleBlur}
//                 />

//                 <button type='submit' className={s.login__button}>Войти</button>
//             </form>
//         </div>
//         </div>
//         // <Login />
//     )
// } 


