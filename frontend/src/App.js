import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./App.sass";
import { useForm } from "react-hook-form";
import RestringForm from "./components/restring-form/restring-form";

export default function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="root">
        <h1 className="title">Strings Attached Restringing Application</h1>
        <p className="subtitle">
          Modern CSS framework based on{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox">
            Flexbox
          </a>
        </p>
        <RestringForm></RestringForm>
      </div>
    </>
  );
}
