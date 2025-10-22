import { useContext, useEffect, useState } from "react";
import "./Info.scss";
import { mainContext } from "../Context/Context";

export default function Info() {
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  const context = useContext(mainContext);
  const newData = [...context.data];

  useEffect(() => {
    setExpenseData(newData.filter((s) => s.income == 0));
    setIncomeData(newData.filter((s) => s.expense == 0));
  }, [newData]);

  return (
    <>
      <div
        className="info"
        style={context.edit ? { filter: "blur(5px)" } : { filter: "blur(0px" }}
      >
        <div className="left">
          <p style={{ color: "red" }}>Expense</p>
          <ul type="none">
            {expenseData.length === 0 ? (
              "No Expenses"
            ) : (
              <>
                {expenseData.map((items, id) => {
                  return (
                    <div className="inside" key={id}>
                      <li key={id}>
                        <div className="leftt">{items.description}</div>
                        <div className="rightt" style={{ color: "red" }}>
                          {" "}
                          Rs.
                          {items.amount}
                        </div>
                      </li>
                    </div>
                  );
                })}
              </>
            )}
          </ul>
        </div>
        <div className="right">
          <p style={{ color: "green" }}>Income</p>
          <ul type="none">
            {incomeData.length === 0 ? (
              "No Incomes"
            ) : (
              <>
                {incomeData.map((items, id) => {
                  return (
                    <div className="inside" key={id}>
                      <li  >
                        <div className="leftt">{items.description}</div>
                        <div className="rightt" style={{ color: "green" }}>
                          Rs.
                          {items.amount}
                        </div>
                      </li>
                    </div>
                  );
                })}
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
