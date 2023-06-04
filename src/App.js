import React, { useState, useRef } from "react";
import { useFormik } from "formik";

function App() {
  const [loginSuccess, setLoginSuccess] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("form:", values);
      setLoginSuccess(true);
    },
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Field required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Username should be an email";
      }
      if (!values.password) errors.password = "Field Required";
      return errors;
    },
  });

const handleEmailChange=(e) => {
  Formik.handleChange(e);
  Formik.setFieldTouched("email", true);
};

const handlePasswordChange=(e) => {
  Formik.handleChange(e);
  Formik.setFieldTouched("password", true);
};

  return (
    <div>
      {loginSuccess && <div>{alert("Login Successful")}</div>}

      <form onSubmit={Formik.handleSubmit}>
        <div>Email</div>
        <input
          id="emailField"
          name="email"
          type="text"
          onChange={handleEmailChange}
          ref={emailRef}
        />

        {Formik.errors.email ? (
          <div id="emailError" style={{ color: "red" }}>
            {Formik.errors.email}
          </div>
        ) : null}
        <div>Password</div>
        <input
          id="pswField"
          name="password"
          type="password"
          onChange={handlePasswordChange}
          ref={passwordRef}
        />

        {Formik.errors.password ? (
          <div id="pswError" style={{ color: "red" }}>
            {Formik.errors.password}
          </div>
        ) : null}
        <button id="submitBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
