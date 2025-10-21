import Tracker from "../Tracker/Tracker";
import Edit from "../Edit/Edit";
import "./main.scss";
import { mainContext } from "../Context/Context";
import { useEffect, useState } from "react";

export default function Main() {
  const [edit, setEdit] = useState(false);
  const [desc, setDesc] = useState("");
  const [amt, setAmt] = useState("");
  const [data,setData]=useState([]);
  const [isIncome,setIsIncome]=useState(true);

  useEffect(() => {
    document.body.style.overflow = edit ? "hidden" : "auto";
  }, [edit]);


  function handleTransaction() {
    setEdit(true);
  }

  return (
    <>
      <mainContext.Provider value={{ edit, setEdit,data, setData,isIncome,setIsIncome}}>
        <div
          className="navbar"
          style={edit ? { filter: "blur(3px)" } : { filter: "none" }}
        >
          <div className="left">
            <h1>Expense Tracker</h1>
          </div>
          <div className="spare"></div>
          <div className="spare"></div>
          <div className="spare"></div>
          <div className="right">
            <button onClick={() => handleTransaction()}>
              Add New Transaction
            </button>
          </div>
        </div>
        <Tracker></Tracker>
        <Edit
          edit={edit}
          setEdit={setEdit}
          desc={desc}
          setDesc={setDesc}
          amt={amt}
          setAmt={setAmt}
        />
      </mainContext.Provider>
    </>
  );
}
