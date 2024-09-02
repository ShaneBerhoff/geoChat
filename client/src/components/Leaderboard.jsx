import './styles/Leaderboard.css';
import React, { useState, useEffect, useMemo } from 'react';

const useTimeDifference = (createdAt) => {
  const [timeDiff, setTimeDiff] = useState('');

  useEffect(() => {
    const updateTimeDiff = () => {
      const now = new Date();
      const diffMs = now - new Date(createdAt);
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const newTimeDiff = `${diffHrs}h ${diffMins}m`;

      if (newTimeDiff !== timeDiff) {
        setTimeDiff(newTimeDiff);
      }

      // Calculate time until next update (when minute or hour changes)
      const nextUpdateMs = (60 - (diffMs / 1000) % 60) * 1000;
      setTimeout(updateTimeDiff, nextUpdateMs);
    };

    updateTimeDiff();
    return () => clearTimeout(updateTimeDiff);
  }, [createdAt, timeDiff]);

  return timeDiff;
};

const LeaderboardItem = React.memo(({ item, index, totalItems }) => {
  const timeDiff = useTimeDifference(item.createdAt);

  return (
    <li
      className="leaderboard-item"
      style={{
        fontSize: `${25 - index * 5}px`,
        marginBottom: index === totalItems - 1 ? '0px' : undefined
      }}
    >
      <span className="item-number">{index + 1}.</span>
      <span className="item-text">
        {item.username}: {timeDiff}
      </span>
    </li>
  );
});

const Leaderboard = ({ leaderboardArray, userInfo, socket }) => {
  const sortedArray = useMemo(() =>
    [...leaderboardArray].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
    [leaderboardArray]
  );

  const handleClick = () => {
    socket.current.emit('room toggle');
    console.log("Room toggled");
  };

  return (
    <div className="board-container">
      <h2
        onClick={() => handleClick()}
        style={{ cursor: 'pointer' }}
      >
        {userInfo.campus}
        {userInfo.building && `: ${userInfo.building}`}
      </h2>
      <ol className="leaderboard-list">
        {sortedArray.map((item, index) => (
          <LeaderboardItem
            key={item._id}
            item={item}
            index={index}
            totalItems={sortedArray.length}
          />
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;