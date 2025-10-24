import React, { useState } from 'react';
import './LikeButton.css'; // Optional CSS file

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const handleClick = () => {
    if (disabled) return;

    setDisabled(true);

    setLiked(prevLiked => {
      const newLiked = !prevLiked;
      setLikeCount(prevCount => prevCount + (newLiked ? 100 : -100));
      return newLiked;
    });

    // Re-enable button after 1 second
    setTimeout(() => setDisabled(false), 1000);
  };

  return (
    <div className="like-button-container">
      <button onClick={handleClick} disabled={disabled} className={liked ? 'liked' : 'unliked'}>
        {liked ? '❤️ Liked' : '🤍 Like'}
      </button>
      <p>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</p>
    </div>
  );
};

export default LikeButton;
