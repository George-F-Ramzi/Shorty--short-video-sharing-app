import { Form, Link, useActionData, redirect } from "react-router-dom";
import { RegisterApi } from "../api/userApi";
import ErrorText from "./errorText";

let loading = false;

export const RegisterAction = async ({ request }) => {
  const formData = await request.formData();
  const data = {};
  data.username = formData.get("username");
  data.email = formData.get("email");
  data.password = formData.get("password");
  try {
    const request = await RegisterApi(data);
    localStorage.setItem("token", request.headers["x-auth-token"]);
    loading = false;
    return redirect("/home");
  } catch (error) {
    loading = false;
    return error.response.data;
  }
};

const Register = () => {
  const error = useActionData();
  return (
    <div className="form-container">
      <Form
        onSubmit={() => {
          loading = true;
        }}
        method="post"
        className="form"
        action="/register"
      >
        <h3 className="form__title">Hi There!</h3>
        <p className="form__subtitle body1">Create a new account</p>
        <input
          placeholder="Enter Username Here"
          className="input input--big"
          name="username"
          type="text"
        />
        {error && error.includes("username") && <ErrorText error={error} />}
        <input
          placeholder="Enter Email Here"
          className="input input--big"
          name="email"
          type="email"
        />
        {error && error.includes("email") && <ErrorText error={error} />}
        <input
          placeholder="Enter Password Here"
          className="input input--big"
          name="password"
          type="password"
        />
        {error && error.includes("password") && <ErrorText error={error} />}
        {loading ? (
          <button disabled className="btn btn--big btn--loading">
            Loading...
          </button>
        ) : (
          <button type="submit" className="btn btn--big">
            Register
          </button>
        )}
        <p className="more-info body1">
          Already have account?{" "}
          <Link className="info__link" to="/">
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;
