import Canvas from './Canvas.jsx'
import ControlPanel from './components/ControlPanel.jsx';


export default function App() {
  return (
    <div style={{textAlign: 'center'}}>
      <ControlPanel />
      <Canvas />
    </div>
  );
}