import React, { useState } from 'react';
import axios from 'axios';
import MoodSelector from './MoodSelector';
import SongList from './SongList';

const apiHost = 'https://spotify23.p.rapidapi.com';
const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

const moodQueries = {
  happy: "happy upbeat positive joy",
  sad: "sad mellow emotional heartbroken",
  energetic: "energetic workout hype adrenaline",
  relaxed: "relaxed chill calm soothing",
  angry: "angry intense aggressive rage",
  romantic: "romantic love passionate affectionate",
  focused: "focused concentration study work",
  nostalgic: "nostalgic retro vintage oldies",
  party: "party dance fun celebration",
  sleepy: "sleepy calm soothing lullaby",
  adventurous: "adventurous bold daring exciting",
  melancholy: "melancholy reflective somber pensive",
  festive: "festive holiday cheerful merry",
  motivational: "motivational inspiring uplifting driven",
  calming: "calming peaceful tranquil serene"
};

const App = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [songs, setSongs] = useState([]);

  const getRandomSongs = (items, count) => {
    const shuffled = items.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleMoodChange = async (mood) => {
    setSelectedMood(mood);
    const query = moodQueries[mood] || mood;

    const options = {
      method: 'GET',
      url: `${apiHost}/search/`,
      params: {
        q: `${query} playlist`,
        type: 'playlist',
        limit: '1',
        offset: '0'
      },
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'spotify23.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log('Full response:', response);

      const playlists = response.data.playlists;
      if (!playlists || !playlists.items || playlists.items.length === 0) {
        throw new Error('Playlists data is missing or incomplete in the response');
      }

      const playlistUri = playlists.items[0].data.uri;
      const playlistId = playlistUri.split(':').pop();

      // Fetch tracks from the playlist
      const tracksOptions = {
        method: 'GET',
        url: `${apiHost}/playlist_tracks/`,
        params: {
          id: playlistId,
          limit: '50', // Fetch more tracks for randomness
          offset: '0'
        },
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        }
      };

      const tracksResponse = await axios.request(tracksOptions);
      console.log('Tracks response:', tracksResponse);

      const trackItems = tracksResponse.data.items;
      if (!trackItems || trackItems.length === 0) {
        throw new Error('Tracks data is missing or incomplete in the playlist');
      }

      const randomTracks = getRandomSongs(trackItems, 5); // Select 5 random songs

      const trackList = randomTracks.map((item, index) => {
        console.log(`Track ${index}:`, item);
        const track = item.track;
        const trackName = track.name;
        const artistNames = track.artists.map(artist => artist.name).join(', ') || 'Unknown Artist';
        const coverArtUrl = track.album.images[0].url;
        return {
          name: trackName,
          artists: artistNames,
          coverArt: coverArtUrl
        };
      });

      setSongs(trackList);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setSongs([]);
    }
  };

  return (
    <div className="App">
      <h1 className="text-5xl">Song Recommender</h1>
      <MoodSelector onMoodChange={handleMoodChange} />
      <SongList songs={songs} />
    </div>
  );
};

export default App;
