import React from 'react'

interface ButtonProps {
  text: string;
}

const Button = ({text}: ButtonProps) => {
  return (
    <button className="bg-purple-600 py-3 px-6 rounded text-white font-semibold text-xl
                  focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-700 ">
      {text}
    </button>
  )
}

export default Button;