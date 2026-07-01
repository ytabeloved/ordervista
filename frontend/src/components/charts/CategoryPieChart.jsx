import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function CategoryPieChart(){

    const data={

        labels:[
            "Pizzas",
            "Bebidas",
            "Postres",
            "Otros"
        ],

        datasets:[
            {

                data:[45,25,15,15],

                backgroundColor:[
                    "#2e7d32",
                    "#43a047",
                    "#66bb6a",
                    "#a5d6a7"
                ]

            }
        ]

    };

    return <Pie data={data}/>;

}

export default CategoryPieChart;