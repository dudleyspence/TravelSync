import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useSignInWithGoogle } from "../../hooks/auth/useGoogle";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "../../hooks/auth/useSignIn";

export default function SigninForm() {
  const { setUserLoggedIn } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    mutate: emailPasswordSignIn,
    isPending: isSigningIn,
    error: emailSignInError,
  } = useSignInWithEmailAndPassword();

  const {
    mutate: googleSignIn,
    isPending: isGoogleSigningIn,
    error: googleSignInError,
  } = useSignInWithGoogle();

  const demoEmail = "demo@example.com";
  const demoPassword = "password";

  const anySigningIn = isSigningIn || isGoogleSigningIn;

  const errorMessage =
    emailSignInError?.message || googleSignInError?.message || "";

  function handleDemoMode(event) {
    event.preventDefault();
    emailPasswordSignIn(
      { email: demoEmail, password: demoPassword },
      {
        onSuccess: (user) => {
          setUserLoggedIn(user);
          navigate("/dashboard");
        },
        onError: (err) => {
          console.error("Demo sign-in error:", err);
        },
      }
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    emailPasswordSignIn(
      { email, password },
      {
        onSuccess: (user) => {
          setUserLoggedIn(user);
          navigate("/dashboard");
        },
        onError: (err) => {
          console.error("Email/password sign-in error:", err);
        },
      }
    );
  }

  function handleGoogleSignIn(event) {
    event.preventDefault();
    googleSignIn(undefined, {
      onSuccess: (user) => {
        setUserLoggedIn(user);
        navigate("/dashboard");
      },
      onError: (err) => {
        console.error("Google sign-in error:", err);
      },
    });
  }

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign In
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Welcome back to TravelSync!
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <Button
          loading={anySigningIn}
          onClick={handleGoogleSignIn}
          size="sm"
          variant="outlined"
          color="blue-gray"
          className="flex items-center justify-center gap-3 mt-5"
          fullWidth
        >
          <img
            src="https://docs.material-tailwind.com/icons/google.svg"
            alt="Google"
            className="h-6 w-6"
          />
          {isGoogleSigningIn ? "Signing In..." : "Continue with Google"}
        </Button>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            type="email"
            placeholder="name@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            size="lg"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        {errorMessage && (
          <span className="text-red-600 font-bold">{errorMessage}</span>
        )}

        <Button
          type="submit"
          loading={anySigningIn}
          className="mt-6 bg-pink-400"
          fullWidth
        >
          {isSigningIn ? "Signing in..." : "Sign In"}
        </Button>

        <Button
          className="mt-6 bg-pink-400"
          onClick={handleDemoMode}
          loading={anySigningIn}
          fullWidth
        >
          {isSigningIn ? "Signing in..." : "Click here for Demo Mode"}
        </Button>

        <Typography color="gray" className="mt-4 text-center font-normal">
          Don’t have an account?{" "}
          <a href="/signup" className="font-medium text-gray-900">
            Sign Up
          </a>
        </Typography>
      </form>
    </Card>
  );
}
