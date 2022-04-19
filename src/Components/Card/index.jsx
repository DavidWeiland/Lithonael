import React from "react";
import PropTypes from "prop-types"
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const LithoCard =({id, name, image, objet, price})=> {
  const navigate=useNavigate()
    
  const goNav = () => {
    navigate(`/wikigems/${id}`)
  }
  
  return (
    <StyledMainContainer onClick={goNav}>
      <StyledImage src={image} alt={name} />
      <StyledH2>{name}</StyledH2>
      {objet === 'bijou' ? <StyledH2>{price}€</StyledH2> : null}
    </StyledMainContainer>
  )
}
LithoCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
LithoCard.defaultProps = {
  image: 'image',
  name: 'nom de la pierre'
}

export const JewelCard =({id, name, image, objet, price})=> {
  const navigate=useNavigate()
    
  const goNav = () => {
    navigate(`/wikigems/${id}`)
  }
  
  return (
    <StyledMainContainer onClick={goNav}>
      <StyledImage src={image} alt={name} />
      <StyledH2>{name}</StyledH2>
      {objet === 'bijou' ? <StyledH2>{price}€</StyledH2> : null}
    </StyledMainContainer>
  )
}
JewelCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
JewelCard.defaultProps = {
  image: 'image',
  name: 'nom de la pierre'
}

const StyledMainContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  align-items:flex-start;
  width:300px;
  height:300px;
  padding:1%;
  border-radius:15px;
  background:white;
  margin:2%;
  box-shadow: 10px 10px 40px 2px #d9d9d9;
  text-decoration:none;
`
const StyledImage = styled.img`
  width:100%;
  max-height:84%;
  object-fit:none;
  border-radius:15px 15px 0 0;
`
const StyledH2 = styled.h2`
  color:black;
  font-size:20px;
  max-height:14%;
`