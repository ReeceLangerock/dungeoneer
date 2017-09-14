import React from "react";
import styled from "styled-components";

const CurrentHealthContainer = styled.div``;

const MaxHealthContainer = styled.div``;

export class ExpBar extends React.Component {
  render() {
    return (
      <div>
        <MaxHealthContainer>
          <CurrentHealthContainer />
        </MaxHealthContainer>
      </div>
    );
  }
}
export default ExpBar;
