import React from "react";
import styled from "styled-components";

const Color = styled.div`
  margin: auto;
  height: 100px;
  width: 100px;
  background-color: ${props => props.color};
`;

export default function ColorCombo({
  selectedPrimrayColor,
  selectedSecondaryColor
}) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex" }}>
          {selectedPrimrayColor && (
            <div style={{ margin: "1rem" }}>
              <h3>Primary Color</h3>
              <Color color={selectedPrimrayColor.value.hex} />
            </div>
          )}
          {selectedSecondaryColor && (
            <div style={{ margin: "1rem" }}>
              <h3>Secondary Color</h3>
              <div style={{ display: "inline-block" }}>
                <Color color={selectedSecondaryColor.value.hex} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
