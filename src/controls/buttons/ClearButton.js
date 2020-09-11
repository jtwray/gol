import React from "react";

export default function ClearButton({ clearGrid }) {
  return (
   
<button
style={{
  color: "gold",
  boxShadow: "1px 1px 1px 1px white,-1px -1px 1px 1px black",
  border: "solid 3px black",
  backgroundColor: "gold",
  textShadow: "-.74px -.74px .4px white,-.74px .74px 2.74px black",
  fontSize: "3rem",
  width: "275px",
  height: "100px",
  padding: "1rem,2rem",
  margin: "1rem",
  borderRadius: "14px",
}}
onClick={() => clearGrid()}
>
<span>Clear</span>
</button>
  );
}


