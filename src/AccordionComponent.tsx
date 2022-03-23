import React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type propTypes = {
    panelId: string,
    expanded: string | false,
    handleChange: Function,
    title: string,
    detail: string,
    description: string
}

function AccordionComponent({panelId, expanded, handleChange, detail, description, title}: propTypes) {
    return (
        <Accordion expanded={expanded === panelId} elevation={0} onChange={handleChange(panelId)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={panelId.concat("bh-content")}
                id="panel1bh-header"
            >
                <Typography sx={{ width: '50%', flexShrink: 0 }}>{title}</Typography>
                <Typography sx={{ color: 'text.secondary' , width: '50%'}}>{detail}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{description}</Typography>
            </AccordionDetails>
        </Accordion>
    );
}

export default AccordionComponent;
