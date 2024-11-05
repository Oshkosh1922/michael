// components/SocialMediaCard.js
import React from 'react';

export default function SocialMediaCard({ platform, content, url, image }) {
  return (
    <div style={{
      border: `5px solid ${platform === 'twitter' ? '#1da1f2' : '#e1306c'}`,
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
      transition: 'transform 0.3s',
      padding: '1rem'
    }}>
      <img src={image} alt={`${platform} post`} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <p>{content}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{
          color: platform === 'twitter' ? '#1da1f2' : '#e1306c',
          fontWeight: 'bold'
        }}>
          View on {platform.charAt(0).toUpperCase() + platform.slice(1)}
        </a>
      </div>
    </div>
  );
}
