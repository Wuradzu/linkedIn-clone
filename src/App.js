import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'}>
                        <Login/>
                    </Route>
                    <Route path={'/home'}>
                        <Header/>
                        <Home/>
                    </Route>
                </Switch>
            </BrowserRouter>

        </div>
    );
}

export default App;
