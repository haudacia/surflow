import React from 'react';

const FormSubmitModal = ({ showModal }) => {
  return (
    <>
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-custom-gradient bg-opacity-50'>
          <div className='flex flex-col relative w-full max-w-md bg-white p-8 gap-8'>
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
