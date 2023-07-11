import toast from 'react-hot-toast'
import { authenticate } from './helper'

export async function usernameValidate(values){
    const errors = usernameVerify({},values)
     
    if(values.username){
        const {status} = await authenticate(values.username);
        if(status!==200){
            errors.exist = toast.error("user does not exist")
        }
    }
    return errors
}


export async function passwordValidate(values){
    const errors = passwordVerify({},values)

    return errors
}



export async function resetPasswordvalidation(values){
    const errors = passwordVerify({},values)
    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error('Password didnot match.....')
    }
    return errors
}


export async function registervalidate(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailverify(errors, values)

    return errors
}


export async function profilevalidation(values){
     const errors = emailverify({}, values)
     return errors
}


function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('username required....')
    }

    return error
}


function passwordVerify(error = {}, values){

    
    if(!values.password){
        error.password = toast.error('password required....')
    }
    if(values.password.length < 4){
        error.password = toast.error('password must have atleast 4 characters')
    }

    return error
}


function emailverify(error = {}, values){
    if(!values.email){
        error.email = toast.error('email required.....')
    }else if(values.email.includes(' ')){
        error.email = toast.error('wrong email...')
    }

    return error
}