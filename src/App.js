import React from 'react';
import './App.css';
import GameContainer from './components/Game/GameContainer';
import LeaderBoardContainer from './components/LeaderBoard/LeaderBoardContainer';

const App = () => {
  return (
    <div className="app-wrapper">
      <GameContainer />
      <LeaderBoardContainer />
    </div>
  )
}

export default App;
