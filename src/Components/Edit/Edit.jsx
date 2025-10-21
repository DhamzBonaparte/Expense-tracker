import "./edit.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useEffect, useRef } from "react";
import { mainContext } from "../Context/Context";

export default function Edit({ edit, setEdit, desc, setDesc, amt, setAmt }) {
  const context = useContext(mainContext);

  const description = useRef("");
  const amount = useRef("");

  function clear() {
    setDesc("");
    setAmt("");
  }

  function handleDesc(e) {
    description.current = e.target.value;
    setDesc(description.current);
  }

  function handleAmt(e) {
    amount.current = e.target.value;
    setAmt(amount.current);
  }

  function handleCut() {
    setEdit(false);
    clear();
  }

  function handleAdd() {
    if (desc === "") {
      alert("Must enter description!");
    } else if (amt == "") {
      alert("Must enter amount");
    } else {
      context.setData([
        ...(context.data || []),
        {
          description: desc.trim(),
          amount: parseFloat(amt),
          income: context.isIncome ? amt : 0,
          expense: !context.isIncome ? amt : 0,
          what: context.isIncome ? "income" : "expense",
        },
      ]);
    }

    setEdit(false);
    clear();
  }
  return (
    <>
      <div
        className="edit"
        style={!edit ? { display: "none" } : { display: "block" }}
      >
        <div className="top">
          <p>Add New Transaction</p>
          <button onClick={() => handleCut()}>
            <CloseIcon />
          </button>
        </div>
        <div className="mid">
          <div className="infos">
            <label htmlFor="Enter Description">Enter Description</label>
            <input
              type="text"
              placeholder="Enter Description..."
              value={desc}
              onChange={(e) => handleDesc(e)}
            />

            <label htmlFor="Enter Amount">Enter Amount</label>
            <input
              type="number"
              placeholder="Enter Transaction Amount..."
              value={amt}
              onChange={(e) => handleAmt(e)}
            />
          </div>

          <div className="selects">
            <label htmlFor="income">
              <input
                type="radio"
                name="type"
                id="income"
                defaultChecked
                onChange={() => context.setIsIncome((i) => !i)}
              />
              Income
            </label>

            <label htmlFor="expense">
              <input
                type="radio"
                name="type"
                id="expense"
                onChange={() => context.setIsIncome((i) => !i)}
              />
              Expense
            </label>
          </div>
        </div>
        <div className="bottom">
          <button onClick={() => handleCut()}>Cancel</button>
          <button onClick={() => handleAdd()}>Add</button>
        </div>
      </div>
    </>
  );
}
