import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.webp';
import styles from '../styles/username.module.css';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
import { useFetch } from '../hooks/fetchhook';
import { useAuthStore } from '../store/store';
import { verifyPassword } from '../helper/helper';
const Password = () => {

   const {Username} = useAuthStore(state => state.auth)
   const [{isLoading,apiData,serverError}] = useFetch(`user/${Username}`)
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            password:''
        },
        validate:passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: values =>{
            let loginpromise = verifyPassword(Username,values.password)
            toast.promise(loginpromise,{
              loading: 'Creating...',
              success: <b>login successfull</b>,
              error:<b>password did not match</b>
            })
            loginpromise.then((res)=>{
              let token = res.data.token;
              localStorage.setItem('t', token)
              navigate('/profile')
            }).catch((error) => {
              console.log(error)
              toast.error("Password doesn't match");
            });
        }
    })
    
    if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
    if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return <>
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={true}></Toaster>
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className={styles.glass}>
            <div className='title flex flex-col items-center'>
               <span className='font-bold text-5xl'>Hello {apiData?.username}</span>
               <span className='py-4 w-2/3 text-center text-gray-500 justify-center'>lorem bcsagbcalb csalgfalbc aidh  jhfw djwgouwcgjckdydtstdytguljbjvhkdsyirfoyfvkhxtdeychkxtdiy</span>
            </div>
            <form className='py-2' onSubmit={formik.handleSubmit}>
              <div className='profile flex py-4 justify-center'>
                <img src={apiData?.profile || avatar} style={{
                      width:"200px",
                      height:"200px",
                      borderRadius:"50%",
                      objectFit:"cover",
                    }} className={styles.profile_img} alt='avatar'/>
              </div>
              <div className='textbox flex flex-col gap-6 items-center'>
                <input {...formik.getFieldProps('password')}type='password' className={styles.textbox} placeholder='password' />
                <button type='submit'className={styles.btn}>Sign in</button>
              </div>
              
            </form>
            <div className='text-center py-4'>
                <span className='text-red-600 text-xl'>FORGOT PASSWORD------ <Link className='text-white text-xl' to='/recovery'>RECOVER PASSWORD</Link></span>
              </div>
            </div>
        </div>
    </div>
       
  </>
}

export default Password