import React from 'react';


import './MortgageDetails.css';

import {getDownPayment, getPrincipalLoan, mortgageDetails} from "./MortgageCalc";
import AccordionComponent from "./AccordionComponent";

type propTypes = {
    mortgageDetails: mortgageDetails,
    monthly: number,
    netIncome: number,
    totalLoan: number,
    totalInterest: number
}

function MortgageDetails({ totalLoan, mortgageDetails, monthly, netIncome, totalInterest }: propTypes) {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <div className="accordion">
            <AccordionComponent
                panelId={'panel1'}
                expanded={expanded}
                handleChange={handleChange}
                title={'Down Payment'}
                detail={"CAD $ ".concat((getDownPayment(mortgageDetails)).toLocaleString('en', {maximumFractionDigits: 2, minimumFractionDigits: 2}))}
                description={"Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam."}/>
            <AccordionComponent
                panelId={'panel4'}
                expanded={expanded}
                handleChange={handleChange}
                title={'Principal Loan'}
                detail={"CAD $ ".concat((getPrincipalLoan(mortgageDetails)).toLocaleString('en', {maximumFractionDigits: 2, minimumFractionDigits: 2}))}
                description={"Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam."}/>
            <AccordionComponent
                panelId={'panel2'}
                expanded={expanded}
                handleChange={handleChange}
                title={'Monthly Mortgage Payment'}
                detail={"CAD $ ".concat((monthly).toLocaleString('en', {maximumFractionDigits: 2, minimumFractionDigits: 2}))}
                description={"Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam."}/>
            <AccordionComponent
                panelId={'panel3'}
                expanded={expanded}
                handleChange={handleChange}
                title={'% of Monthly Net'}
                detail={(((monthly / (netIncome / 12)) * 100).toLocaleString('en', {maximumFractionDigits: 2, minimumFractionDigits: 2})).concat("%")}
                description={"Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam."}/>
            <AccordionComponent
                panelId={'panel5'}
                expanded={expanded}
                handleChange={handleChange}
                title={'Total Loan Amount'}
                detail={"CAD $ ".concat((totalLoan).toLocaleString('en', {maximumFractionDigits: 2, minimumFractionDigits: 2}))}
                description={"Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam."}/>
            <AccordionComponent
                panelId={'panel6'}
                expanded={expanded}
                handleChange={handleChange}
                title={'Total Interest'}
                detail={"CAD $ ".concat((totalInterest).toLocaleString('en', {maximumFractionDigits: 2, minimumFractionDigits: 2}))}
                description={"Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam."}/>

        </div>
    );
}

export default MortgageDetails;
