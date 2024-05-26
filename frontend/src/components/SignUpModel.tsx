import React from 'react'

const SignUpModel:React.FC = () => {
    return (
        <dialog id="my_modal_3" className="modal p-0">
            <div className="modal-box flex p-0 rounded-none min-w-[700px]">
                <div className='w-[50%]'>
                    <img className=' w-full h-[400px]' src="https://static.timesprime.com/2x/gaananewodp.jpg" alt="" />
                </div>
                <div className='w-[50%]'>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form action="" className=' flex flex-col items-center justify-center h-auto'>
                        <input type="text" placeholder='Enter email...' />
                        <input type="text" placeholder='Enter password...' />
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default SignUpModel