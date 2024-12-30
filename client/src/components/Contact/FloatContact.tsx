import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { t } from "i18next";

export default function FloatContact() {
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000); 
            return () => clearTimeout(timer);
        }
    }, [showMessage]);

    return (
        <div className="fixed bottom-8 right-8 z-40">
            {/* Popup message */}
            {showMessage && (
                <div className="w-48 absolute right-20 bottom-6 bg-gray-800 text-white text-sm p-2 rounded-lg shadow-lg">
                    {t("NovaBot is Ready to Assist!")}
                </div>
            )}
            <Link
                to="/novabot"
                className="relative rounded-full w-full h-full bg-red-900"
                onClick={() => setShowMessage(true)}
            >
                <img
                    src="/robot.png"
                    alt="Nova"
                    className="rounded-full w-16 h-16 object-cover bg-gray-400"
                />
            </Link>
        </div>
    );
}
