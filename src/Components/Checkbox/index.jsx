import React from "react";
import styled from 'styled-components'

export default class CheckboxComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {checked : false}
  }

  _checkToggle = () => {
    this.setState(({checked})=>({checked:!checked}))
  }

  render() {
    const { elmt, onclick, cross } = this.props
    
    return (
      
      <StyledCheckWrapper id={elmt} onClick={(e) => onclick(e)}>
        {(cross) ? (
          <StyledIcon className="far fa-times-circle" />
        ) : (
          "- "
        )} {elmt}
      </StyledCheckWrapper>
    )
  }
}

const StyledCheckWrapper = styled.div`
  width:48%;
  font-size:13px;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  margin-left:2%;
`

const StyledIcon = styled.i`
color:black;
font-size:12px;
margin:2px;
margin-right:8px
`