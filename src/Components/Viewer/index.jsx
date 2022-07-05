import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { selectGems } from '../../Utils/selectors'
import styled from "styled-components";
import { FormForCreateOrModifyItem } from "../FormForCreateOfModifyItem";
import colors from "../../Utils/Styles/colors";
import { ImageSelector } from "../ImageSelector";

export default function GemViewer({dataViewerId}) {
  const gemsData = useSelector(selectGems).data
  const gemData = gemsData.filter(gem => gem._id === dataViewerId)
   
  const [ name, setName ] = useState(gemData[ 0 ].name)
  const [ nameOrigin, setNameOrigin ] = useState(gemData[ 0 ].nameOrigin)
  const [ historyText, setHistoryText ] = useState(gemData[ 0 ].historyText)
  const [ deposits, setDeposits ] = useState(gemData[ 0 ].deposits)
  const [ chimicalComposition, setChimicalComposition ] = useState(gemData[ 0 ].chimicalComposition)
  const [ hardnessMin, setHardnessMin ] = useState(gemData[ 0 ].hardnessMin)
  const [ hardnessMax, setHardnessMax ] = useState(gemData[ 0 ].hardnessMax)
  const [ crystalSystem, setCrystalSystem ] = useState(gemData[ 0 ].crystalSystem)
  const [ colours, setColours ] = useState(gemData[ 0 ].colours)
  const [ descriptionVirtues, setDescriptionVirtues ] = useState(gemData[ 0 ].descriptionVirtues)
  const [ physicalVirtues, setPhysicalVirtues ] = useState(gemData[ 0 ].physicalVirtues)
  const [ psychologicalVirtues, setPsychologicalVirtues ] = useState(gemData[ 0 ].psychologicalVirtues)
  const [ image, setImage ] = useState(gemData[ 0 ].image)
  
  return (
    <StyledMainContainer>
      <StyledHeaderContainer>
        <ImageSelector feedback={(file) => setImage(file)} data={gemData[0]}/>
        <StyledNameContainer>
          <StyledInputName type='text' id='Name' name='Name' value={name} onChange={(e) => setName(e.target.value.toUpperCase())} placeholder='Nom' required />
          <StyledInputName type='text' id='NameOrigin' name='NameOrigin' value={nameOrigin} onChange={(e) => setNameOrigin(e.target.value)} placeholder="Nom d'origine" />
          <StyledTextarea type='text' id='HistoryText' name='HistoryText' value={historyText} onChange={(e) => setHistoryText(e.target.value)} rows={7} cols={30} wrap='hard' placeholder='Introduction/Histoire' />
        </StyledNameContainer>
      </StyledHeaderContainer>

      <StyledBodyContainer>
        <StyledInfoContainer>
          <StyledH2>Gisements</StyledH2>
          <FormForCreateOrModifyItem base={gemsData} name='Deposits' value='deposits' source={deposits} setSource={(e)=>setDeposits(e)}/>
        </StyledInfoContainer>
        <StyledInfoContainer>
          <StyledH2>Composition Chimique</StyledH2>
          <FormForCreateOrModifyItem base={gemsData} name='ChimicalComposition' value='chimicalComposition' source={chimicalComposition} setSource={(e)=>setChimicalComposition(e)}/>
        </StyledInfoContainer>
        <StyledInfoContainer>
          <StyledH2>Dureté</StyledH2>
          <StyledForm>
            <StyledLabel>
              <StyledInputGeneric type='number' id='HardnessMin' name='HardnessMin' value={hardnessMin} onChange={(e) => setHardnessMin(e.target.value)} placeholder='Dureté minimum' />
            </StyledLabel>
            <StyledLabel>
              <StyledInputGeneric type='number' id='HardnessMax' name='HardnessMax' value={hardnessMax} onChange={(e) => setHardnessMax(e.target.value)} placeholder='Dureté maximum' />
            </StyledLabel>
          </StyledForm>
        </StyledInfoContainer>
        <StyledInfoContainer>
          <StyledH2>Système Cristallin</StyledH2>
          <FormForCreateOrModifyItem base={gemsData} name='CrystalSystem' value='crystalSystem' source={crystalSystem} setSource={(e)=>setCrystalSystem(e)}/>
        </StyledInfoContainer>
        <StyledInfoContainer>
          <StyledH2>Couleurs</StyledH2>
          <FormForCreateOrModifyItem base={gemsData} name='Colours' value='colours' source={colours} setSource={(e) => setColours(e)} />
        </StyledInfoContainer>
        <StyledInfoContainer>
          <StyledTextarea type='text' id='DescriptionVirtues' name='DescriptionVirtues' value={descriptionVirtues} onChange={(e) => setDescriptionVirtues(e.target.value)} rows={5} cols={30} wrap='hard' placeholder='Description des Vertus' />
          <StyledH2>Vertus Physiques</StyledH2>
          <FormForCreateOrModifyItem base={gemsData} name='PhysicalVirtues' value='physicalVirtues' source={physicalVirtues} setSource={(e)=>setPhysicalVirtues(e)}/>
          <StyledH2>Vertus Psychologiques</StyledH2>
          <FormForCreateOrModifyItem base={gemsData} name='PsychologicalVirtues' value='psychologicalVirtues' source={psychologicalVirtues} setSource={(e)=>setPsychologicalVirtues(e)}/>
        </StyledInfoContainer>
      </StyledBodyContainer>
    </StyledMainContainer>
   
  );
}

const StyledMainContainer = styled.div`
  display: flex;
  width:100%;
  flex-flow: column;
  overflow-y:scroll
`
const StyledHeaderContainer = styled.div`
  display: flex;
  width:100%;
  flex-flow: row wrap;
`
const StyledBodyContainer = styled.div`
  display: flex;
  width:99%;
  flex-direction: column;
`
const StyledNameContainer = styled.div`
  flex:1;
  padding:0 2%;
`
const StyledInputName = styled.input`
  width:100%;
  margin:1%;
  border:0;
  text-align:center;
  font-size:20px;
  font-weight:700;
  border-radius: 10px;
  box-shadow:inset ${colors.boxShadowDark};
  background-color : ${colors.primary}
`
const StyledTextarea = styled.textarea`
  width:100%;
  margin:1%;
  border:0;
  padding:10px;
  font-size:15px;
  font-weight:normal;
  border-radius: 10px;
  box-shadow:inset ${colors.boxShadowDark};
`

const StyledForm = styled.form`
  display: flex;
  flex-flow: row wrap;  
  flex:3;
  width:100%;
  margin: 0 1% 1% 1%;
  padding:10px;
  font-size:13px;
  font-weight:normal;
  border-radius: 10px;
`

const StyledLabel = styled.label`
  width:25%;
  font-size:13px;
  display:flex;
  flex-wrap: nowrap;
  justify-content:space-between;
  align-items:center;
`
const StyledInputGeneric = styled.input`
  width:100%;
  margin:0 1%;
  font-size:12px;
`

const StyledInfoContainer = styled.div`
  min-width:450px;
  width:100%;
  margin-top:2%;
  display: flex;
  flex-flow: column;
  justify-content:space-between;
  align-items:center;
  background-color:white;
  border-radius:10px;
  box-shadow:${colors.boxShadowDark};
  padding:1%;
  background-color : ${colors.primary}
`
const StyledH2 = styled.h2`
  font-size:20px;
  text-align:center
`