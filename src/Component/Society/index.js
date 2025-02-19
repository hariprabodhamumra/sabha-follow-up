import React, { useEffect, useState, useRef } from "react";
import { getFirestore, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { OverlayPanel } from "primereact/overlaypanel";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";  // Add this import
import { app } from "../../firebase";
import AddSociety from "./AddSociety";
import useSnackbar from "../../hooks/useSnackbar";
import "./index.css";

const firebase = getFirestore(app);

export default function Society() {
  const [isLoading, setIsLoading] = useState(false);
  const [societyData, setSocietyData] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);
  const [selectedSociety, setSelectedSociety] = useState(null);
  const { ToastComponent, showSuccessMessage, showErrorMessage } = useSnackbar();
  const op = useRef(null);
  const [overlayData, setOverlayData] = useState(null);

  const getSocieties = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(firebase, "society"));
    setSocietyData(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setIsLoading(false);
  };

  useEffect(() => {
    getSocieties();
  }, []);

  const onAddSuccess = () => {
    setIsDialogVisible(false);
    getSocieties();
  };

  const onEditSuccess = () => {
    setIsEditDialogVisible(false);
    getSocieties();
  };

  const confirmDeleteSociety = (id) => {
    confirmDialog({
      message: 'Are you sure you want to delete?',
      header: 'Delete Society',
      accept: () => onDeleteSociety(id),
    });
  };

  const onDeleteSociety = async (id) => {
    try {
      await deleteDoc(doc(firebase, "society", id));
      showSuccessMessage("Society Deleted Successfully");
      getSocieties();
    } catch (error) {
      showErrorMessage("Error deleting society");
    }
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <div onClick={(e) => {
        setOverlayData(rowData);
        op.current.toggle(e);
      }} className="name-actions-container">
        <span>{rowData.name}</span>
      </div>
    );
  };

  const overlayTemplate = (
    <div className="overlay-menu">
      <Button
      label="Edit"
        icon="pi pi-pencil"
        className="p-button-text"
        onClick={() => {
          setSelectedSociety(overlayData);
          setIsEditDialogVisible(true);
          op.current.hide();
        }}
      />
      <Button
      
      label="Delete"
        icon="pi pi-trash"
        className="p-button-text"
        onClick={() => {
          confirmDeleteSociety(overlayData.id);
          op.current.hide();
        }}
      />
    </div>
  );

  return (
    <div className="society-container">
      <div className="header">
        <Button label="Add Society" icon="pi pi-plus" onClick={() => setIsDialogVisible(true)} />
      </div>

      <Dialog
        header="Add New Society"
        visible={isDialogVisible}
        onHide={() => setIsDialogVisible(false)}
      >
        <AddSociety societyData={societyData} onSuccess={onAddSuccess} />
      </Dialog>

      <Dialog
        header="Edit Society"
        visible={isEditDialogVisible}
        onHide={() => setIsEditDialogVisible(false)}
      >
        <AddSociety societyData={societyData} onSuccess={onEditSuccess} initialData={selectedSociety} isEditing />
      </Dialog>

      <div className="card">
        {ToastComponent}
        <DataTable
          value={societyData}
          loading={isLoading}
          lazy={true}
        >
          <Column field="name" header="Society Name" body={nameBodyTemplate}></Column>
        </DataTable>
      </div>

      <OverlayPanel ref={op}>
        {overlayTemplate}
      </OverlayPanel>

      <ConfirmDialog />
    </div>
  );
}
