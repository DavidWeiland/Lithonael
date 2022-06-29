import React, {useEffect} from 'react'
import styled from "styled-components";
import { useNavigate, NavLink } from 'react-router-dom'
import { useSelector, useStore } from 'react-redux'
import { selectAdmin } from '../../Utils/selectors'
import { resetAdmin } from '../../Features/admin'
import { getAllGems } from "../../Features/gems";
import { Connect } from '../ConnectComponent';
import colors from '../../Utils/Styles/colors';

export const Menu = () => {
  const store = useStore()
  const admin = useSelector(selectAdmin)
  const adminId = admin.data?.adminId
  const navigate = useNavigate()

  // récupère les gems
  useEffect(() => {
    getAllGems(store)
  }, [ store ])
  
  const reset = () => {
    resetAdmin(store)
    navigate('/')
  }
  
  //connexion component
  if (!adminId) {
    return (
      <Connect/>
    )
  }
  
  return (
    <StyledContainer>
      <StyledTitle>Lithonael</StyledTitle>
      <StyledNavList>
        {/*nav to Dashboard page*/}
        <NavLink to='/dashboard' end style={({isActive}) => isActive ? activeStyle : inactiveStyle }>
          <i className="fas fa-chart-bar" />
        </NavLink>
        {/*nav to Orders Manager page*/}
        <NavLink to='/orders' end style={({isActive}) => isActive ? activeStyle : inactiveStyle }>
          <i className="fas fa-shopping-bag" />
        </NavLink>
        {/*nav to Jewels Manager page*/}
        <NavLink to='/jewelry' end style={({isActive}) => isActive ? activeStyle : inactiveStyle }>
          <i className="fas fa-store" />
        </NavLink>
        {/*nav to Gems Manager page*/}
        <NavLink to='/wikigems' end style={({isActive}) => isActive ? activeStyle : inactiveStyle }>
          <i className="fas fa-gem" />
        </NavLink>
        {/*nav to Users Manager page*/}
        <NavLink to='/admin' end style={({isActive}) => isActive ? activeStyle : inactiveStyle }>
          <i className="fas fa-users-cog" />
        </NavLink>
        {/*Displays Connexion module*/}
        <StyledButton onClick={reset}><i className="fas fa-sign-out-alt" /></StyledButton>
      </StyledNavList>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  margin: 0;
  width: 15%;
  height: 100vh;
  background: ${colors.secondary};
  display:flex;
  flex-direction:column;
  justify-content :center;
  align-items:center;
  position:relative;
  top:0;
  left:0;
`
const StyledNavList = styled.div`
  display:flex;
  flex-direction:column;
  justify-content :space-between;
  max-height:80vh;
`
const StyledButton = styled.button`
  width:50px;
  height:50px;
  margin:75% auto;
  border:0;
  background-color:transparent;
  font-size:30px;
  cursor:pointer;
  color:${colors.fontLight};
`

const StyledTitle = styled.h1`
  width: 95%;
  height: auto;
  font-family: 'Alex Brush';
  font-style: normal;
  font-weight: 100;
  font-size: 64px;
  line-height: 80px;
  display: flex;
  justify-content:center;
  align-items: center;
  color: ${colors.primary};
  margin:0;
  position:absolute;
  top:0;
  left:0;
`

const activeStyle = {
    margin:'75% auto',
    width:'90%',
    height:'auto',
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
    textDecoration:'none',
    fontSize:'30px',
    color:`${colors.tertiary}`
}

const inactiveStyle = {
    margin:'75% auto',
    width:'90%',
    height:'auto',
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
    textDecoration:'none',
    fontSize:'30px',
    color:`${colors.fontLight}`
}