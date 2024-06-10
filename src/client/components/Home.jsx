import React from 'react';
import { Helmet } from 'react-helmet';
import data from '../../data/data.json';

const Home = () => {
  const sectionStyle = {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: '20px auto',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#444',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    lineHeight: '1.6',
    textAlign: 'justify',
  };

  return (
    <section style={sectionStyle}>
      <Helmet>
        <title>Welcome to Our Website - [TechWalnut]</title>
        <meta name="description" content="Explore our range of products and services, learn about our commitment to quality, and stay updated with the latest company news." />
        <meta name="keywords" content="your company, products, services, quality, customer satisfaction" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Welcome to Our Website - [TechWalnut]" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.techwalnut.com/" />
        <meta property="og:image" content="data:image/jpeg;base64,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" />
        <meta name="twitter:title" content="Welcome to Our Website - [TechWalnut]" />
        <meta name="twitter:description" content="Explore our range of products and services, learn about our commitment to quality, and stay updated with the latest company news." />
        <meta name="twitter:image" content="data:image/jpeg;base64,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" />
      </Helmet>
      <h1 style={headingStyle}>Welcome to Our Website</h1>
      <p style={paragraphStyle}>
        Welcome to [Your Company Name]! We are excited to have you here. Our website is designed to provide you with all the information you need about our products and services. Whether you're looking for the latest updates, company news, or simply exploring what we have to offer, you've come to the right place.
      </p>
      <p style={paragraphStyle}>
        At [Your Company Name], we pride ourselves on our commitment to quality and customer satisfaction. Our team works tirelessly to ensure that you receive the best possible service and support. We offer a wide range of products tailored to meet your needs, and we are constantly innovating to bring you the latest and greatest.
      </p>
      <p style={paragraphStyle}>
        Thank you for visiting our website. We hope you find everything you are looking for. If you have any questions or need further assistance, please do not hesitate to contact us. We're here to help and look forward to serving you.
      </p>
      <button style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => { window.location.href = 'sitemap.html'; }}>Go to Sitemap</button>

    </section>
  );
};

export default Home;

