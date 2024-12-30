import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { DisplaySonner } from "../../utils/utils";
import { t } from "i18next";
import api from "../../utils/apiClient";
import { Input } from "../ui/input";

export default function ActivationPopup({ userId }: any) {
  const [, , removeCookie] = useCookies([import.meta.env.VITE_ACCESS_COOKIE]);

  const [activationCode, setActivationCode] = useState("");
  const [Activationmessage, setActivationMessage] = useState({
    text: "",
    status: 0,
  });
  const [cooldown, setCooldown] = useState(60);
  const [isCooldown, setIsCooldown] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (isCooldown) {
      timer = setInterval(() => {
        setCooldown((prevCooldown) => {
          if (prevCooldown <= 1) {
            clearInterval(timer);
            setIsCooldown(false);
            return 60;
          }
          return prevCooldown - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isCooldown]);

  const handleActivate = async (e: React.FormEvent, activationCode: string) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get("redirect");
    try {
      const response = await api.post(`/activateUser`, {
        userId,
        activationCode,
      });

      const responseData = response.data || {};

      DisplaySonner(responseData.message);

      setActivationMessage({
        text: responseData.message,
        status: response.status,
      });
      if (response.status === 200) {
        setTimeout(() => {
          removeCookie(import.meta.env.VITE_ACCESS_COOKIE);
          window.location.href = redirectPath
            ? `/Auth?redirect=${redirectPath}`
            : "/Auth";
        }, 3000);
      }
    } catch (error) {
      console.error("Error during activation:", error);
    }
  };

  const resendActivationCode = async () => {
    try {
      const response = await api.post(`/resendActivationCode`, { userId });
      const responseData = response.data || {};

      DisplaySonner(responseData.message);

      setIsCooldown(true);
    } catch (error) {
      console.error("Error resending activation code:", error);
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <form
        className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
        onSubmit={(e) => handleActivate(e, activationCode)}
      >
        <button
          type="button"
          onClick={reloadPage}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition duration-200"
        >
          &#10005;
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {t("Activate Your Account")}{" "}
        </h2>
        <p className="text-gray-600 mb-4">
          {t("Enter the activation code received in your email:")}
        </p>
        <Input
          id="activationCode"
          name="activationCode"
          type="text"
          value={activationCode}
          onChange={(e) => setActivationCode(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {Activationmessage.status !== 200 ? (
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {t("Activate")}
          </button>
        ) : (
          <button>{t("Redirecting to login page...")}</button>
        )}
        {Activationmessage.status !== 200 && (
          <button
            type="button"
            onClick={resendActivationCode}
            disabled={isCooldown}
            className={`mt-4 w-full px-4 py-2 text-sm font-semibold rounded-md ${
              isCooldown
                ? "text-gray-500 cursor-not-allowed"
                : "text-blue-500 hover:text-blue-600 transition duration-200"
            }`}
          >
            {isCooldown
              ? t(`Resend Code in `) + cooldown + t("s")
              : t("Resend Activation Code")}
          </button>
        )}
      </form>
    </div>
  );
}
