
import './App.css';
import Main from './pages/Main';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Marcador from './pages/Marcador';
import Colina from './pages/Colina';
import Colinamarcador from './pages/Colinamarcador';
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
          <Route exact path="/colina">
            <Colina></Colina>
          </Route>
          <Route exact path="/marcadorcolina">
            <Colinamarcador></Colinamarcador>
          </Route>

        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
