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
  const fontSizeClasses = [
    'text-2xl', // for 1st place
    'text-xl',  // for 2nd place
    'text-lg',  // for 3rd place
    'text-base' // for 4th place and below
  ];
  const fontSizeClass = fontSizeClasses[index] || 'text-base';

  return (
    <li className={`
      grid grid-cols-[auto_1fr_auto] items-center gap-4
      ${fontSizeClass}
      transition-all duration-300 ease-in-out
      hover:bg-black rounded-lg p-2
    `}>
      <span className="font-bold text-primary text-right">{index + 1}.</span>
      <span className="font-medium text-center text-secondary truncate">{item.username}</span>
      <span className="text-primary text-sm">{timeDiff}</span>
    </li>
  );
});

const Leaderboard = ({ leaderboardArray }) => {
  const sortedArray = useMemo(() =>
    [...leaderboardArray].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
    [leaderboardArray]
  );

  return (
    <div className="w-full max-w-fit flex flex-col items-center justify-center rounded-2xl bg-background p-2">
      <ol className="w-full list-none">
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