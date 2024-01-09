type ChartData = {
    x: Array<number>;
    y: Array<number>;
};

type MortgageDetailsType = {
    housePrice: number;
    downPercent: number;
    i: number;
    years: number;
};

const chartTypes = {
    housePrice: "House Price",
    monthlyMortgage: "Monthly Mortgage",
    downPayment: "Down Payment",
};

function calculateDefaultInsurance(
    housePrice: number,
    downPercent: number,
): number {
    let insurancePercent;

    if (downPercent < 10) {
        insurancePercent = 4.0;
    } else if (10 <= downPercent && downPercent < 15) {
        insurancePercent = 3.1;
    } else if (15 <= downPercent && downPercent < 20) {
        insurancePercent = 2.8;
    } else {
        insurancePercent = 0;
    }

    return (
        (housePrice - housePrice * (downPercent / 100)) *
        (insurancePercent / 100)
    );
}

function getDownPayment({
    housePrice,
    downPercent,
}: MortgageDetailsType): number {
    return housePrice * (downPercent / 100);
}

function getMortgageAmount({
    housePrice,
    downPercent,
    i,
    years,
}: MortgageDetailsType) {
    return (
        housePrice -
        getDownPayment({
            housePrice,
            downPercent,
            i,
            years,
        })
    );
}

function getPrincipalLoan({
    housePrice,
    downPercent,
    i,
    years,
}: MortgageDetailsType): number {
    let defInsurance = calculateDefaultInsurance(
        housePrice,
        downPercent,
    ); /* Mortgage Default Insurance */
    let pureLoan = getMortgageAmount({
        /* Total loan amount (no insurance) */ housePrice,
        downPercent,
        i,
        years,
    });
    return pureLoan + defInsurance;
}

function getMonthlyMortgage({
    housePrice,
    downPercent,
    i,
    years,
}: MortgageDetailsType): number {
    let loanAmount = getPrincipalLoan({
        /* Total principal loan amount */ housePrice,
        downPercent,
        i,
        years,
    });
    let months = years * 12; /* Total amortization period (months) */
    let mif =
        Math.pow(Math.pow(1 + i / 100 / 2, 2), 1 / 12) -
        1; /* Periodic Interest Factor (Monthly) */

    return (loanAmount * mif) / (1 - Math.pow(1 + mif, -months));
}

function getTotalLoanAmount(mgDetails: MortgageDetailsType): number {
    return getMonthlyMortgage(mgDetails) * (mgDetails.years * 12);
}

function getTotalInterest(mgDetails: MortgageDetailsType): number {
    return (
        getTotalLoanAmount(mgDetails) -
        (mgDetails.housePrice -
            mgDetails.housePrice * (mgDetails.downPercent / 100))
    );
}

function getChartData(
    xType: string,
    yType: string,
    mortgageOptions: MortgageDetailsType,
): ChartData {
    let xData: Array<number> = [];
    let yData: Array<number> = [];

    if (
        xType === chartTypes.housePrice &&
        yType === chartTypes.monthlyMortgage
    ) {
        for (let i: number = 0; i <= 1000000; i += 1000) {
            xData.push(i);
            yData.push(
                getMonthlyMortgage({ ...mortgageOptions, housePrice: i }),
            );
        }
    } else if (
        xType === chartTypes.downPayment &&
        yType === chartTypes.monthlyMortgage
    ) {
        for (let i: number = 5; i <= 25; i += 0.5) {
            xData.push(i);
            yData.push(
                getMonthlyMortgage({ ...mortgageOptions, downPercent: i }),
            );
        }
    }

    return { x: xData, y: yData };
}

export type { MortgageDetailsType, ChartData };
export {
    getDownPayment,
    getPrincipalLoan,
    getMonthlyMortgage,
    getTotalLoanAmount,
    getTotalInterest,
    chartTypes,
    getChartData,
};
