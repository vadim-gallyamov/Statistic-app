import React from 'react';

interface PlaceholderMainContentProps {
  text: string;
}

const PlaceholderMainContent: React.FC<PlaceholderMainContentProps> = ({ text }) => {
  return (
    <div className="main-content">
      <p>{text}</p>
    </div>
  );
};

export default PlaceholderMainContent;