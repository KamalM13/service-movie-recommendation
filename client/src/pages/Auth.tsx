import { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { DisplaySonner } from "../utils/utils";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useTheme } from "../main";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "../components/Loading/Loading";
import { t } from "i18next";
import ActivationPopup from "../components/ActivationPopup/ActivationPopup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { GoogleLogin } from "@react-oauth/google";
import OrDivider from "../components/Others/OrDivider";
import api from "../utils/apiClient";

export default function Auth() {
  const { theme } = useTheme();
  const [isSignIn, setIsSignIn] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [, setCookies] = useCookies([import.meta.env.VITE_ACCESS_COOKIE]);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [isAccountActivationVisible, setIsAccountActivationVisible] =
    useState(false);
  const params = new URLSearchParams(window.location.search);

  const [isLoading, setIsLoading] = useState(false);
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (!firstName || !email || !phone || !password || !confirmPassword) {
      DisplaySonner("Please fill all fields");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      DisplaySonner("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!agree) {
      DisplaySonner("Please agree to the terms of service and privacy policy");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/user", {
        firstName,
        lastName,
        email,
        phone,
        password,
      });
      if (response.status === 201) {
        setUserId(response.data.UserID);
        setIsAccountActivationVisible(true);
      }
      DisplaySonner(response.data.message);
    } catch (err) {
      DisplaySonner((err as any).response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get("redirect");
    try {
      const response = await api.post("/user/login", {
        email,
        password,
      });
      DisplaySonner(response.data.message);
      if (response.status === 200) {
        setCookies("access_token", response.data.token, {
          secure: true,
          path: "/",
          sameSite: "strict",
          maxAge: rememberMe ? 60 * 60 * 24 * 7 : 60 * 60, // 7 Days - 1 Day
        });

        window.location.href = redirectPath || "/";
      } else if (response.status === 202) {
        setUserId(response.data.UserID);
        setIsAccountActivationVisible(true);
      }
    } catch (err) {
      DisplaySonner((err as any).response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async (response: any) => {
    setIsLoading(true);
    console.log(response);
    try {
      const googleResponse = await api.post("/googleLogin", {
        token: response.credential,
      });
      DisplaySonner(googleResponse.data.message);
      if (googleResponse.status === 200) {
        setCookies("access_token", googleResponse.data.token, {
          secure: true,
          path: "/",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7, // 7 Days
        });
        window.location.href = "/";
      } else if (googleResponse.status === 202) {
        setUserId(googleResponse.data.UserID);
        setIsAccountActivationVisible(true);
      }
    } catch (err) {
      DisplaySonner((err as any).response.data.message);
    }
    setIsLoading(false);
  };

  const responseMessage = (response: any) => {
    DisplaySonner(response);
  };

  const errorMessage = (response: any) => {
    DisplaySonner(response);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 lg:px-8  py-16">
      <div className="sm:mx-auto w-full sm:max-w-md">
        <div
          className={`px-6 pt-10 pb-12 sm:rounded-lg sm:px-10  shadow-light bg-neutral-800
          `}
        >
          <div className="space-y-6 ">
            {params.get("redirect") && (
              <div className="text-center bg-red-900 rounded-lg p-2">
                <p className="text-sm text-white">
                  {t("You need to sign in to continue")}
                </p>
              </div>
            )}
            <div>
              <nav className="-mb-px flex justify-center space-x-8">
                <button
                  type="button"
                  className={`border-b-2 pb-4 text-sm font-medium ${
                    isSignIn
                      ? "border-primary "
                      : "border-transparent text-muted-foreground hover:border-muted"
                  }`}
                  onClick={() => setIsSignIn(true)}
                >
                  {t("Sign in")}
                </button>
                <button
                  type="button"
                  className={`border-b-2 pb-4 text-sm font-medium ${
                    !isSignIn
                      ? "border-primary"
                      : "border-transparent text-muted-foreground hover:border-muted"
                  }`}
                  onClick={() => setIsSignIn(false)}
                >
                  {t("Sign up")}
                </button>
              </nav>
            </div>
            {isSignIn ? (
              <>
                <form className="space-y-6" onSubmit={handleSignIn}>
                  <div>
                    <Label htmlFor="email">{t("Email")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="email"
                      required
                      className="mt-2 text-black"
                      placeholder="johndoe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">{t("Password")}</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showSignInPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className="mt-2 text-black"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-2"
                        onClick={() =>
                          setShowSignInPassword(!showSignInPassword)
                        }
                      >
                        {showSignInPassword ? (
                          <FaEyeSlash
                            fill={theme === "dark" ? "#fff" : "#000"}
                          />
                        ) : (
                          <FaEye fill={theme === "dark" ? "#fff" : "#000"} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      className="mr-2"
                      id="rememberMe"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="rememberMe" className="text-sm">
                      {t("Remember me")}
                    </label>

                    <Link
                      to={"/forgot-password"}
                      className="text-blue-500 ml-auto text-sm"
                    >
                      {t("Forgot password?")}
                    </Link>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loading withTitle={true} /> : t("Sign in")}
                  </Button>

                  <p className="text-center text-sm mt-4">
                    {t("Don't have an account?")}{" "}
                    <Link
                      to="/auth"
                      className="text-blue-500"
                      onClick={() => setIsSignIn(false)}
                    >
                      {t("Sign up")}
                    </Link>
                  </p>
                </form>
                <OrDivider />
                <div className="flex justify-center items-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSignIn}
                    onError={() => errorMessage(responseMessage)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSignIn}
                    onError={() => errorMessage(responseMessage)}
                  />
                </div>
                <OrDivider />
                <form className="space-y-6" onSubmit={handleSignUp}>
                  <div>
                    <Label htmlFor="firstname">{t("First Name")}</Label>
                    <Input
                    
                      id="firstname"
                      name="firstname"
                      type="text"
                      autoComplete="firstname"
                      required
                      className="mt-2 text-black"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">{t("Last Name")}</Label>
                    <Input
                      id="lastname"
                      name="lastname"
                      type="text"
                      autoComplete="lastname"
                      required
                      className="mt-2 text-black"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t("Email address")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="mt-2 text-black"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t("Phone Number")}</Label>
                    <PhoneInput
                      country={"eg"}
                      enableSearch={true}
                      value={phone}
                      placeholder="+1 (123) 456-7890"
                      onChange={(value) => setPhone(value)}
                      inputStyle={{
                        flex: 1,
                        height: "2.5rem",
                        width: "100%",
                        borderRadius: "0.375rem",
                        border: "1px solid #d1d5db",
                        backgroundColor: "#fff",
                        fontSize: "0.875rem",
                      }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">{t("Password")}</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="mt-2 text-black"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">
                      {t("Confirm Password")}
                    </Label>
                    <Input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="mt-2 text-black"
                      placeholder={t("Confirm Password")}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <input
                    type="checkbox"
                    id="agree"
                    name="agree"
                    className="mr-2"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <label
                    htmlFor="agree"
                    className="text-sm text-muted-foreground"
                  >
                    {t("By signing up, you agree to our")}{" "}
                    <Link to="/terms-service" className="text-blue-500">
                      {t("Terms of Service")}
                    </Link>{" "}
                    {t("and")}{" "}
                    <Link to="/privacy-policy" className="text-blue-500">
                      {t("Privacy Policy")}
                    </Link>
                    .
                  </label>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loading withTitle={true} /> : t("Sign up")}
                  </Button>

                  <p className="text-center text-sm mt-4">
                    {t("Already have an account?")}{" "}
                    <Link
                      to="/auth"
                      className="text-blue-500"
                      onClick={() => setIsSignIn(true)}
                    >
                      {t("Sign in")}
                    </Link>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      {isAccountActivationVisible && <ActivationPopup userId={userId} />}
    </div>
  );
}
