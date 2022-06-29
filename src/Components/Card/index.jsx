import React from "react";
import PropTypes from "prop-types"
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import colors from "../../Utils/Styles/colors";

export const Card =({id, name, nameOrigin, image, objet, price, stock})=> {
  const navigate=useNavigate()
    
  const goNav = () => {
    const path=objet==='bijou'? 'jewel' : 'wikigems'
    navigate(`/${path}/${id}`)
  }

  const incremente = () => {
    //incremente le stock
  }
  const decremente = () => {
    //decremente le stock
  }
  
  return (
    <StyledMainContainer>
      <StyledImage src={image} alt={name} />
      <StyledH2>{name} - {nameOrigin}</StyledH2>
      {objet === 'bijou' ?
        <StyledH2>{price}€</StyledH2>
        :
        <StyledStockContainer>
          <StyledH3>Stock</StyledH3>
          <StyledStockInfoContainer>
            <span style={{ fontSize:'30px' }}>{stock}</span>{/*prévoir élément stock dans DB*/}
            <div>
              <StyledIncrement onClick={incremente}></StyledIncrement>{/*prévoir onclick incrémente stock*/}
              <StyledDecrement onClick={decremente}></StyledDecrement>{/*prévoir onclick décrémente stock*/}
            </div>
          </StyledStockInfoContainer>
        </StyledStockContainer>}
      <StyledButton onClick={goNav}><i className="fas fa-pen" /></StyledButton>
    </StyledMainContainer>
  )
}
Card.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
Card.defaultProps = {
  image: 'image',
  name: 'nom de la pierre'
}


const StyledMainContainer = styled.div`
  width:100%;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  height:100px;
  padding:1%;
  border-radius:10px;
  background:${colors.tertiary};
  margin:2% 0;
  box-shadow: ${colors.boxShadowDark};
`
const StyledImage = styled.img`
  width:auto;
  height:98%;
  object-fit:cover;
  border-radius:50%;
`
const StyledH2 = styled.h2`
  color:${colors.fontDark};
  font-size:20px;
  margin-left: 1%;
`
const StyledStockContainer = styled.div`
  width:200px;
  height:98%;
  margin:0;
  margin-left:30%;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
  border-radius:10px;
  background:${colors.quaternary};
  box-shadow: ${colors.boxShadowDark};
`
const StyledH3 = styled.h3`
  color:${colors.fontDark};
  font-size:16px;
  margin:0;
`
const StyledStockInfoContainer = styled.div`
  width:100%;
  margin:0;
  margin-top:-5%;
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  align-items:center;
`
const StyledIncrement = styled.div`
  width:20px;
  height:20px;
  border:10px solid transparent;
  border-bottom:10px solid black;
  margin:0;
  margin-bottom:5px;
  cursor:pointer;
  z-index:10;
`
const StyledDecrement = styled.div`
  width:20px;
  height:20px;
  border:10px solid transparent;
  border-top:10px solid black;
  margin:0;
  margin-top:5px;
  cursor:pointer;
  z-index:10;
`
const StyledButton = styled.button`
  width:50px;
  height:50px;
  border:0;
  border-radius:50%;
  background-color:${colors.secondary};
  font-size:30px;
  cursor:pointer;
  color:${colors.fontLight};
`