import React from "react";
import { getChartData, MortgageDetailsType } from "./MortgageCalc";
import { chartTypes } from "./MortgageCalc";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import "./ChartContainer.css";

Chart.register(...registerables);

function MonthlyMortgageChart({
    mgDetails,
    monthlyLimit,
}: {
    mgDetails: MortgageDetailsType;
    monthlyLimit: number;
}): JSX.Element {
    const chartData = getChartData(
        chartTypes.housePrice,
        chartTypes.monthlyMortgage,
        mgDetails,
    );

    const data = {
        labels: chartData.x,
        datasets: [
            {
                label: chartTypes.monthlyMortgage,
                fill: true,
                lineTension: 0.5,
                backgroundColor: "rgb(92,217,217)",
                borderColor: "rgb(60,157,157)",
                borderWidth: 3,
                data: chartData.y,

                pointRadius: 6,
                pointHoverRadius: 9,
            },
            {
                label: "Monthly Mortgage Limit",
                fill: true,
                lineTension: 0.5,
                backgroundColor: "rgba(224, 75, 136, 0.2)",
                borderColor: "rgba(143, 45, 86)",
                borderWidth: 3,
                borderDash: [15, 15],
                data: chartData.y.map(() => {
                    return monthlyLimit;
                }),

                pointRadius: 0,
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    text: "Home Price (before taxes)",
                    display: true,
                },
                min: (Math.round(mgDetails.housePrice - 25000) / 10) * 10,
                max: (Math.round(mgDetails.housePrice + 25000) / 10) * 10,
                ticks: {
                    // forces step size to be 1000 units
                    stepSize: 2500,
                },
            },
            y: {
                title: {
                    text: "Monthly Payment (incl. interest)",
                    display: true,
                },
            },
        },
    };

    return (
        <div className="chart">
            <Line data={data} options={chartOptions} />
        </div>
    );
}

export default MonthlyMortgageChart;
