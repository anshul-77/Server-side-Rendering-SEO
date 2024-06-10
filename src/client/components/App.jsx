  import { Routes, Route } from 'react-router-dom';
  import Home from './Home';
  import About from './About';
  import Navbar from './Navbar';
  import Contact from './Contact';
  import Button from './Button';
  import DataList from './DataList';
  import DataDetail from './DataDetail';
  import WeatherForm from './WeatherForm';

  const App = () => {
    return (
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/button" element={<Button />} />
          <Route path="/json-file-data" element={<DataList />} />
          <Route path="/cardclickdata/:id" element={<DataDetail />}/>
          <Route path="/weather" element={<WeatherForm />} />
        </Routes>
      </main>
    );
  };

  export default App;
