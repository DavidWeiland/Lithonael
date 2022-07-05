import React from 'react'
import styled from 'styled-components'
import colors from '../../Utils/Styles/colors'

export const Button = ({style, action, children}) => {

  return (
    <StyledButton style={style} onClick={action}>{children}</StyledButton>
  )
}

const StyledButton = styled.button`
  font-weight: 400;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content:center;
  max-width: 300px;
  height: 50px;
  border-radius:10px;
  border:0;
  box-shadow: ${colors.boxShadowDark};
  background-color: ${colors.quaternary};
  color:${colors.fontLight};
  cursor:pointer;
`