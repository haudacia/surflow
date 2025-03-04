import React from 'react'

const MediumButton = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick} className="w-60 h-14 text-gray-900 shadow-sm bg- hover:bg-white/50 
        hover:shadow-none transition-all
        duration-300">{text}</button>
    </>
  )
}

export default MediumButton