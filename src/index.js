import React from "react";
import  {render} from "react-dom"
import Landing from "./components/Landing";
import Router from "./components/Router";

import "./css/style.css"

render(<Router/>, document.querySelector("#root"));
