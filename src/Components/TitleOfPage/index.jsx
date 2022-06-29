import React from 'react'
import styled from 'styled-components'

export const TitleOfPage = ({children}) => {
  return (
    <StyledTitle>{children}</StyledTitle>
  )
}
const StyledTitle = styled.h1`
  width:100%;
  font-family:'alex brush';
  text-align:center
  
`