import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "leaflet/dist/leaflet.css";

import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
    <div className="">
        <Header />
        <main>
            <HomeScreen />
        </main>
        <Footer />
    </div>
  );
}

export default App;
