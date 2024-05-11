import Player from './components/Player.jsx';
import TimerChallenge from './components/TimerChallenge.jsx';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenge title="Easy" tgtTime={1}/>
        <TimerChallenge title="Not Easy" tgtTime={5}/>
        <TimerChallenge title="Getting Tough" tgtTime={10}/>
        <TimerChallenge title="Pros Only" tgtTime={15}/>
      </div>
    </>
  );
}

export default App;
