import React, { useEffect, useState } from 'react'
import { TwitchEmbed, TwitchChat, TwitchClip, TwitchPlayer } from 'react-twitch-embed';
import { useRouter } from 'next/router'

const getGridSize = (streamersSize) => {
  if(streamersSize==1) return 'grid-cols-1';
  if(streamersSize==2) return 'grid-cols-1 xl:grid-cols-2';
  if(streamersSize==3) return 'grid-cols-1 lg:grid-cols-2';
  if(streamersSize==4) return 'grid-cols-1 sm:grid-cols-2';
  if(streamersSize==5) return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3';
  if(streamersSize==6) return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3';
  if(streamersSize==7) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4';
  if(streamersSize<=8) return 'grid-cols-4';
  return 'grid-cols-1';
}

const getSpan = (streamersSize, index) => {
  if(streamersSize==3 && index == 1) return 'lg:row-span-2';
  if(streamersSize==5 && index == 4) return 'md:col-span-2';
  if(streamersSize==7 && index == 6) return 'col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-2';
  return ''
}

const Player = () => {
  const router = useRouter()
  const { streams } = router.query;

  return (
    <div className="bg-gray-700">
      {streams && <div className={`grid h-screen col-auto ${getGridSize(streams.toString().split(',').length)}`}>
        {streams.toString().split(',').map((player, index) => {
            return <TwitchEmbed
                channel={player}
                id={"player-"+index}
                theme="dark"
                className={`${getSpan(streams.toString().split(',').length, index)}`}
                muted 
                width="100%"
                height="100%"
                autoplay={false}
                withChat={false}
                onVideoPause={() => console.log(':(')}
              />
            
        })}
      </div>}

      {!streams && <div>
        Loading...
      </div>}
    </div>
  )
}

export default Player;