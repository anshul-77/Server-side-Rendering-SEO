import React from 'react';

function ClientOnly() {
  const styles = {
    position: 'fixed',
    bottom: 0,
    right: 0,  // Adjusted to position from the right edge
    padding: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={styles}>
      This component is rendered client-side only.
    </div>
  );
}

export default ClientOnly;

