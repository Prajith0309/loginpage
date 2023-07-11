import React from 'react'
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.webp';
import styles from '../styles/username.module.css';
import { toast,Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profilevalidation } from '../helper/validate';
import { useFetch } from '../hooks/fetchhook';
import { updateUser } from '../helper/helper';

const Profile = () => {
    const [{isLoading,apiData,serverError}] = useFetch()
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            username:apiData?.username || " ",
            email:apiData?.email || " "
        },
        enableReinitialize:true,
        validate:profilevalidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values =>{
           const value = await Object.assign(values, {profile :  apiData?.profile || " "})
            let updatepromise = updateUser(value)
            toast.promise(updatepromise,{
              loading: 'Updating...',
              success: <b>update successfull</b>,
              error:<b>update failed</b>
            })
            .then(()=>{
              navigate('/')
            }).catch(err=>{
              console.log(err);
            })
        }
    })

    function userLogout(){
      localStorage.removeItem('t')
      toast.success('logout sccessfull')
      navigate('/')
    }
    if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
    if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>


  return <>
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={true}></Toaster>
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className={styles.glass}>
            <div className='title flex flex-col items-center'>
               <span className='font-bold text-5xl'>PROFILE</span>
               <span className='py-4 w-2/3 text-center text-gray-500 justify-center'>You can edit the data</span>
            </div>
            <form className='py-2' onSubmit={formik.handleSubmit}>
              <div className='profile flex py-4 justify-center'>
                <label htmlFor='profile'>
                <img src={apiData?.profile || avatar} style={{
                      width:"200px",
                      height:"200px",
                      borderRadius:"50%",
                      objectFit:"cover",
                    }} className={styles.profile_img} alt='avatar'/>
                </label>
              </div>
              <div className='textbox flex flex-col gap-6 items-center'>
                <div className='name flex w-3/4 gap-10'>
                  <input {...formik.getFieldProps('username')}type='text' className={styles.textbox} placeholder='firstname' />
                </div>
                <div className='name flex w-3/4 gap-10'>
                  <input {...formik.getFieldProps('email')}type='text' className={styles.textbox} placeholder='email' />
                </div>
                
                <button type='submit'className={styles.btn}>update</button>
              </div>
              
            </form>
            <div className='text-center py-4'>
                <span className='text-red-600 text-xl'>COMEBACK LATER------ <button onClick={userLogout} className='text-white text-xl'>LOGOUT</button></span>
            </div>
            </div>
        </div>
    </div>
       
  </>
}

export default Profile