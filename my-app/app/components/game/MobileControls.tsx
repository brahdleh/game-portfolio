import React from 'react';

interface MobileControlsProps {
  onLeftStart: () => void;
  onLeftEnd: () => void;
  onRightStart: () => void;
  onRightEnd: () => void;
  onJumpStart: () => void;
  onJumpEnd: () => void;
}

const ControlButton: React.FC<{
  onTouchStart: () => void;
  onTouchEnd: () => void;
  children: React.ReactNode;
}> = ({ onTouchStart, onTouchEnd, children }) => (
  <div
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
    style={{
      width: '60px',
      height: '60px',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      msUserSelect: 'none',
      cursor: 'default',
      touchAction: 'manipulation',
      margin: '0 5px'
    }}
  >
    {children}
  </div>
);

const MobileControls: React.FC<MobileControlsProps> = ({
  onLeftStart,
  onLeftEnd,
  onRightStart,
  onRightEnd,
  onJumpStart,
  onJumpEnd
}) => {
  return (
    <>
      {/* Left and Right controls container */}
      <div style={{ 
        position: 'fixed', 
        bottom: '10px', 
        left: '20px',
        display: 'flex', 
        zIndex: 10
      }}>
        <ControlButton onTouchStart={onLeftStart} onTouchEnd={onLeftEnd}>←</ControlButton>
        <ControlButton onTouchStart={onRightStart} onTouchEnd={onRightEnd}>→</ControlButton>
      </div>

      {/* Jump control container */}
      <div style={{ 
        position: 'fixed', 
        bottom: '10px', 
        right: '20px',
        zIndex: 10
      }}>
        <ControlButton onTouchStart={onJumpStart} onTouchEnd={onJumpEnd}>↑</ControlButton>
      </div>
    </>
  );
};

export default MobileControls; 