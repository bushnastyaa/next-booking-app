import React from 'react'

const MailList = () => {
  return (
    <div className="w-full mt-10 bg-cyan-800 rounded-3xl max-md:rounded-none
    text-white flex flex-col items-center p-12">
      <p className="text-2xl">Save time, save money!</p>
      <span className="opacity-80">Sign up and we'll send the best deals to you</span>
      <div className="flex w-full justify-center mt-6">
        <input 
          type="text" 
          placeholder="Your Email"
          className="w-full text-black max-w-[400px] p-3 rounded-s-md outline-none"
        />
        <button className="px-6 rounded-e-md bg-[#0071c2] text-white font-bold">
          Subscribe
        </button>
      </div>
    </div>
  )
}

export default MailList;
