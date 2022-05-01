import React from "react";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import Landing from "./Landing";
import App from "./App";
import NotFound from "./NotFound";

const Router = () => {
    return(
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"} component={Landing}/>
                    <Route path={"/restaurant/:restId"} component={App}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
    )

}

export default Router;