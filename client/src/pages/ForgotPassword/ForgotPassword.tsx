import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";
import { t } from "i18next";
import { DisplaySonner } from "../../utils/utils";
import api from "../../utils/apiClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isValidCode, setIsValidCode] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const checkEmail = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(`/checkemail`, { email });
      DisplaySonner(res.data.message);
      if (res.status === 200) {
        setIsValid(true);
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
    setLoading(false);
  };

  const checkCode = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(`/checktoken`, { email, token: code });
      DisplaySonner(res.data.message);
      if (res.status === 200) {
        setIsValidCode(true);
      }
    } catch (error) {
      console.error("Error checking code:", error);
    }
    setLoading(false);
  };

  const changePassword = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setLoading(false);
      return DisplaySonner("Passwords do not match");
    }
    try {
      const res = await api.post(`/resetpassword`, { email, password });
      DisplaySonner(res.data.message);
      if (res.status === 200) {
        navigate("/Auth");
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
    setLoading(false);
  };

  return (
    <>
      {!isValid ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-full max-w-md p-4  rounded-[10px] shadow-xl">
            <Link to="/Auth">
              <ArrowBigLeft/>
            </Link>

            <h1 className="text-2xl font-semibold text-center text-black">
              {t("Forgot Password")}
            </h1>
            <p className="text-gray-500 text-center">
              {t("Enter your email to reset your password.")}
            </p>
            <form className="mt-4" onSubmit={checkEmail}>
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-600"
                >
                  {t("Email")}
                </label>
                <input
                  type="email"
                  id="email"
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {loading ? <Loading withTitle={false} /> : t("Reset Password")}
              </button>
            </form>
          </div>
        </div>
      ) : !isValidCode ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-full max-w-md p-4  rounded-[10px] shadow-xl">
            <h1 className="text-2xl font-semibold text-center text-black">
              {t("Verify")}
            </h1>
            <p className="text-gray-500 text-center">
              {t("Check your email for verification code.")}
            </p>
            <form className="mt-4" onSubmit={checkCode}>
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="code"
                  className="text-sm font-semibold text-gray-600"
                >
                  {t("Code")}
                </label>
                <input
                  type="number"
                  id="code"
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  onChange={(e) => setCode(e.target.value)}
                  min={0}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {loading ? <Loading withTitle={false} /> : t("Verify Code")}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-full max-w-md p-4 rounded-[10px] shadow-xl">
            <h1 className="text-2xl font-semibold text-center text-black">
              {t("Change Password")}
            </h1>
            <p className="text-gray-500 text-center">
              {t("Enter your new password.")}
            </p>
            <form className="mt-4" onSubmit={changePassword}>
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-600"
                >
                  {t("New Password")}
                </label>
                <input
                  type="password"
                  id="password"
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold text-gray-600"
                >
                  {t("Confirm New Password")}
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {loading ? <Loading withTitle={false} /> : t("Change password")}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
