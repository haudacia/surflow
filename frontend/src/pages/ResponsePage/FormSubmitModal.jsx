import React from 'react';

const FormSubmitModal = ({ showModal }) => {
  return (
    <>
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-c1 bg-opacity-50'>
          <div className='flex flex-col relative w-full max-w-md bg-c1 p-8 gap-8'>
            <p>
              Your responses have been submitted successfully.
            </p>
            <p>
              Thank you for participating!
            </p>
          </div>
        </div >
      )}
    </>
  );
};

export default FormSubmitModal;
