import React from 'react'

interface StreamerCardProps {
  name: string;
  game: string;
  slug: string;
  image: string;
  viewers: number;
  active: boolean;
  online: boolean;
  onClick: () => void;
}

const StreamerCard = ({name, game, slug, image, viewers, active, online, onClick}: StreamerCardProps) => {
  const disabled = game != 'Rust' || !slug;
  
  return (
    <button disabled={disabled} onClick={onClick} className={`bg-gray-600 relative transition-shadow rounded hover:shadow-xl focus:outline-none
                      ${active ? "outline-none ring-4 ring-purple-600 ring-offset-2 ring-offset-transparent" : ""}
                      ${disabled ? "opacity-30":""}`}>
      <div className="bg-blue-100 h-36 rounded bg-cover" style={{backgroundImage: `url("${image}")`}}></div>
      <div className={`${online ? "bg-green-400":"bg-red-500"} absolute top-2 right-2 h-4 w-4 rounded-xl`}></div>
      <div className="absolute top-2 left-2 bg-red-600 rounded px-1">{viewers}</div>
      <div className="py-2 px-8 font-bold w-40">
        {name}
      </div>
    </button>
  )
}

export default StreamerCard;