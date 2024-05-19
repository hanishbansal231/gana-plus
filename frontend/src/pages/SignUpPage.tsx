import React, { ChangeEvent, FormEvent, useState } from 'react';

interface SignUpData {
    name: string;
    userName: string;
    email: string;
    password: string;
}

const SignUpPage: React.FC = () => {
    const [signUpData, setSignUpData] = useState<SignUpData>({
        name: "",
        userName: "",
        email: "",
        password: ""
    });

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setSignUpData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(signUpData)
    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='w-1/2 bg-white flex justify-center items-center'>
                <div className='w-1/2'>
                    <img className='w-full h-full' src="https://static.timesprime.com/2x/gaananewodp.jpg" alt="" />
                </div>
                <div className='w-1/2'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-2 px-8 pt-8 pb-4'>
                        <input type="text" name="name" className='border-2 border-gray-500 p-2 rounded-md' value={signUpData.name} onChange={handleOnChange} placeholder='Name' />
                        <input type="text" name="userName" className='border-2 border-gray-500 p-2 rounded-md' value={signUpData.userName} onChange={handleOnChange} placeholder='Username' />
                        <input type="email" name="email" className='border-2 border-gray-500 p-2 rounded-md' value={signUpData.email} onChange={handleOnChange} placeholder='Email' />
                        <input type="password" name="password" className='border-2 border-gray-500 p-2 rounded-md' value={signUpData.password} onChange={handleOnChange} placeholder='Password' />
                        <button type="submit" className='bg-red-500 text-white p-2 rounded-md'>SignUp</button>
                    </form>
                    <div>
                        <p className='text-center'>OR</p>
                    </div>
                    <div className='flex flex-col gap-2 px-8 pt-4'>
                        <button className='border border-gray-500 p-2 rounded text-sm font-medium'>SignUp with Google</button>
                        <button className='bg-[#1a73e8] p-2 rounded text-sm font-medium text-white'>SignUp with Facebook</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;
