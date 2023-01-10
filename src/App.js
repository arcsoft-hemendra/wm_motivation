import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoaderComponent from "./components/common/Loader/Loader";
import "./App.scss";
const GreetingsHome = React.lazy(() =>
  import("./pages/greetings/greetingsHome")
);
const GreetingsDetail = React.lazy(() =>
  import("../src/pages/greetings/greetingsDetail")
);
const Searchpage = React.lazy(() => import("./pages/searchpage/searchpage"));
const Categorypage = React.lazy(() =>
  import("./pages/categorypage/categorypage")
);
const Categorypagesingle = React.lazy(() =>
  import("./pages/categorypagesingle/categorypagesingle")
);

const Location = React.lazy(() => import("./pages/location/location"));
const LocationCity = React.lazy(() => import("./pages/location/locationCity"));
const GreetingsKahani = React.lazy(() =>
  import("./pages/kahani/greetingsKahani")
);
const Insight = React.lazy(() => import("./pages/insightpage/insight"));

const NotFound = React.lazy(() => import("./pages/not-found/NotFound"));

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<LoaderComponent />}>
        <Router>
          <Switch>
            <Route exact path="/" component={GreetingsHome} />
            <Route exact path="/search" component={Searchpage} />
            <Route exact path="/events" component={Categorypage} />
            <Route exact path="/location" component={Location} />
            <Route exact path="/motivationkahani" component={GreetingsKahani} />
            <Route exact path="/location/:id" component={LocationCity} />
            <Route exact path="/events/:id" component={Categorypagesingle} />
            <Route exact path="/insights" component={Insight} />
              <Route exact path="/insights/:id" component={Insight} />
            <Route exact path="/:userId" component={GreetingsDetail} />
            

          {/*   <Route exact path="/greetings" component={GreetingsListing} />
            <Route
              exact
              path="/greetings/:category"
              component={GreetingsListing}
            />
            <Route
              exact
              path="/greetings/:category/:userId"
              component={GreetingsDetail}
            />
           */}
            <Route component={NotFound} />
          </Switch>
        </Router>
      </React.Suspense>
    </div>
  );
}

export default App;
