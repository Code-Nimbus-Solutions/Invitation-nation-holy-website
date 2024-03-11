import React, { useState } from "react";
import "./Accordion.css"; // Create this CSS file to style the accordion as per your design

function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderedItems = items.map((item, index) => {
    const isActive = index === activeIndex ? "active" : "";

    return (
      <div key={index} className="accordion-item">
        <div
          className={`accordion-title ${isActive}`}
          onClick={() => onTitleClick(index)}
        >
          {item.title}
        </div>
        <div className={`accordion-content ${isActive}`}>{item.content}</div>
      </div>
    );
  });

  return <div className="accordion">{renderedItems}</div>;
}

export default Accordion;
