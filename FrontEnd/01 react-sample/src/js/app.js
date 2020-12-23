import hello from "./hello.js";
import React from "react";
import ReactDom from "react-dom";
import style from "../css/style.css";

hello();

ReactDom.render(
  <h1>Hello, Frontend Engineer ~!</h1>,
  document.getElementById("root")
);
