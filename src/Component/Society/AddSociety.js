import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { getFirestore, collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { app } from "../../firebase";
import useSnackbar from "../../hooks/useSnackbar";
import "./AddSociety.css";

const firebase = getFirestore(app);

export default function AddSociety({ societyData, onSuccess, initialData = null, isEditing = false }) {
  const [isLoading, setIsLoading] = useState(false);
  const [societyName, setSocietyName] = useState("");
  const { ToastComponent, showSuccessMessage, showErrorMessage } = useSnackbar();

  useEffect(() => {
    if (isEditing && initialData) {
      setSocietyName(initialData.name);
    }
  }, [isEditing, initialData]);

  const checkValidation = async (societyName) => {
    if (
      societyData.find(
        (item) => item?.name?.toLowerCase() === societyName?.toLowerCase()
      )
    ) {
      showErrorMessage("Society already exists.");
      setIsLoading(false);
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    setIsLoading(true);

    const isValid = await checkValidation(societyName?.trim());
    if (isValid) {
      if (isEditing) {
        const societyRef = doc(firebase, "society", initialData.id);
        await updateDoc(societyRef, { name: societyName });
        showSuccessMessage("Society Updated Successfully");
      } else {
        const response = await addDoc(collection(firebase, "society"), {
          name: societyName
        });
        if (response.id) {
          showSuccessMessage("Society Added Successfully");
        }
      }
      setSocietyName("");
      onSuccess();
    }

    setIsLoading(false);
  };

  return (
    <div className="add-society-wrapper">
      {ToastComponent}
      <div className="flex flex-column gap-2 w-full">
        <label htmlFor="society">Society Name</label>
        <InputText
          id="society"
          aria-describedby="society-help"
          value={societyName}
          onChange={(e) => setSocietyName(e.target.value)}
        />
      </div>
      <Button
        onClick={onSubmit}
        className="w-full justify-content-center"
        disabled={societyName === "" || isLoading}
        loading={isLoading}>
        {isEditing ? "Update Society" : "Add Society"}
      </Button>
    </div>
  );
}
