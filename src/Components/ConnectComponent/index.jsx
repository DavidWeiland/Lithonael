import React, { useState } from 'react'
import { loginAdmin } from '../../Features/admin'
import styled from 'styled-components'
import { useStore } from 'react-redux'
import colors from '../../Utils/Styles/colors'
import {Button} from '../Button'

export const Connect = () => {
  const store = useStore()
  const [ identifiant, setIdentifiant ] = useState("David")
  const [ password, setPassword ] = useState("123")
  
  const body = {
    identifiant,
    password
  }
  
  const login = () => {
    loginAdmin(store, body)
  }

  return (
    <StyledContainer>
        <StyledTitle>Lithonael</StyledTitle>
        <StyledConnectContainer>
            <StyledInput type='text' id='Identifiant' name='Identifiant' value={identifiant} onChange={(e) => setIdentifiant(e.target.value)} placeholder='Identifiant' />
            <StyledInput type='text' id='Password' name='Password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <Button style={{marginTop: '50px', minWidth:'300px'}} action={login}>Soumettre</Button>
        </StyledConnectContainer>
      </StyledContainer>
  )
}

const StyledContainer = styled.div`
  background-color: ${colors.primary};
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction : column;
  justify-content: flex-start;
  align-items: center;
  left: 0;
  top: 0 
`
const StyledConnectContainer = styled.div`
  background-color:${colors.secondary};
  display:flex;
  flex-flow:column;
  align-items:center;
  width:400px;
  height:500px;
  border-radius:10px;
  box-shadow: ${colors.boxShadowDark};
  padding-top:100px;
`
const StyledTitle = styled.h1`
  color:${colors.fontDark};
  font-family: 'Alex Brush', cursive;
  font-weight:100;
  font-size:96px;
`
const StyledInput = styled.input`
  margin-bottom: 50px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  display: flex;
  align-items: center;
  width: 300px;
  height: 50px;
  border-radius:10px;
  border:0;
  box-shadow: inset ${colors.boxShadowDark};
  background-color: ${colors.primary};
`