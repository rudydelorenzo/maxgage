type ChartData = {
    x: Array<number>,
    y: Array<number>
}

type mortgageDetails = {
    housePrice: number,
    downPercent: number,
    i: number,
    years: number
}

let chartTypes = {
    housePrice: "House Price",
    monthlyMortgage: "Monthly Mortgage"
}

function calculateDefaultInsurance(housePrice: number, downPercent: number) : number {
    let insurancePercent;

    if (downPercent < 10) {
        insurancePercent = 4.00;
    } else if (10 <= downPercent && downPercent < 15) {
        insurancePercent = 3.10;
    } else if (15 <= downPercent && downPercent < 20) {
        insurancePercent = 2.80;
    } else {
        insurancePercent = 0;
    }

    return (housePrice - (housePrice * (downPercent/100))) * (insurancePercent/100)
}

function getMonthlyMortgage({housePrice, downPercent, i, years} : mortgageDetails) : number {
    let defInsurance = calculateDefaultInsurance(housePrice, downPercent);  /* Mortgage Default Insurance */
    let pureL = housePrice - (housePrice * (downPercent/100));              /* Total loan amount (no insurance) */
    let L = pureL + defInsurance                                            /* Total loan amount */
    let c = (i/100)/12                                                      /* Monthly Interest Rate */
    let n = years * 12                                                      /* Total amortization period (months) */

    return (L * (c * Math.pow((1 + c), n)))/(Math.pow((1 + c), n) - 1)
}

function getChartData(xType: string, yType: string, mortgageOptions: mortgageDetails) : ChartData {
    let xData: Array<number> = [];
    let yData: Array<number> = [];

    if (xType === chartTypes.housePrice && yType === chartTypes.monthlyMortgage) {
        for (let i:number = 0; i <= 1000000; i += 1000){
            xData.push(i);
            yData.push(getMonthlyMortgage({...mortgageOptions, housePrice: i})
            );
        }
    }

    return {x: xData, y: yData}
}

/* console.log(getChartData(chartTypes.housePrice, chartTypes.monthlyMortgage, {
    housePrice: 270000,
    downPercent: 20,
    i: 3.04,
    years: 20
})); */

export type { mortgageDetails , ChartData};
export { getMonthlyMortgage , chartTypes, getChartData };
