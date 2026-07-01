import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

function SalesBarChart() {

    const data = {

        labels: ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],

        datasets:[
            {
                label:"Ventas",
                data:[180,220,160,300,280,450,380],
                backgroundColor:"#2e7d32",
                borderRadius:8
            }
        ]

    };

    const options={

        responsive:true,

        maintainAspectRatio:false,

        plugins:{
            legend:{
                display:false
            }
        }

    };

    return <Bar data={data} options={options}/>;

}

export default SalesBarChart;