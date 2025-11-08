import React, { useState } from 'react'


const Contact = () => {
    const [result, setResult] = useState('')
  
    const onSubmit = async (event) => {
      event.preventDefault();
      setResult("Sending....");
      const formData = new FormData(event.target);
  
      formData.append("access_key", "5ce34c29-ce65-45f8-ab72-e963b3b9e012");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    };
  return (
    <div  className=' px-[12%] py-2 scroll-mt-20 '>
      <div className=' rounded-lg'>
      <h4 className='text-center mb-2 text-lg '>Contact with us</h4>
            <h2 className='text-center text-5xl '> Git in touch</h2>
            <p className='mb-10 mt-5 text-center max-w-2xl mx-auto '> I'd love to hear from you! If you have any question ,comments, or feedback , please use the from below </p>
            <form onSubmit={onSubmit} className='max-w-2xl mx-auto' action="">
            <div className='grid grid-cols-auto gap-6 mt-10 mb-8'>
              <input type="text" placeholder='Name' required className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white text-gray-700  shadow-[-5px_5px_0_0] hover:bg-amber-50' name='name'/>
              <input type="email" placeholder='Email' required className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white text-gray-700  shadow-[-5px_5px_0_0] hover:bg-amber-50' name='email' />
            </div>
            <textarea rows='6' placeholder='Enter your message or text' required className='w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6 text-black  shadow-[-5px_5px_0_0] hover:bg-amber-50' name='message'/>

            <button type='submit' className='py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 '>Submit here  <img src='/rightarrow.png' width={20} height={15} alt=''  /></button>
             <p className='mt-8 pb-5'>{result}</p>

            </form>
      </div>
          
    </div>
  )
}

export default Contact