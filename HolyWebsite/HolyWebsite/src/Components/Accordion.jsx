import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Accordion.css";

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <section id="accordion-section">
        <div className="nimbus-container">
          <div className="accordion-container">
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              className="accordion-element"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="accordion-icon" />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  sx={{ width: "33%", flexShrink: 0 }}
                  className="accordion-heading"
                >
                  Can I bring my own colours
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordion-text">
                  Permanent colours not allowed, you can bring regular holi
                  colours.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
              className="accordion-element"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="accordion-icon" />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography
                  sx={{ width: "33%", flexShrink: 0 }}
                  className="accordion-heading"
                >
                  Will there be Veg food?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordion-text">
                  Yes, there will be unlimited veg food available on the day of
                  the event, it is free of cost and is included in every pass.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
              className="accordion-element"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="accordion-icon" />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography
                  sx={{ width: "33%", flexShrink: 0 }}
                  className="accordion-heading"
                >
                  What kind of drinks are offered?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordion-text">
                  Customers get an option to choose between alchoholic or
                  non-alcoholic drinks at the bar. They will also get the same
                  choice for their complimentory drink.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
              className="accordion-element"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="accordion-icon" />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography
                  sx={{ width: "33%", flexShrink: 0 }}
                  className="accordion-heading"
                >
                  Need Help?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordion-text">
                  Feel free to contact us Contact:{" "}
                  <a href="tel:7338623169" className="accordian-link">
                    7338623169
                  </a>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}