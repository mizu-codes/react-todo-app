import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import "./AppToaster.css";
import {
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiInfo,
} from "react-icons/fi";

function AppToaster() {
  const [position, setPosition] = useState<"top-right" | "top-center">(() =>
    window.innerWidth < 640 ? "top-center" : "top-right",
  );

  useEffect(() => {
    function handleResize() {
      setPosition(window.innerWidth < 640 ? "top-center" : "top-right");
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Toaster
      position={position}
      duration={3000}
      gap={10}
      closeButton={false}
      richColors={false}
      icons={{
        success: (
          <FiCheckCircle className="app-toast__icon-svg" aria-hidden="true" />
        ),
        error: <FiXCircle className="app-toast__icon-svg" aria-hidden="true" />,
        warning: (
          <FiAlertTriangle className="app-toast__icon-svg" aria-hidden="true" />
        ),
        info: <FiInfo className="app-toast__icon-svg" aria-hidden="true" />,
      }}
      toastOptions={{
        classNames: {
          toast: "app-toast",
          title: "app-toast__title",
          icon: "app-toast__icon",
          success: "app-toast--success",
          error: "app-toast--error",
          warning: "app-toast--warning",
          info: "app-toast--info",
        },
      }}
    />
  );
}

export default AppToaster;
