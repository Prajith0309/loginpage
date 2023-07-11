import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.webp';
import styles from '../styles/username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate';
import {useAuthStore} from '../store/store'

const Username = () => {

  const setusername = useAuthStore(state => state.setUsername)
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            username:''
        },
        validate:usernameValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: values =>{
            setusername(values.username)
            navigate('/password')
        }
    })

  return <>
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className={styles.glass}>
            <div className='title flex flex-col items-center'>
               <span className='font-bold text-5xl'>LOGIN PAGE</span>
               <span className='py-4 w-2/3 text-center text-gray-500 justify-center'>lorem bcsagbcalb csalgfalbc aidh  jhfw djwgouwcgjckdydtstdytguljbjvhkdsyirfoyfvkhxtdeychkxtdiy</span>
            </div>
            <form className='py-2' onSubmit={formik.handleSubmit}>
              <div className='profile flex py-4 justify-center'>
                <img src={avatar} style={{
                      width:"200px",
                      height:"200px",
                      borderRadius:"50%",
                      objectFit:"cover",
                    }} className={styles.profile_img} alt='avatar'/>
              </div>
              <div className='textbox flex flex-col gap-6 items-center'>
                <input {...formik.getFieldProps('username')}type='text' className={styles.textbox} placeholder='username' />
                <button type='submit'className={styles.btn}>Login</button>
              </div>
              
            </form>
            <div className='text-center py-4'>
                <span className='text-red-600 text-xl'>NOT A MEMBER------ <Link className='text-white text-xl' to='/register'>REGISTER NOW</Link></span>
              </div>
            </div>
        </div>
    </div>
       
  </>
}

export default Username