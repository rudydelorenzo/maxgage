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

const getPropertyFromLocalStorage = (
    storageKey: string,
    property: string,
): number | undefined => {
    const val = JSON.parse(window.localStorage.getItem(storageKey) ?? "{}")[
        property
    ];

    if (val == null) return undefined;

    return parseFloat(val);
};

const MORTGAGE_DATA_LS_KEY = "MORTGAGE_DATA";
const INCOME_DATA_LS_KEY = "INCOME_DATA";

function App(): JSX.Element {
    const [housePrice, setHousePrice] = useState<number>(
        getPropertyFromLocalStorage(MORTGAGE_DATA_LS_KEY, "housePrice") ??
            300000,
    );
    const [downPercent, setDownPercent] = useState<number>(
        getPropertyFromLocalStorage(MORTGAGE_DATA_LS_KEY, "downPercent") ?? 20,
    );
    const [i, setI] = useState<number>(
        getPropertyFromLocalStorage(MORTGAGE_DATA_LS_KEY, "i") ?? 4.89,
    );
    const [years, setYears] = useState<number>(
        getPropertyFromLocalStorage(MORTGAGE_DATA_LS_KEY, "years") ?? 20,
    );
    const [netIncome, setNetIncome] = useState<number>(
        getPropertyFromLocalStorage(INCOME_DATA_LS_KEY, "netIncome") ?? 69000,
    );
    const [mortgagePercent, setMortgagePercent] = useState<number>(
        getPropertyFromLocalStorage(INCOME_DATA_LS_KEY, "mortgagePercent") ??
            30,
    );

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
        const pack: MortgageDetailsType = {
            housePrice: housePrice,
            downPercent: downPercent,
            i: i,
            years: years,
        };
        setMgDetails(pack);

        window.localStorage.setItem(MORTGAGE_DATA_LS_KEY, JSON.stringify(pack));
    }, [housePrice, downPercent, i, years]);

    useEffect(() => {
        setMonthly(getMonthlyMortgage(mgDetails));
        setTotalLoan(getTotalLoanAmount(mgDetails));
        setTotalInterest(getTotalInterest(mgDetails));
    }, [mgDetails]);

    useEffect(() => {
        setMonthlyLimit((netIncome / 12) * (mortgagePercent / 100));

        window.localStorage.setItem(
            INCOME_DATA_LS_KEY,
            JSON.stringify({ netIncome, mortgagePercent }),
        );
    }, [mortgagePercent, netIncome]);

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
                            inputProps: { min: 0, step: 0.1 },
                        }}
                        onChange={(event) =>
                            setDownPercent(parseFloat(event.target.value))
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

                <Divider
                    sx={{ width: "clamp(7ch, 60%, 1000px)", margin: "2rem 0" }}
                    variant="middle"
                >
                    <Typography variant="h4">
                        Mortgage vs. Purchase Price
                    </Typography>
                </Divider>

                <MonthlyMortgageChart
                    mgDetails={mgDetails}
                    monthlyLimit={monthlyLimit}
                />

                <Divider
                    sx={{ width: "clamp(7ch, 60%, 1000px)", margin: "2rem 0" }}
                    variant="middle"
                >
                    <Typography variant="h4">
                        Mortgage vs. Down Payment
                    </Typography>
                </Divider>

                <DownPaymentChart
                    mgDetails={mgDetails}
                    monthlyLimit={monthlyLimit}
                    setDown={setDownPercent}
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
