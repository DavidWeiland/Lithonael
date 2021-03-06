import React, { useEffect, useState } from "react";
import { useSelector, useStore } from 'react-redux'
import { selectGem } from '../../Utils/selectors'
import { getOneGem } from '../../Features/gem'
import styled from "styled-components";
import ListComponent from '../../Components/ListComponent'
import { useParams } from "react-router";
import GemCreator from "../GemCreator";

export default function GemViewer() {
  const store = useStore()
  const { id: gemId } = useParams()
  
  
  const gem = useSelector(selectGem(gemId))
  const gemData = gem.data ?? {}
  const { name, nameOrigin, historyText, chimicalComposition, hardnessMin, hardnessMax, crystalSystem, deposits, colours, descriptionVirtues, physicalVirtues, psychologicalVirtues, image } = gemData
  const [modif, setModif]=useState(false)
  
  useEffect(() => {
    getOneGem(store, gemId)
  }, [store, gemId])
  
  const goNav = () => {
    setModif(!modif)
  }
  
  function paragraphCreator(text) {
    let newtext = text.split(/\n/g)
    return (newtext.map((paragraphe, index)=><p key={index}>{paragraphe}<br/></p>))
  }

  if (gem.status === 'void' || gem.status === 'pending' || gem.status === 'updating') {
    return (
      <div>Attend !!</div>
    )
  }

  
  return (

    <StyledMainContainer>
      {!modif ? (
        <StyledPresentationContainer>
          <StyledImageContainer>
            <StyledImage src={image} alt={name} />
          </StyledImageContainer>
          <StyledH1>
            {name}
          </StyledH1>
          <span>
            {nameOrigin}
          </span>
          <div>
            {paragraphCreator(historyText)}
          </div>
          <p>Cette pierre est composée de {chimicalComposition[ 0 ]}. Son Système cristallin est {crystalSystem}. Sa dureté se situe entre {hardnessMin} et {hardnessMax}. On la trouve principalement en : </p>
          <ListComponent name={deposits} />
          <ListComponent name={colours} />
          <div>{paragraphCreator(descriptionVirtues)} </div>
          <ListComponent name={physicalVirtues} />
          <ListComponent name={psychologicalVirtues} />
          <button onClick={()=>setModif(!modif)}>Modifier</button>
        </StyledPresentationContainer>
      ) : (
          <GemCreator data={gemData ?? {}} gemId={gemId} retour={goNav} />
      )}
    </StyledMainContainer>
  );
}

const StyledMainContainer = styled.div`
  width:100%;
  display: flex;
  flex-flow: column;
  justify-content:flex-start;
  align-items:center;
`
const StyledH1 = styled.h1`
font-size:35px;
text-align:center
`
const StyledPresentationContainer = styled.div`
  display: flex;
  width:100%;
  flex-flow: row wrap;
  justify-content:space-around;
  align-items:center;
`
const StyledImageContainer = styled.div`
  margin:3%;
  display: flex;
  flex-flow: column;
  justify-content:center;
  align-items:center;
  width:300px;
  height:300px;
  background-color:white;
  border-radius:15px;
  box-shadow:15px 15px 50px grey;
`
const StyledImage = styled.img`
  width:98%;
  height:98%;
  margin:1%;
  object-fit: cover;
  background-color:grey;
  border:0;
  border-radius:15px 15px 15px 15px;
`
