import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import SearchBar from '../components/SearchBar'
import StreamerCard from '../components/StreamerCard'
import Link from 'next/link'
import { url } from 'inspector'
import Header from '../components/Header'
import Filters from '../components/Filters'
import Twitch from '../lib/twitch'


const StreamersPlaceholder = [
  {name: "Cristinini", slug: "iamcristinini"},
  {name: "Rubius", slug: "rubius"},
  {name: "Mangel", slug: "mangel"},
  {name: "Maximus", slug: "agentemaxo"},
  {name: "Orslok", slug: "orslok"},
  {name: "Luzu", slug: ""},
  {name: "Fargan", slug: ""},
  {name: "Aroyitt", slug: "aroyitt"},
  {name: "Perxitaa", slug: "perxitaa"},
  {name: "VioletaG", slug: "violetag"},
  {name: "Auronplay", slug: "auronplay"},
  {name: "Biyin", slug: "biyin_"},
  {name: "Reborn", slug: "reborn_live"},
  {name: "Ibai", slug: "ibai"},
  {name: "Reven", slug: "reventxz"},
  {name: "Revenant", slug: "g4g_revenant"},
  {name: "BarbeQ", slug: "ernesbarbeq"},
  {name: "Menostrece", slug: "menostrece"},
  {name: "Lolito", slug: ""},
  {name: "BuckFdez", slug: "buckfernandez"},
  {name: "Elvisa", slug: "elvisayomastercard"},
  {name: "Cheeto", slug: "srcheeto"},
  {name: "Chuso", slug: "chusommontero"},
  {name: "Jagger", slug: "jaggerprincesa"},
  {name: "Outconsumer", slug: "outconsumer"},
  {name: "Knekro", slug: "knekro"},
  {name: "Illojuan", slug: "illojuan"},
  {name: "Staxx", slug: "bystaxx"},
  {name: "Grefg", slug: "thegrefg"},
  {name: "Ampeter", slug: ""},
  {name: "Elemao", slug: "srelemao"},
  {name: "Alexby", slug: "alexby11"},
  {name: "RichMC", slug: "elrichmc"},
  {name: "Lexosi", slug: ""},
  {name: "Herny", slug: ""},
  {name: "Jesusseron", slug: ""},
  {name: "Arsilex", slug: "arsiilex"},
  {name: "Angel", slug: ""},
  {name: "Silithur", slug: "silithur"},
  {name: "Elded", slug: "elded"},
  {name: "DjMario", slug: ""},
  {name: "Folagor", slug: "folagorlives"},
  {name: "Sarinha", slug: ""},
  {name: "Tense", slug: "tense198_v2"},
  {name: "TheAntonio", slug: "th3antonio"},
  {name: "Dylantero", slug: "dylanterolive"},
  {name: "Arigameplays", slug: ""},
  {name: "Coollifegame", slug: "coolifegame"},
  {name: "Alkapone", slug: ""},
  {name: "JuansGarnizo", slug: "juansguarnizo"},
  {name: "Elyshuri", slug: "elyshuri"},
  {name: "Ocelote", slug: "ocelote"},
  {name: "Destri", slug: "d3stri"},
  {name: "Taeschnee", slug: "taeschnee"},
  {name: "Xokas", slug: "elxokas"},
  {name: "Zeling", slug: "zeling"},
  {name: "Nia", slug: "lakshartnia"},
  {name: "SrSerpiente", slug: "srserpiente"},
  {name: "Sisi", slug: "sisinono"},
  {name: "Eddisplay", slug: ""},
  {name: "Zorman", slug: ""},
  {name: "Ander", slug: "tvander"},
  {name: "Bokeron", slug: "elbokeron"},
  {name: "Mikecrack", slug: ""},
  {name: "Trollino", slug: ""},
  {name: "Sparta356", slug: ""},
  {name: "Luh", slug: "luh"},
  {name: "MissAndie", slug: ""},
  {name: "Mayichi", slug: "mayichi"},
  {name: "Farfadox", slug: ""},
  {name: "Itarus", slug: "itarus1"},
  {name: "Koko", slug: ""},
  {name: "Agustin", slug: ""},
  {name: "Vicens", slug: "vicens"},
  {name: "Tarifa", slug: "bytarifaaa"},
  {name: "Nexuus", slug: ""},
]

