import React, {useContext} from "react"
import ListMovie from "../movie/listMovie"
import DetailMovie from "../movie/detailMovie"
import TableMovie from "../movie/TableMovie"
import FormMovie from "../movie/formMovie"
import ListGame from "../games/listGame"
import DetailGame from "../games/detailGame"
import CreateGame from "../games/createGame"
import FormGame from "../games/formGame"
import TableGame from "../games/tableGame"
import Login from "../pages/Login"
import Home from "../pages/Home"
import SignUp from "../pages/SignUp";
import { Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import {UserContext} from "../context/UserContext"
import CreateMovies from "../movie/createMovie"

const Section = () =>{
  const [user] = useContext(UserContext);

  const PrivateRoute = ({ user, ...props }) => {
    if (user) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const LoginRoute = ({ user, ...props }) =>
    user ? <Redirect to="/" /> : <Route {...props} />;
  return(    
    <BrowserRouter>
      <Switch>
        <Route exact path="/detailMovie/:id" user={user} component={DetailMovie}/>
        <Route exact path="/listMovie" user={user} component={ListMovie}/>
        <Route exact path="/tableMovie" user={user} component={TableMovie}/>
        <PrivateRoute exact path="/formMovie" user={user} component={FormMovie}/>
        <PrivateRoute path="/createMovie" user={user} component={CreateMovies}/>

        <LoginRoute exact path="/login" user={user} component={Login}/>

        <PrivateRoute exact path="/createGame" user={user} component={CreateGame}/>
        <Route exact path="/detailgame/:id" user={user} component={DetailGame}/>
        <Route exact path="/tableGame" user={user} component={TableGame}/>
        <Route exact path="/listgame" user={user} component={ListGame}/>
        <PrivateRoute exact path="/formgame" user={user} component={FormGame}/>
        <Route path="/signup" user={user} component={SignUp} />
        <Route exact path="/" user={user} component={Home}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Section