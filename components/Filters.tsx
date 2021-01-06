import React from 'react'

interface FiltersProps {
  active: boolean;
  order_alpha: () => void;
  order_online: () => void;
  order_viewers: () => void;
}

const Filters = ({active, order_alpha, order_online, order_viewers}) => {
  return (
    <div className="flex gap-4 justify-center">
      <button onClick={() => order_alpha()} className={`bg-gray-600 text-white py-2 px-6 rounded font-bold focus:outline-none ${active===0 ? "outline-none ring-4 ring-purple-600 ring-offset-2 ring-offset-transparent" : ""}`}>
        A-Z
      </button>
      <button onClick={() => order_online()} className={`bg-gray-600 text-white py-2 px-6 rounded font-bold focus:outline-none ${active===1 ? "outline-none ring-4 ring-purple-600 ring-offset-2 ring-offset-transparent" : ""}`}>
        Online
      </button>
      <button onClick={() => order_viewers()} className={`bg-gray-600 text-white py-2 px-6 rounded font-bold focus:outline-none ${active===2 ? "outline-none ring-4 ring-purple-600 ring-offset-2 ring-offset-transparent" : ""}`}>
        Espectadores
      </button>
    </div>
  )
}

export default Filters;