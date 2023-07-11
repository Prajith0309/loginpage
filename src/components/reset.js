import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import styles from '../styles/username.module.css';
import { Toaster,toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordvalidation } from '../helper/validate';
import { resetPassword } from '../helper/helper';
import { useAuthStore } from '../store/store';
import { useFetch } from '../hooks/fetchhook';
const Reset = () => {


  const {Username} = useAuthStore(state => state.auth)
    let navigate = useNavigate();

 const [{isLoading,status,serverError}]  = useFetch('createResetSession')

    const formik = useFormik({
        initialValues:{
            password:'',
            confirm_pwd:''
        },
        validate:resetPasswordvalidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values =>{
            let resetPromise = resetPassword({username:Username, password:values.password})
            toast.promise(resetPromise,{
              loading:'updating',
              success:<b>Reset succesfull</b>,
              error:<b>unsuccessful</b>
            }).then(()=>{
              navigate('/password')
            }).catch((err)=>{
              console.log(err)
            })

            
        }
    })

    if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
    if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
    if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>

  return <>
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={true}></Toaster>
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className={styles.glass}>
            <div className='title flex flex-col items-center'>
               <span className='font-bold text-5xl'>RESET PAGE</span>
               <span className='py-4 w-2/3 text-center text-gray-500 justify-center'></span>
            </div>
            <form className='py-2' onSubmit={formik.handleSubmit}>
              <div className='textbox flex flex-col gap-6 items-center'>
                <input {...formik.getFieldProps('password')}type='password' className={styles.textbox} placeholder='new password' />
                <input {...formik.getFieldProps('confirm_pwd')}type='password' className={styles.textbox} placeholder='confirm password' />
                <button type='submit'className={styles.btn}>RESET</button>
              </div>
            </form>
            </div>
        </div>
    </div>
       
  </>
}

export default Reset