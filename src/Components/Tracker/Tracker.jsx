import "./Tracker.scss";
import Info from "../Info/Info";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useContext, useState, useEffect } from "react";
import { mainContext } from "../Context/Context";

const Colors = [
  "#0088FE", // original blue
  "#00C49F", // original teal
  "#00BFFF", // sky blue
  "#3EB489", // mint green
  "#9370DB", // light purple
  "#FF69B4", // soft pink
  "#FF7F50", // coral
  "#FFD700", // lemon yellow
  "#E6E6FA", // lavender
  "#4682B4", // steel blue
  "#2E8B57", // sea green
  "#D3D3D3", // light gray
  "#FFE5B4", // peach
];


export default function Tracker() {
  const context = useContext(mainContext);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  const newData = [...context.data];

  const incAdd = newData.map((a) => a.income);
  const expAdd = newData.map((a) => a.expense);

  useEffect(() => {
    let inc = 0;

    for (let i of incAdd) {
      inc = Number(inc) + Number(i);
    }
    setIncome(inc);
  }, [incAdd]);

  useEffect(() => {
    let exp = 0;

    for (let i of expAdd) {
      exp = Number(exp) + Number(i);
    }
    setExpense(exp);
  }, [expAdd]);

  useEffect(() => {
    setBalance(() => import.meta.env.VITE_BALANCE + income - expense);
  }, [income, expense]);

  return (
    <>
      <div
        className="content"
        style={context.edit ? { filter: "blur(5px)" } : { filter: "none" }}
      >
        <div className="left">
          <p className="balance">
            <span style={{ color: "green" }}>
              {balance < 0
                ? "Cant spend more than your balance!"
                : "Balance: Rs:" + balance}
            </span>
          </p>
          <div className="income">
            <p style={{ fontSize: "25px", fontWeight: "600" }}>
              Rs.{!income ? 0 : income}
            </p>
            <p style={{ fontSize: "15px" }}>Total Income</p>
          </div>
          <div className="expense">
            <p style={{ fontSize: "25px", fontWeight: "600" }}>
              Rs.{!expense ? 0 : expense}
            </p>
            <p style={{ fontSize: "15px" }}>Total Expense</p>
          </div>
        </div>
        <div className="pie-chart">
          {newData.length > 0 ? (
            <PieChart
              style={{
                width: "100%",
                maxWidth: "550px",
                maxHeight: "90vh",
                aspectRatio: 1,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              responsive
              margin={{ top: 30, right: 50, bottom: 50, left: 50 }}
            >
              <Pie
                data={newData}
                dataKey="amount"
                nameKey="description"
                cx="50%"
                cy="50%"
                outerRadius="50%"
                fill="#8884d8"
              >
                {newData.map((_, index) => {
                  return (
                    <Cell
                      key={index}
                      fill={Colors[index % Colors.length]}
                    ></Cell>
                  );
                })}
              </Pie> 
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            "No Pie-Chart to show"
          )}
        </div>
      </div>
      <Info></Info>
    </>
  );
}
