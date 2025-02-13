import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {
  getFirestore,
  collection,
  addDoc
  // query,
  // where,
  // getDocs
} from "firebase/firestore";
import { app } from "../../firebase";
import useSnackbar from "../../hooks/useSnackbar";
import "./AddSociety.css";

const firebase = getFirestore(app);

export default function AddSociety({ societyData, onAddSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [societyName, setSocietyName] = useState("");
  const { ToastComponent, showSuccessMessage, showErrorMessage } =
    useSnackbar();

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
    // const societyRef = collection(firebase, "society");
    // const societyQuery = query(societyRef, where("name", "==", societyName));
    // const querySnapshot = await getDocs(societyQuery);
    // if (!querySnapshot.empty) {
    //   showErrorMessage("Society already exists.");
    //   setIsLoading(false);
    //   return false;
    // }
    // return true;
  };

  const onAddSociety = async () => {
    setIsLoading(true);

    const isValid = await checkValidation(societyName?.trim());
    if (isValid) {
      const response = await addDoc(collection(firebase, "society"), {
        name: societyName
      });
      if (response.id) {
        showSuccessMessage("Society Added Successfully");
        setSocietyName("");
        onAddSuccess();
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="add-society-wrapper">
      {ToastComponent}
      <div className="flex flex-column gap-2 w-full">
        <label htmlFor="scociety">Scociety Name</label>
        <InputText
          id="scociety"
          aria-describedby="scociety-help"
          value={societyName}
          onChange={(e) => setSocietyName(e.target.value)}
        />
      </div>
      <Button
        onClick={onAddSociety}
        className="w-full justify-content-center"
        disabled={societyName === "" || isLoading}
        loading={isLoading}>
        Add Society
      </Button>
    </div>
  );
}
