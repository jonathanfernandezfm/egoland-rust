import axios from "axios"

const Twitch = {
  searchUser: async (user) => {
    let response = await axios.get(`https://api.twitch.tv/helix/search/channels?query=${user}`, {
      headers: {
        "Client-ID": "hssx1bgogbpcukaz4xf2g18syu2ied",
        "Authorization": "Bearer qu8nj7ez1nm3189tpspqciev8lyk3t"
      }
    })

    return response.data.data[0];
  },
  getStreamInfo: async (id) => {
    let response = await axios.get(`https://api.twitch.tv/helix/streams?user_id=${id}`, {
      headers: {
        "Client-ID": "hssx1bgogbpcukaz4xf2g18syu2ied",
        "Authorization": "Bearer qu8nj7ez1nm3189tpspqciev8lyk3t"
      }
    })

    return response.data.data[0];
  },

  getStreamerInfo: (stream) => {
    return axios.get(`https://api.twitch.tv/helix/search/channels?query=${stream.slug}`, {
      headers: {
        "Client-ID": "hssx1bgogbpcukaz4xf2g18syu2ied",
        "Authorization": "Bearer qu8nj7ez1nm3189tpspqciev8lyk3t"
      }
    }).then(response => {
      let user_data = response.data.data[0];

      return axios.get(`https://api.twitch.tv/helix/streams?user_id=${user_data.id}`, {
        headers: {
          "Client-ID": "hssx1bgogbpcukaz4xf2g18syu2ied",
          "Authorization": "Bearer qu8nj7ez1nm3189tpspqciev8lyk3t"
        }
      }).then((response2) => {
        let liveData = {
          name: stream.name, 
          slug: stream.slug,
          id: user_data.id,
          game: response2.data.data[0]?.game_name, 
          image: user_data.thumbnail_url, 
          viewers: response2.data.data[0]?.viewer_count,
          online: user_data.is_live
        }
  
        return liveData;
      })
      
    })
  }
}


export default Twitch