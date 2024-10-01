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
    'text-3xl', // for 1st place
    'text-2xl',  // for 2nd place
    'text-xl',  // for 3rd place
    'text-base' // for 4th place and below
  ];
  const fontSizeClass = fontSizeClasses[index] || 'text-base';

  return (
    <li className={`
      grid grid-cols-[auto_auto_auto] items-baseline gap-4
      ${fontSizeClass}
      transition-all duration-300 ease-in-out
      hover:bg-P1-main hover:text-background-P1-light rounded-sm p-2
    `}>
      <span className="text-right">{index + 1}.</span>
      <span className="text-center truncate">{item.username}:</span>
      <span className="text-center">{timeDiff}</span>
    </li>
  );
});

const Leaderboard = ({ leaderboardArray }) => {
  const sortedArray = useMemo(() =>
    [...leaderboardArray].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
    [leaderboardArray]
  );

  return (
    <div className="w-full max-w-fit flex flex-col items-center overflow-y-auto">
      <ol className="w-full list-none font-mono">
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