import React, {useEffect, useState} from 'react';
import { getMonthlyMortgage, mortgageDetails } from "./MortgageCalc";

type Props = {}

function ChartContainer(props: Props) {
    const [housePrice, setHousePrice] = useState<number>(270000);
    const [downPercent, setDownPercent] = useState<number>(20);
    const [i, setI] = useState<number>(3.04);
    const [years, setYears] = useState<number>(20);

    const [monthly, setMonthly] = useState<number>(getMonthlyMortgage({
        "housePrice": housePrice,
        "downPercent": downPercent,
        "i": i,
        "years": years
    }))

    useEffect(() => {
        setMonthly(getMonthlyMortgage({
            "housePrice": housePrice,
            "downPercent": downPercent,
            "i": i,
            "years": years
        }))
    }, [housePrice, downPercent, i, years])



    return (
        <div>
            <input type="number" value={housePrice} onChange={(event => setHousePrice(parseInt(event.target.value)))} />
            <p>{monthly}</p>
        </div>
    );
}

export default ChartContainer;