import { Container } from "@material-ui/core";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";

import useStyles from "./styles";

const App = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <Container className={classes.container} maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
