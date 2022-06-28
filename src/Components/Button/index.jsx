import React from 'react'
import styled from 'styled-components'
import colors from '../../Utils/Styles/colors'

export const Button = ({action, children}) => {

  return (
    <StyledButton onClick={action}>{children}</StyledButton>
  )
}

const StyledButton = styled.button`
  margin-top: 50px;
  font-family: 'Alegreya', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  display: flex;
  align-items: center;
  justify-content:center;
  width: 300px;
  height: 50px;
  border-radius:10px;
  border:0;
  box-shadow: ${colors.boxShadowDark};
  background-color: ${colors.quaternary};
  color:${colors.fontLight};
  cursor:pointer;
`