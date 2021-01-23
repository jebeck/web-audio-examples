import React from 'react';

export default function Layout({ children, headerBounds }) {
  return (
    <div
      style={{
        minHeight: `calc(100vh - ${headerBounds.bottom}px - 1rem)`,
        position: 'absolute',
        top: `calc(${headerBounds.bottom}px + 1rem)`,
        width: '100vw',
      }}
    >
      {children}
    </div>
  );
}
