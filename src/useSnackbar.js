import { useState, useCallback } from "react";
import { Toast } from "primereact/toast";

export default function useSnackbar() {
  const [toast, setToast] = useState(null);

  const showMessage = useCallback((message, severity) => {
    if (toast) {
      toast.show({ severity, summary: message, life: 3000 });
    }
  }, [toast]);

  const showSuccessMessage = (message) => {
    showMessage(message, "success");
  };

  const showErrorMessage = (message) => {
    showMessage(message, "error");
  };

  const ToastComponent = <Toast ref={(el) => setToast(el)} />;

  return { ToastComponent, showSuccessMessage, showErrorMessage };
}
