import { useState } from "react";
import logo from "./logo.svg";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "./firebase";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Society from "./Component/Society";

import "./App.css";

const db = getDatabase(app);

function App() {
  // const putData = () => {
  //   set(ref(db, "users/prabodham"), {
  //     name: "Hari Prabodham",
  //     code: "1234567890",
  //     email: "hari@gmail.com"
  //   });
  // };

  // const [userName, setUserName] = useState("");
  // const [code, setCode] = useState("");

  // const addRecord = () => {
  //   set(ref(db, "users/" + userName), {
  //     name: userName,
  //     code: code
  //   });
  // };

  return (
    <PrimeReactProvider>
      {/* <div>
        Hari prabodham
        <div className="flex flex-column gap-2">
          <label htmlFor="username">Username</label>
          <InputText
            id="username"
            aria-describedby="username-help"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="username">Code</label>
          <InputText
            id="username"
            aria-describedby="username-help"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
      </div>
      <Button onClick={addRecord}>Add Record</Button> */}
      <Society />
    </PrimeReactProvider>
  );
}

export default App;
