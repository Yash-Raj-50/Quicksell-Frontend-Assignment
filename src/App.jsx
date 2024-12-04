import './App.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { useState, useEffect } from 'react';

function App() {

  //Global state to store the grouping and ordering, also stored in local storage
  const [grouping, setGrouping] = useState(() => {
    return localStorage.getItem('grouping') || 'Status';
  });
  const [ordering, setOrdering] = useState(() => {
    return localStorage.getItem('ordering') || 'Priority';
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem('ordering', ordering);
  }, [ordering]);

  const updateGrouping = (group) => {
    setGrouping(group);
  };

  const updateOrdering = (order) => {
    setOrdering(order);
  };

  return (
    <div className='app'>
      <div className='header'><Header grouping={grouping} ordering={ordering} onChangeGroup={(group) => updateGrouping(group)} onChangeOrder={(order) => updateOrdering(order)} /></div>
      <div className='dashboard'><Dashboard grouping={grouping} ordering={ordering} data={data} /></div>
    </div>
  );
}

export default App;
