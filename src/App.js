import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainPage from './components/MainPage';
import { useState } from 'react';
import MergeSortVisualizer from './components/mergesorttwo';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [page, setPage] = useState('home');
  const toggleMode =()=>{
    setIsDarkMode(!isDarkMode);
  }
  return (
    <div className={`App ${isDarkMode ? 'dark' : ''}`}>
      <Navbar darkMode={isDarkMode} />
      <Sidebar darkMode={isDarkMode} toggle={toggleMode} undefined="true" setPage={setPage}/>
      <MainPage page={page} darkMode={isDarkMode}/>
       {/* <MergeSortTwoArrays /> */}
    </div>
  //   <div className="min-h-screen bg-gray-100 py-8">
  //   <div className="container mx-auto">
  //     <h1 className="text-3xl font-bold text-center mb-8">Merge Sort Visualization</h1>
  //     <MergeSortVisualizer />
  //   </div>
  // </div>

  );
}

export default App;
