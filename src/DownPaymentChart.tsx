import React, { ComponentProps } from "react";
import { getChartData, MortgageDetailsType } from "./MortgageCalc";
import { chartTypes } from "./MortgageCalc";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import "./ChartContainer.css";

Chart.register(...registerables);

function DownPaymentChart({
    mgDetails,
    monthlyLimit,
}: {
    mgDetails: MortgageDetailsType;
    monthlyLimit: number;
}): JSX.Element {
    const chartData = getChartData(
        chartTypes.downPayment,
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
                label: "Monthly Mortgage Limit (above line)",
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

    const chartOptions: ComponentProps<typeof Line>["options"] = {
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    text: "% Down",
                    display: true,
                },
                min: Math.round(5),
                max: Math.round(25),
            },
            y: {
                title: {
                    text: "Monthly Payment (incl. interest)",
                    display: true,
                },
            },
        },
        interaction: {
            mode: "nearest",
        },
        plugins: {
            tooltip: {
                callbacks: {
                    afterTitle: function (context) {
                        return `${Math.round(
                            (parseFloat(context[0].label) / 100) *
                                mgDetails.housePrice,
                        )}`;
                    },
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

export default DownPaymentChart;
