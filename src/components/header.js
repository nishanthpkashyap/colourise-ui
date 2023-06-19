import React from "react";
import "./header.css";

export function Header() 
{
//   const [selectedValues, setSelectedValues] = useState([]);

//   function removeDuplicates(arr) {
//     return arr.filter((item, index) => arr.indexOf(item) === index);
//   }

  return (
    <div className="header">
    
        <h1 className="company_name">COLOURISE ME</h1>
        <div className="header_items">
            <a href="#carousel" rel="noreferrer" >
                Our Work
            </a>
            <a href="#colourise" rel="noreferrer">
                Colorize
            </a>
            <a href="#aboutUs" rel="noreferrer" >
                About Us
            </a>
            <a href="#contactUs" rel="noreferrer" >
                Contact Us
            </a>
        </div>
    </div>
  );
}
