import React from 'react'

function RoundButton({ onClick, text, children }) {
    return (
        <button
            onClick={onClick}
            className='btn btn-circle bg-transparent text-lg hover:bg-onHoverColor hover:border-black border-black border-[1px]'>
            {text || children}
        </button>
    )
}

export default RoundButton