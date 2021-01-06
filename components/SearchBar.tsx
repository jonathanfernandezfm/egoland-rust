import React, { useRef, useState } from 'react'

interface SearchBarProps {
  onChange: (text) => void;
}

const SearchBar = ({onChange}: SearchBarProps) => {
  const [value, setValue] = useState("");
  let textInput = useRef(null);
  
  const handleInputChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  }

  const clearInput = () => {
    textInput.current.value = "";
    onChange("");
    setValue("");
  }

  return (
    <div className="text-gray-700 bg-white py-3 px-4 rounded flex items-center gap-4 focus-within:outline-none focus-within:ring-4 focus-within:ring-purple-500 focus-within:ring-offset-2 focus-within:ring-offset-transparent">
      {!value && <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>}
      {value && <button className="hover:bg-gray-200 rounded" onClick={() => clearInput()}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>}
      <input className="text-gray-700 font-semibold text-xl w-full" onChange={(e) => {handleInputChange(e)}} type="text" placeholder="Streamer" ref={textInput}/>
    </div>
  )
}

export default SearchBar;