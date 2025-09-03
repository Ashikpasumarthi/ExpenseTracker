import './App.css';
import Tracker from "./traker";
import { SnackbarProvider } from 'notistack'
function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="App">
        <Tracker/>
      </div>
    </SnackbarProvider>
  );
}

export default App;
