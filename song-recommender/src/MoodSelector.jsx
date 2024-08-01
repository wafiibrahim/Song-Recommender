// MoodSelector.jsx
import React from 'react';
import './MoodSelector.css';

const moods = [
    'happy',
    'sad',
    'energetic',
    'relaxed',
    'angry',
    'romantic',
    'focused',
    'nostalgic',
    'party',
    'sleepy',
    'adventurous',
    'melancholy',
    'festive',
    'motivational',
    'calming'
  ];
  

const MoodSelector = ({ onMoodChange }) => {
  return (
    <div className="mood-selector">
      <h2>Select Your Mood:</h2>
      {moods.map((mood) => (
        <button key={mood} onClick={() => onMoodChange(mood)}>
          {mood}
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;

