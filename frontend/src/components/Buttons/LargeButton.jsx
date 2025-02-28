import React from 'react'

const LargeButton = ({ text, id }) => {
  return (
    <>
      <button
        id={id}
        className="w-80 h-20 text-gray-900 shadow-md bg-azure hover:bg-white/50 
        hover:shadow-none hover:border hover:border-gray-600 rounded-3xl transition-all
        duration-300">
        {text}
      </button>
    </>
  )
}

export default LargeButton