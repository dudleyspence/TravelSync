import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "../../hooks/auth/useSignUp";
import { useSignInWithGoogle } from "../../hooks/auth/useGoogle";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    mutate: createUserSignUp,
    isPending: isSigningUp,
    error: signUpError,
  } = useCreateUserWithEmailAndPassword();

  const {
    mutate: googleSignIn,
    isPending: isGoogleSigningIn,
    error: googleSignInError,
  } = useSignInWithGoogle();

  const anySigningUp = isSigningUp || isGoogleSigningIn;

  const errorMessage = signUpError?.message || googleSignInError?.message || "";

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          createUserSignUp({ name, email, password });
        }}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <Button
          loading={anySigningUp}
          onClick={(event) => {
            event.preventDefault();
            googleSignIn();
          }}
          size="sm"
          variant="outlined"
          color="blue-gray"
          className="flex items-center justify-center gap-3 mt-5"
          fullWidth
        >
          <img
            src="https://docs.material-tailwind.com/icons/google.svg"
            alt="metamask"
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
            Your Name
          </Typography>
          <Input
            size="lg"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        <Checkbox
          className="bg-white"
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree to the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />

        {errorMessage && (
          <span className="text-red-600 font-bold">{errorMessage}</span>
        )}

        <Button
          className="mt-6 bg-pink-400"
          fullWidth
          type="submit"
          loading={anySigningUp}
        >
          {isSigningUp ? "Signing up..." : "Sign up"}
        </Button>

        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="/signin" className="font-medium text-gray-900">
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  );
}
