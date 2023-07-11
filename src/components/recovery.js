import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../styles/username.module.css';
import { Toaster, toast } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import { generateOTP, verifyOTP } from '../helper/helper';

const Recovery = () => {
  const {Username} = useAuthStore(state => state.auth)
  const [OTP, setOTP] = useState()
    let navigate = useNavigate();
    const  generateOTPAndToast = ()=> {
      const otp = generateOTP(Username);
      if (otp) {
        toast.success('OTP sent to your email');
      } else {
        toast.error('Problem generating OTP');
      }
    }

    const onSubmit = async (e)=>{

           e.preventDefault()
        try{
          let {status} = await verifyOTP({username:Username, code:OTP})
          if(status === 200||201){
            toast.success('verified succesfully')
            return navigate('/reset')
          }
        }catch(err){
          console.log(err)
          return toast.error('wrong OTP')
        }
          
          
    }
    const otpfunc = (e)=>{
      e.preventDefault();
      setOTP(e.target.value)
    }

    const resentOTP = (e)=>{
       e.preventDefault()
       let resentPromise = generateOTP(Username)
       toast.promise(resentPromise,{
        loading:"sending",
        success: <b>OTP sent to mail</b>,
        error:<b>Eroor on sending</b>
       })
       resentPromise.then(()=>{
        console.log('OTP generation success')
       }).catch(error=>{
           console.log(error)
       })
    }

  return <>
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={true}></Toaster>
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className={styles.glass}>
            <div className='title flex flex-col items-center'>
               <span className='font-bold text-5xl'>RECOVERY</span>
               <span className='py-4 w-2/3 text-center text-black-500 justify-center'>ENTER OTP TO RECOVER PASSWORD</span>
            </div>
            <div className='textbox flex flex-col gap-6 items-center'>
            <button onClick={generateOTPAndToast} className={styles.btn}>get OTP</button>
            </div>
            <form className='py-2' onSubmit={onSubmit}>
              <div className='textbox flex flex-col gap-6 items-center'>
                <input onChange={otpfunc} type='text' className={styles.textbox} placeholder='OTP' />
                
                   <button type='submit'className={styles.btn}>Sign in</button>
                
                
              </div>
              
            </form>
            <div className='text-center py-4'>
                <span className='text-red-600 text-xl'>DID NOT RECIEVE OTP------ <button onClick={resentOTP} className='text-white text-xl'>RESEND OTP</button></span>
              </div>
            </div>
        </div>
    </div>
       
  </>
}

export default Recovery