import React from 'react';
import FotoP from "../img/User.png"

function ProfileAvatar({ imageUrl }) {
  return (
    <img 
      alt="Profile" 
      src={imageUrl || FotoP} 
      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
    />
  );
}

export default ProfileAvatar;