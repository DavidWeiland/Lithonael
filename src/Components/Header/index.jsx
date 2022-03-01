import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector, useStore } from 'react-redux'
import { selectAdmin } from '../../Utils/selectors'
import { loginAdmin, resetAdmin } from '../../Features/admin'

export default function Header() {
  const store = useStore()

  const [ identifiant, setIdentifiant ] = useState("David")
  const [ password, setPassword ] = useState("123")

  const admin = useSelector(selectAdmin)
  const adminId = admin.data?.adminId

  const body = {
    identifiant,
    password
  }

  const login = () => {
    loginAdmin(store, body)
  }

  const reset = () => {
    resetAdmin(store)
  }

  return (
    <div style={{display:'flex', flexFlow:'column wrap'}}>
      {(adminId) ? (
        <StyledConnectContainer>
          <StyledTitle>Bonjour {admin.data?.name},</StyledTitle>
          <StyledButton onClick={reset}>Se déconnecter</StyledButton>
        </StyledConnectContainer>
        ):(
        <StyledConnectContainer>
            <StyledTitle>Connectez-vous : </StyledTitle>
            <StyledInput type='text' id='Identifiant' name='Identifiant' value={identifiant} onChange={(e) => setIdentifiant(e.target.value)} placeholder='Identifiant' />
            <StyledInput type='text' id='Password' name='Password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <StyledButton onClick={login}>Se connecter</StyledButton>
        </StyledConnectContainer>
      )}
      <StyledNavContainer>
        <NavLink to='/' end style={({isActive}) => isActive ? activeStyle : inactiveStyle }>Accueil</NavLink>
        <NavLink to='/wikigems' end style={({isActive}) => isActive ? activeStyle : inactiveStyle }>WikiGems</NavLink>
        <NavLink to='/admin' end style={({isActive}) => isActive ? activeStyle : inactiveStyle }>AdminApp</NavLink>
        <NavLink to='/admin/gemcreator' end style={({isActive}) => isActive ? activeStyle : inactiveStyle }>GemCreator</NavLink>
      </StyledNavContainer>
    </div>
  )
}

const StyledConnectContainer = styled.div`
  background-color:black;
  display:flex;
  flexFlow:row wrap;
  justify-content: flex-end;
  align-items:center;
`
const StyledTitle = styled.h1`
  font-size:15px;
  color:white;
`
const StyledInput = styled.input`
  height:15px;
  width:150px;
  margin:5px;
  font-size:12px;
`
const StyledButton = styled.button`
  width:150px;
  margin:10px 5px;
  font-size:12px;
`

const StyledNavContainer = styled.nav`
  background-color:black;
  display:flex;
  flexFlow:row wrap;
  justify-content: space-between;
  align-items:center;
  flex:1;
`
const activeStyle = {
    height:'25px',
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
    flex:1,
    border:'solid grey 1px',
    borderBottom: 'solid transparent 1px',
    borderRadius:'10px 0 0 0',
    textDecoration:'none',
    color:'black',
    backgroundColor:'white',
}

const inactiveStyle = {
    backgroundColor:'#f6f6f6',
    height:'25px',
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
    flex:1,
    border: 'solid grey 1px',
    borderBottom: 'solid grey 1px',
    borderRadius:'10px 0 0 0',
    textDecoration:'none',
    color: 'grey',
}