import React from 'react';
import { Stopwatch } from './components/Stopwatch';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
      <h1 className="title">React Stopwatch</h1>
      <Stopwatch />
    </div>
    )
  }
}

export default App;
