import React from 'react';

const Card = ({ name, id, phone, email }) => {
  return (
    <div style={styles.card}>
      <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt={name} style={styles.image} />
      <h2 style={styles.cardTitle}>{id}</h2>
      <h2 style={styles.cardTitle}>{name}</h2>
      <h2 style={styles.cardTitle}>{phone}</h2>
      <h4 style={styles.cardTitle}>{email}</h4>
    </div>
  );
}

const styles = {
  card: {
    border: '3px solid white', // Thick white border
    borderRadius: '8px', // Rounded corners
    padding: '14px',
    margin: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
    cursor: 'pointer', // Change cursor to pointer when hovering
    backgroundColor: '#e0f2f1', // Light blue background color
    transition: 'transform 0.2s ease-in-out', // Add transition effect to transform property
  },
  cardTitle: {
    fontSize: '18px',
    margin: '10px 0 0 0',
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
};

export default Card;


