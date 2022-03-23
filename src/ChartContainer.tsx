import React, { useEffect, useState } from 'react';
import {getMonthlyMortgage, getChartData, getTotalLoanAmount, getTotalInterest} from "./MortgageCalc";
import { chartTypes, ChartData, mortgageDetails } from "./MortgageCalc";
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import './ChartContainer.css'

// @ts-ignore
import bigLogo from './BigIcon.png';

import {Chip, Divider, InputAdornment, TextField, Typography} from "@mui/material";
import MortgageDetails from "./MortgageDetails";

Chart.register(...registerables);

type Props = {}

function ChartContainer(props: Props) {
    const [housePrice, setHousePrice] = useState<number>(270000);
    const [downPercent, setDownPercent] = useState<number>(20);
    const [i, setI] = useState<number>(3.04);
    const [years, setYears] = useState<number>(20);

    const [mgDetails, setMgDetails] = useState<mortgageDetails>({
        "housePrice": housePrice,
        "downPercent": downPercent,
        "i": i,
        "years": years
    })

    const [monthly, setMonthly] = useState<number>(getMonthlyMortgage(mgDetails))
    const [totalLoan, setTotalLoan] = useState<number>(getTotalLoanAmount(mgDetails))
    const [totalInterest, setTotalInterest] = useState<number>(getTotalInterest(mgDetails))

    const [chartData, setChartData] = useState<ChartData>(getChartData(chartTypes.housePrice, chartTypes.monthlyMortgage, mgDetails))

    useEffect(() => {
        setMgDetails({
            "housePrice": housePrice,
            "downPercent": downPercent,
            "i": i,
            "years": years
        })
    }, [housePrice, downPercent, i, years])

    useEffect(() => {
        setMonthly(getMonthlyMortgage(mgDetails));
        setTotalLoan(getTotalLoanAmount(mgDetails));
        setTotalInterest(getTotalInterest(mgDetails));

        setChartData(getChartData(chartTypes.housePrice, chartTypes.monthlyMortgage, mgDetails));
    }, [mgDetails]);

    useEffect(() => {

    }, [mgDetails, monthly])

    const [netIncome, setNetIncome] = useState<number>(51000)
    const [mortgagePercent, setMortgagePercent] = useState<number>(30)

    const data = {
        labels: chartData.x,
        datasets: [
            {
                label: chartTypes.monthlyMortgage,
                fill: true,
                lineTension: 0.5,
                backgroundColor: 'rgb(92,217,217)',
                borderColor: 'rgb(60,157,157)',
                borderWidth: 3,
                data: chartData.y,

                pointRadius: 6,
                pointHoverRadius: 9
            },
            {
                label: "Monthly Mortgage Limit",
                fill: true,
                lineTension: 0.5,
                backgroundColor: 'rgba(224, 75, 136, 0.2)',
                borderColor: 'rgba(143, 45, 86)',
                borderWidth: 3,
                borderDash: [15, 15],
                data: chartData.y.map(() => {return (netIncome/12) * (mortgagePercent / 100)}),

                pointRadius: 0
            }
        ],

    }

    const chartOptions = {
        maintainAspectRatio: false,
        scales: {
            x: {
                min: (Math.round(housePrice - 25000)/10) * 10,
                max: (Math.round(housePrice + 25000)/10) * 10,
                ticks: {
                    // forces step size to be 1000 units
                    stepSize: 2500
                }
            }
        }
    }


    return (
        <div className="content">

            <Divider sx={{width: "clamp(7ch, 60%, 1000px)"}} variant='middle'>
                <div className='title-container'>
                    <img src={bigLogo} alt={'Maxgage Logo'}/>
                    <Typography variant="h1" >Maxgage</Typography>
                </div>

            </Divider>

            <div className="buttons-container">
                <TextField type="number" value={housePrice} label="House Price" InputProps={{ startAdornment: <InputAdornment position="start">CAD $</InputAdornment>, inputProps: { min: 0, step: 1000 }}} onChange={(event => setHousePrice(parseInt(event.target.value)))}/>
                <TextField type="number" value={downPercent} label="Percent Down" InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment>}} onChange={(event => setDownPercent(parseInt(event.target.value)))} />
                <TextField type="number" value={i} label="Interest Rate" InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment>, inputProps: { min: 0, step: .01 }}} onChange={(event => setI(parseFloat(event.target.value)))} />
                <TextField type="number" value={years} label="Amortization" InputProps={{ endAdornment: <InputAdornment position="end">years</InputAdornment>}} onChange={(event => setYears(parseFloat(event.target.value)))} />

                <TextField type="number" value={netIncome} label="Net Income" InputProps={{ startAdornment: <InputAdornment position="start">CAD $</InputAdornment>, inputProps: { min: 0, step: 500 }}} onChange={(event => setNetIncome(parseInt(event.target.value)))} />
                <TextField type="number" value={mortgagePercent} label="Income to Mortgage" InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment>}} onChange={(event => setMortgagePercent(parseInt(event.target.value)))} />
            </div>
            <Divider sx={{width: "clamp(7ch, 60%, 1000px)"}} variant='middle'>
                <Typography variant="h2" >Results</Typography>
            </Divider>

            <MortgageDetails mortgageDetails={mgDetails} monthly={monthly} netIncome={netIncome} totalLoan={totalLoan} totalInterest={totalInterest}/>

            <div className="chart">
                <Line data={data}
                      options={chartOptions}/>
            </div>

            <Chip className="footer" label="Made with ❤ in Edmonton"/>
            <Typography variant="overline">@rudydelorenzo on github</Typography>
        </div>
    );
}

export default ChartContainer;
