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
  display:flex;
  justify-content:center;
  align-items:center;
  height:5vh;
  margin:0 auto;
`