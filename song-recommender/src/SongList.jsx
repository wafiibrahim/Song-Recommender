import React from 'react';
import './SongList.css';

const SongList = ({ songs }) => {
  return (
    <div className="song-list-container">
      <h2 className="song-list-header">Recommended Songs:</h2>
      {songs.length === 0 ? (
        <p>No songs to display. Select a mood to get recommendations!</p>
      ) : (
        <ul className="song-list">
          {songs.map((song, index) => (
            <li key={index} className="song-list-item">
              <img src={song.coverArt} alt={`${song.name} cover`} width="64" height="64" className="song-cover" />
              <div className="song-details">{song.name} - {song.artists}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SongList;

