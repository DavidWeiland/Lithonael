import React from "react";
import styled from "styled-components";

export default class ListComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state={}
  }

  render() {
    const { name } = this.props

    return (
      <StyledUl>
        {name.map((tag, index) =>
          <StyledLi key={`${tag}-${index}`}>{tag}</StyledLi>
        )}
      </StyledUl>
    )
  }

}

const StyledUl = styled.ul`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
`
const StyledLi = styled.li`
  width: 25%;
`