import React from 'react';

const ResortDetails = ({resort_details, check_in_time, check_out_time
}) => {
     return (
          <div className='p-4'>
               <p>{resort_details}</p>

               <div className="divider"></div>

               <div className='space-y-2'>
                    <h1 className='text-xl font-bold'>Property info</h1>
                    <h1 className='font-semibold'>Check in time: {check_in_time}</h1>
                    <h1 className='font-semibold'>Check out time: {check_out_time}</h1>
                    <h1 className='font-semibold'>Weeks Resort check-in days</h1>
                    <h1 className=''>Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday</h1>
               </div>
               
          </div>
     );
};

export default ResortDetails;