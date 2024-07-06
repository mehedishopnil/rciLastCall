import React from 'react';
import loading from "../assets/loading.svg";

const Loading = () => {
  return (
    <div className='h-[300px] flex justify-center items-center'>
      <img src={loading} alt="Loading" className='w-1/2 md:w-24' />
    </div>
  );
};

export default Loading;