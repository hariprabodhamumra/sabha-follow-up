import React, { useRef } from "react";
import { Toast } from "primereact/toast";

export default function useSnackbar() {
  const toastRef = useRef(null);

  const showMessage = (severity, message) => {
    toastRef.current.show({
      severity: severity,
      detail: message
    });
  };
  return {
    ToastComponent: <Toast ref={toastRef} />,
    showSuccessMessage: (message) => showMessage("success", message),
    showErrorMessage: (message) => showMessage("error", message),
    showInfoMessage: (message) => showMessage("info", message),
    showWarningMessage: (message) => showMessage("warning", message),
    showSecondaryMessage: (message) => showMessage("secondary", message),
    showContrastMessage: (message) => showMessage("contrast", message)
  };
}
