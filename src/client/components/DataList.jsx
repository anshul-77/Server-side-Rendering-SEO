import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import data from '../../data/data.json';

const dataListContainerStyle = {
  padding: '20px'
};

const headingStyle = {
  marginBottom: '15px'
};

const dataListItemsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gridGap: '20px'
};

const listItemStyle = {
  textDecoration: 'none',
  color: 'inherit'
};

const listItemHoverStyle = {
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
};

function DataList() {
  return (
    <div style={dataListContainerStyle} className="data-list-container">
      <h2 style={headingStyle}>Data List</h2>
      <div style={dataListItemsStyle} className="data-list-items">
        {data.map((item) => (
          <Link key={item.id} to={`/cardclickdata/${item.id}`} style={listItemStyle} className="data-list-item">
            <Card name={item.name} id={item.id} phone={item.phone} email={item.email} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DataList;

