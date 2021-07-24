
import './App.css';
import Main from './pages/Main';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Marcador from './pages/Marcador';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Main></Main>
          </Route>
          <Route exact path="/marcador">
            <Marcador></Marcador>
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
