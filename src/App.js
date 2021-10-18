import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import {useEffect} from "react";
import {connect} from "react-redux";
import {getUserAuth} from "./actions";

function App(props) {
    useEffect(() => {
        props.getUserAuth();
    }, [])
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

const mapStateToProps = (state) =>{
    return {
    }
}

export default connect(mapStateToProps, {getUserAuth})(App)
