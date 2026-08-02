import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import "./Login.css"

export const LoginPage = () => {
    const { formData, errors, serverError, isLoading, handleChange, handleSubmit } = useLogin()

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <h2>Log In</h2>

                <div className="auth-field-single">
                    <label htmlFor="identifier">Email or Mobile</label>
                    <input
                        id="identifier"
                        type="text"
                        placeholder="Email or Mobile Number"
                        value={formData.identifier}
                        onChange={(e) => handleChange("identifier", e.target.value)}
                    />
                    {errors.identifier && <p className="auth-error">{errors.identifier}</p>}
                </div>

                <div className="auth-field-single">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                    />
                    {errors.password && <p className="auth-error">{errors.password}</p>}
                </div>

                {serverError && <p className="auth-error auth-error-server">{serverError}</p>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Log In"}
                </button>

                <p className="auth-note">
                    Only Admin, Manager, and Owner can log in from this panel.
                    If you haven't registered, go to the{" "}
                    <Link to="https://spice-and-slice.example.com/register" className="authNav-link">
                        Spice&amp;Slice page
                    </Link>{" "}
                    to register.
                </p>
            </form>
        </div>
    )
}