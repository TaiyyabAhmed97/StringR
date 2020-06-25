import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "./App.sass";
import { useForm } from "react-hook-form";
import RestringForm from "./components/restring-form/restring-form";
import NewUserForm from "./components/new-user-form/new-user-form";

export default function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="root">
        <h1 className="title">Strings Attached Restringing Application</h1>
        <Router>
          <Switch>
            <Route path="/restring">
              <RestringForm></RestringForm>
            </Route>
            <Route path="/">
              <NewUserForm></NewUserForm>
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}
