import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DataDetail() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/data/${id}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: 'red' }}>
        <h2>User Details</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div style={{ textAlign: 'center', color: 'red' }}>
        <h2>User Details</h2>
        <p>User not found</p>
      </div>
    );
  }

  const styles = {
    dataDetail: {
      padding: '1rem',
      border: '1px solid #ddd', // Light grey border
      borderRadius: '4px',
      margin: '1rem auto',
      maxWidth: '400px',
      backgroundColor: '#f5f5f5', // Light grey background
    },
    dataDetailH2: {
      margin: '0 0 1rem 0',
    },
    dataDetailP: {
      margin: '0.5rem 0',
    },
  };

  return (
    <div style={styles.dataDetail}>
      <h2 style={styles.dataDetailH2}>Data Detail</h2>
      <p>ID: {userData.id}</p>
      <p>Name: {userData.name}</p>
      <p>Phone: {userData.phone}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default DataDetail;



