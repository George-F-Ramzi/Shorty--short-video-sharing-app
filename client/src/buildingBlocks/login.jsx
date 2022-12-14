import { Form, Link, useActionData, redirect } from "react-router-dom";
import { LoginApi } from "../api/userApi";
import ErrorText from "./errorText";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = {};
  data.email = formData.get("email");
  data.password = formData.get("password");
  try {
    const request = await LoginApi(data);
    localStorage.setItem("token", request.headers["x-auth-token"]);
    return redirect("/home");
  } catch (error) {
    return error.response.data;
  }
};

const Login = () => {
  const error = useActionData();

  return (
    <div className="form-container">
      <Form action="/" method="post" className="form">
        <h3 className="form__title">Welcome Back!</h3>
        <p className="form__subtitle body1">Login to your account</p>
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
        <button type="submit" className="btn btn--big">
          Login
        </button>
        <p className="more-info body1">
          You don't have account?{" "}
          <Link className="info__link" to="/register">
            Register
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;
