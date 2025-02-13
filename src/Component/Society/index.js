import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { app } from "../../firebase";
import AddSociety from "./AddSociety";
import "./index.css";

const firebase = getFirestore(app);

export default function Society() {
  const [isLoading, setIsLoading] = useState(false);
  const [societyData, setSocietyData] = useState([]);

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

  return (
    <div>
      <AddSociety societyData={societyData} onAddSuccess={getSocieties} />
      <div className="card">
        <DataTable
          value={societyData}
          tableStyle={{ minWidth: "50rem" }}
          loading={isLoading}
          lazy={true}>
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Scociety Name"></Column>
        </DataTable>
      </div>
    </div>
  );
}
