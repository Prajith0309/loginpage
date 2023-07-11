import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.webp';
import styles from '../styles/username.module.css';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registervalidate } from '../helper/validate';
import converttobase64 from '../helper/convert';
import { registerUser } from '../helper/helper';

const Register = () => {
    const [file, setFile] = useState()
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            email:'',
            username:'',
            password:''
        },
        validate:registervalidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values =>{
            const value = await Object.assign(values, {profile : ''})
            let registeruser =  registerUser(value)
            toast.promise(registeruser,{
              loading: 'Creating...',
              success: <b>Registration successfull</b>,
              error:<b>Could not register</b>
            }).then(() => {
              navigate('/'); // Navigate to the desired route only after the toast success
            }).catch((err)=>{
              console.log(err)
            })
        }
    })
    const onupload = async(e)=>{
       const base64 = await converttobase64(e.target.files[0]);
       setFile(base64)
    }


  return <>
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={true}></Toaster>
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className={styles.glass}>
            <div className='title flex flex-col items-center'>
               <span className='font-bold text-5xl'>REGISTER PAGE</span>
               <span className='py-4 w-2/3 text-center text-gray-500 justify-center'>Enter the details to register yourself</span>
            </div>
            <form className='py-2'onSubmit={formik.handleSubmit}>
              <div className='profile flex py-4 justify-center'>
                <label htmlFor='profile'>
                <img src={file || avatar} style={{
                      width:"200px",
                      height:"200px",
                      borderRadius:"50%",
                      objectFit:"cover",
                    }} className={styles.profile_img} alt='avatar'/>
                </label>
                <input onChange={onupload} type='file' id='profile' name='profile' />
              </div>
              <div className='textbox flex flex-col gap-6 items-center'>
                <input {...formik.getFieldProps('username')}type='text' className={styles.textbox} placeholder='username' />
                <input {...formik.getFieldProps('email')}type='email' className={styles.textbox} placeholder='email' />
                <input {...formik.getFieldProps('password')}type='password' className={styles.textbox} placeholder='password' />
                <button type='submit'className={styles.btn}>Register</button>
              </div>
            </form>
            <div className='text-center py-4'>
                <span className='text-red-600 text-xl'>ALREADY AN USER------ <Link className='text-white text-xl' to='/'>LOGIN NOW</Link></span>
              </div>
            </div>
        </div>
    </div>
       
  </>
}

export default Register