const Index = () => {
  const [selected, setSelected] = useState([]);
  const [streamersLiveInfo, setStreamersLiveInfo] = useState([]);
  const [filteredStreamers, setFilteredStreamers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterActive, setFilterActive] = useState(2);  

  useEffect(() => {
    const fetchData = async () => {
      let array = [];
      let promises = [];
      setLoading(true);
      for(let i = 0; i < StreamersPlaceholder.length; i++) {
        if(StreamersPlaceholder[i].slug != "") {
          promises.push(Twitch.getStreamerInfo(StreamersPlaceholder[i]).then((response) => {
            array.push(response);
            return response;
          }))
        } else {
          
        }
      }

      Promise.all(promises).then((a) => {
        setStreamersLiveInfo(array);
        orderViewers(array);
        setLoading(false);
      });
    }

    fetchData();
  }, [])

  const select = (slug) => {
    let array = [...selected];

    if(selected.includes(slug)) array = selected.filter((item) => item != slug);
    else array.push(slug);
    
    setSelected(array);
  }

  const filter = (text) => {
    let array = streamersLiveInfo.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));

    setFilteredStreamers(array);
  }

  const orderAlpha = () => {
    setFilterActive(0);

    let array = [...streamersLiveInfo];
    array.sort((a, b) => {
      if(a.name > b.name) return 1;
      if(a.name < b.name) return -1;
      return 0;
    });
    setFilteredStreamers(array);
  }

  const orderOnline = () => {
    setFilterActive(1);

    let array = [...streamersLiveInfo];
    array.sort((a, b) => {
      if(!a.online && b.online) return 1;
      if(a.online && !b.online) return -1;
      return 0;
    });
    setFilteredStreamers(array);
  }

  const orderViewers = (streams = streamersLiveInfo) => {
    setFilterActive(2);

    let array = [...streams];
    array.sort((a, b) => {
      if(!a.viewers) return 1;
      if(!b.viewers) return -1; 
      if(a.viewers < b.viewers) return 1;
      if(a.viewers > b.viewers) return -1;
      return 0;
    });
    setFilteredStreamers(array);
  }

  return (
    <div className="h-screen">
      <Header/>
      {loading && <div className="flex justify-center items-center gap-6 mt-10">
        <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <div className="text-4xl text-center text-white">
          Loading...
        </div>
      </div>}
      {!loading && <div  className="bg-no-repeat bg-cover min-w-full">
        <div className="pt-8 px-80 xl:px-72 lg:px-64 md:px-32 sm:px-10">
          <SearchBar onChange={filter}/>
        </div>
        <div className="pt-8 px-80 xl:px-72 lg:px-64 md:px-32 sm:px-10">
          <Filters active={filterActive} order_alpha={orderAlpha} order_online={orderOnline} order_viewers={orderViewers}/>
        </div>
        <div className="text-white flex flex-wrap gap-10 py-10 px-80 xl:px-72 lg:px-64 md:px-32 sm:px-10 items-start justify-center">
          {filteredStreamers.map(({name, slug, game, image, viewers, online}, index) => {
            return <StreamerCard key={index} slug={slug} game={game} name={name} image={image} viewers={viewers} online={online} active={selected.includes(slug)} onClick={()=>{select(slug)}}/>
          })}
        </div>
        {selected.length > 0 &&<div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <Link href={{
              pathname: '/player',
              query: { streams: selected.join(',') },
            }}>
              <a className="bg-purple-600 py-3 px-6 rounded text-white font-semibold text-xl
                  focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent ">
              Ver streams
              </a>
          </Link>
        </div>}
      </div>}
    </div>
  )
}

export default Index;