// components/StartButton.tsx

import React from 'react';

interface StartButtonProps {
  onStart: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ onStart }) => {
  return (
    <button
      onClick={onStart}
      style={{
        position: 'fixed',
        top: 10,
        left: 10,
        zIndex: 10,
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
      }}
    >
      Start
    </button>
  );
};

export default StartButton;