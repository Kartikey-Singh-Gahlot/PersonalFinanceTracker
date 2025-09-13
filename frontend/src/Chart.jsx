import {PieChart, Pie, Cell, Tooltip, Legend} from "recharts";
import "./output.css";

export default function Chart({chartData}){

    const plottingData = [
        {name:"Income", value:chartData.income.reduce((sum, val)=>{ return sum+ val.amount},0) },
        {name:"Expense", value:chartData.expense.reduce((sum, val)=>{ return sum+ val.amount},0) },
        {name:"Saving", value:chartData.saving.reduce((sum, val)=>{ return sum+ val.amount},0) }
    ];

    const colorSchema = ["green", "red", "blue"];

  return(
    <>
     <PieChart width={400} height={400} >
                <Pie data={plottingData} cx="50%" cy="50%" outerRadius={100}  dataKey="value" label>
                     {plottingData.map((entry, index)=>{
                        return <Cell stroke="black" key={`cell-${index}`} fill={colorSchema[index % colorSchema.length]}/>
                     })}
                </Pie>
                <Tooltip/>
                <Legend  wrapperStyle={{fontSize: "12px", width:"100%", textAlign:"center"}}/>
     </PieChart>
    </>
  )
}