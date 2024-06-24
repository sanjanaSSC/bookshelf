import React from 'react'
import NavBar from '../component/NavBar'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { useSetRecoilState } from 'recoil';
import { loggedInAtom } from '../store/SavedBooksAtom';
import { useNavigate } from 'react-router-dom';



export default function Login() {
    const setIsLoggedIn = useSetRecoilState(loggedInAtom);
    const navigate = useNavigate()


    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Name is too short!')
            .max(50, 'Name is too long!')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password is too short!')
            .required('Password is required'),
    });
  return (
    <div>
        <NavBar/>
        <div className='h-[100vh] flex flex-col justify-center items-center bg-beige'>
            <div className='shadow-3xl p-8 px-14 bg-white'>
                <Formik
                    initialValues={{ name: '', email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        console.log(values);
                        try{
                            const res = await axios.post('http://localhost:5000/users/register', values);
                            console.log(res.data.users, "response");
                    
                        }catch(err){
                            console.log('Error while Logging in');
                        }finally {
                            setSubmitting(false);
                            setIsLoggedIn(true);
                            navigate("/home",{replace:true})

                        }                       
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div>
                                <label htmlFor="name" className='ml-2 text-xs'>Name</label>
                                <Field type="text" name="name" className='text-sm border-2 border-gray-400 px-2 rounded-md m-2 mb-0 h-[35px] w-full'/>                  
                                <ErrorMessage name="name" component="div" className='text-xs text-red-500 ml-2 mb-2'/>
                            </div>
                            <div>
                                <label htmlFor="email" className='ml-2 text-xs'>Email</label>
                                <Field type="email" name="email" className='text-sm border-2 border-gray-400 px-2 rounded-md m-2 mb-0 h-[35px] w-full'/>                   
                                <ErrorMessage name="email" component="div" className='text-xs text-red-500 ml-2 mb-2'/>
                            </div>
                            <div>
                                <label htmlFor="password" className='ml-2 text-xs'>Password</label>
                                <Field type="password" name="password" className='text-sm border-2 border-gray-400 px-2 rounded-md m-2 mb-0 h-[35px] w-full'/>
                                <ErrorMessage name="password" component="div" className='text-xs text-red-500 ml-2 mb-2'/>
                            </div>
                            <div className='flex justify-center  ml-2'>
                                <button type="submit" disabled={isSubmitting} className='bg-pink text-white font-bold px-4 py-2 rounded-md w-full mt-4'>Login</button>
                            </div>                  
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </div>
  )
}
