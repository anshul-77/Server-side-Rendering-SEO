import React from 'react';

const Test = () => {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Center horizontally
      justifyContent: 'center', // Center vertically
    }}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi2RiTmfx62f7I4ie_AxlCGxiBYkuaFX0uyQ&s"
        alt="Description of the image"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      
    </div>
  );
};

export default Test;
