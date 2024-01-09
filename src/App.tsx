import React, { useEffect, useState } from "react";
import "./App.css";
import MonthlyMortgageChart from "./MonthlyMortgageChart";
import {
    Chip,
    Divider,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";

import MortgageDetails from "./MortgageDetails";
import {
    getMonthlyMortgage,
    getTotalInterest,
    getTotalLoanAmount,
    MortgageDetailsType,
} from "./MortgageCalc";

// @ts-ignore
import bigLogo from "./BigIcon.png";
import DownPaymentChart from "./DownPaymentChart";

function App(): JSX.Element {
    const [housePrice, setHousePrice] = useState<number>(300000);
    const [downPercent, setDownPercent] = useState<number>(20);
    const [i, setI] = useState<number>(4.89);
    const [years, setYears] = useState<number>(20);
    const [netIncome, setNetIncome] = useState<number>(69000);
    const [mortgagePercent, setMortgagePercent] = useState<number>(30);

    const [mgDetails, setMgDetails] = useState<MortgageDetailsType>({
        housePrice: housePrice,
        downPercent: downPercent,
        i: i,
        years: years,
    });

    const [monthly, setMonthly] = useState<number>(
        getMonthlyMortgage(mgDetails),
    );
    const [totalLoan, setTotalLoan] = useState<number>(
        getTotalLoanAmount(mgDetails),
    );
    const [totalInterest, setTotalInterest] = useState<number>(
        getTotalInterest(mgDetails),
    );
    const [monthlyLimit, setMonthlyLimit] = useState<number>(
        (netIncome / 12) * (mortgagePercent / 100),
    );

    // updating mg details
    useEffect(() => {
        setMgDetails({
            housePrice: housePrice,
            downPercent: downPercent,
            i: i,
            years: years,
        });
    }, [housePrice, downPercent, i, years]);

    useEffect(() => {
        setMonthly(getMonthlyMortgage(mgDetails));
        setTotalLoan(getTotalLoanAmount(mgDetails));
        setTotalInterest(getTotalInterest(mgDetails));
    }, [mgDetails]);

    useEffect(() => {
        setMonthlyLimit((netIncome / 12) * (mortgagePercent / 100));
    }, [mortgagePercent, netIncome]);

    useEffect(() => {}, [mgDetails, monthly]);

    return (
        <div className="App">
            <div className="content">
                <Divider
                    sx={{ width: "clamp(7ch, 60%, 1000px)" }}
                    variant="middle"
                >
                    <div className="title-container">
                        <img src={bigLogo} alt={"Maxgage Logo"} />
                        <Typography variant="h1">Maxgage</Typography>
                    </div>
                </Divider>

                <div className="buttons-container">
                    <TextField
                        type="number"
                        value={housePrice}
                        label="House Price"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    CAD $
                                </InputAdornment>
                            ),
                            inputProps: { min: 0, step: 1000 },
                        }}
                        onChange={(event) =>
                            setHousePrice(parseInt(event.target.value))
                        }
                    />
                    <TextField
                        type="number"
                        value={downPercent}
                        label="Percent Down"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            ),
                        }}
                        onChange={(event) =>
                            setDownPercent(parseInt(event.target.value))
                        }
                    />
                    <TextField
                        type="number"
                        value={i}
                        label="Interest Rate"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            ),
                            inputProps: { min: 0, step: 0.01 },
                        }}
                        onChange={(event) =>
                            setI(parseFloat(event.target.value))
                        }
                    />
                    <TextField
                        type="number"
                        value={years}
                        label="Amortization"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    years
                                </InputAdornment>
                            ),
                        }}
                        onChange={(event) =>
                            setYears(parseFloat(event.target.value))
                        }
                    />

                    <TextField
                        type="number"
                        value={netIncome}
                        label="Net Income"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    CAD $
                                </InputAdornment>
                            ),
                            inputProps: { min: 0, step: 500 },
                        }}
                        onChange={(event) =>
                            setNetIncome(parseInt(event.target.value))
                        }
                    />
                    <TextField
                        type="number"
                        value={mortgagePercent}
                        label="Income to Mortgage"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            ),
                        }}
                        onChange={(event) =>
                            setMortgagePercent(parseInt(event.target.value))
                        }
                    />
                </div>
                <Divider
                    sx={{ width: "clamp(7ch, 60%, 1000px)" }}
                    variant="middle"
                >
                    <Typography variant="h2">Results</Typography>
                </Divider>

                <MortgageDetails
                    mortgageDetails={mgDetails}
                    monthly={monthly}
                    netIncome={netIncome}
                    totalLoan={totalLoan}
                    totalInterest={totalInterest}
                />

                <MonthlyMortgageChart
                    mgDetails={mgDetails}
                    monthlyLimit={monthlyLimit}
                />

                <DownPaymentChart
                    mgDetails={mgDetails}
                    monthlyLimit={monthlyLimit}
                />

                <Chip className="footer" label="Made with ❤ in Edmonton" />
                <Typography variant="overline">
                    @rudydelorenzo on github
                </Typography>
            </div>
        </div>
    );
}

export default App;
