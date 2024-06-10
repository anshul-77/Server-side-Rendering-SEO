import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function Button() {
  const [userData, setUserData] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
  });
  const [minimizeUserData, setMinimizeUserData] = useState(false); // State to track whether to minimize user data
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      const newUser = await response.json();
      setUsers([...users, newUser]);
      setFormData({ id: '', name: '', phone: '', email: '' });
    } catch (error) {
      console.error(error);
      // Display an error message to the user
    }
  };

  const handleSearch = () => {
    fetch(`http://localhost:3001/users/search/${searchId}`)
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(err => console.error(err));
  };

  const handleRowClick = (id) => {
    const clickedUser = users.find(user => user.id === id);
    setUserData(clickedUser);
  };

  const toggleMinimizeUserData = () => {
    setMinimizeUserData(!minimizeUserData);
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    formContainer: {
      marginBottom: '20px',
      textAlign: 'center',
    },
    searchContainer: {
      marginBottom: '20px',
      textAlign: 'center',
    },
    userDetails: {
      marginBottom: '20px',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      position: 'relative',
    },
    minimizeButton: {
      position: 'absolute',
      top: '5px',
      right: '5px',
      padding: '4px 8px',
      fontSize: '12px',
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    minimizedUserData: {
      display: minimizeUserData ? 'none' : 'block',
    },
    userTable: {
      marginBottom: '20px',
    },
    button: {
      padding: '8px 16px', // smaller padding
      fontSize: '14px', // smaller font size
      backgroundColor: 'grey',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    input: {
      marginBottom: '8px', // smaller margin
      padding: '8px', // smaller padding
      fontSize: '14px', // smaller font size
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '50%', // Full width
      boxSizing: 'border-box', // Include padding and border in width
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    th: {
      padding: '10px',
      border: '1px solid #ddd',
      textAlign: 'left',
    },
    trEven: {
      backgroundColor: '#f9f9f9',
    },
    trOdd: {
      backgroundColor: '#ffffff',
    },
    td: {
      padding: '10px',
      border: '1px solid #ddd',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <Helmet>
        <title>User Management - Add and View Users</title>
        <meta name="description" content="Manage users by adding new users and viewing existing users. Ensure data consistency and easy management." />
        {/* Add other meta tags as needed */}
      </Helmet>

      <h1 style={styles.heading}>User Information</h1>

      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="number"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            placeholder="ID"
            style={styles.input}
            required
          /><br/>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            style={styles.input}
            required
          /><br/>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            style={styles.input}
            required
          /><br/>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            style={styles.input}
            required
          /><br/>
          <button type="submit" style={styles.button}>Add User</button>
        </form><br/><br/>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="number"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Search User ID"
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>Search</button>
      </div>

      <div style={styles.userDetails}>
        <h2 style={{ marginBottom: '5px' }}>
          {minimizeUserData ? 'User Details' : 'User Details'}
        </h2>
        <button onClick={toggleMinimizeUserData} style={styles.minimizeButton}>
          {minimizeUserData ? '+' : '-'}
        </button>
        <div style={styles.minimizedUserData}>
          {/* Display user details when not minimized */}
          {userData && (
            <div>
              <p>ID: {userData.id}</p>
              <p>Name: {userData.name}</p>
              <p>Phone: {userData.phone}</p>
              <p>Email: {userData.email}</p>
            </div>
          )}
        </div>
      </div>

      <div style={styles.userTable}>
        <h2>All Users</h2>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr 
                key={index} 
                style={index % 2 === 0 ? styles.trEven : styles.trOdd}
                onClick={() => handleRowClick(user.id)}
              >
                <td style={styles.td}>{user.id}</td>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.phone}</td>
                <td style={styles.td}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Button;








/*import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function Button() {
  const [userData, setUserData] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = () => {
    fetch(`http://localhost:3001/users/search/${searchId}`)
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(err => console.error(err));
  };

  const handleRowClick = (id) => {
    navigate(`/users/${id}`);
  };

  const handleAddition = () => {
    // Your logic for addition functionality here
    console.log("Addition functionality will be implemented here.");
  };

  return (
    <div style={styles.container}>
      <Helmet>
        <title>User Management - Add and View Users</title>
        <meta name="description" content="Manage users by adding new users and viewing existing users. Ensure data consistency and easy management." />
        
      </Helmet>

      <h1 style={styles.heading}>User Information</h1>

      <div style={styles.searchContainer}>
        <input
          type="number"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Search User ID"
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>Search</button>
      </div>

      {userData && (
        <div style={styles.userDetails}>
          <h2>User Details</h2>
          <p>ID: {userData.id}</p>
          <p>Name: {userData.name}</p>
          <p>Phone: {userData.phone}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}

      <div style={styles.userTable}>
        <h2>All Users</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} onClick={() => handleRowClick(user.id)} style={user.id % 2 === 0 ? styles.trEven : styles.trOdd}>
                <td style={styles.td}>{user.id}</td>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.phone}</td>
                <td style={styles.td}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  searchContainer: {
    marginBottom: '20px',
  },
  userDetails: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  userTable: {
    marginBottom: '20px',
  },
  button: {
    padding: '8px 16px', // smaller padding
    fontSize: '14px', // smaller font size
    backgroundColor: 'grey',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  input: {
    marginBottom: '8px', // smaller margin
    padding: '8px', // smaller padding
    fontSize: '14px', // smaller font size
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  th: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  trEven: {
    backgroundColor: '#f9f9f9',
  },
  trOdd: {
    backgroundColor: '#ffffff',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
    cursor: 'pointer',
  },
};

export default Button;*/
