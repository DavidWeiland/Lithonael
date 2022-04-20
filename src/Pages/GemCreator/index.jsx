import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useStore } from 'react-redux'
import { selectAdmin, selectGems } from '../../Utils/selectors'
import { createGem } from '../../Features/gems'
import {modifyOneGem} from '../../Features/gem'
import styled from "styled-components";
import { Loader } from "../../Utils/Styles/Loader";
import { ImageSelector } from "../../Components/ImageSelector";
import { FormForCreateOrModifyItem } from "../../Components/FormForCreateOfModifyItem";

export default function GemCreator({data, gemId, retour}) {
  const store = useStore()
  const navigate = useNavigate()
  
  const admin = useSelector(selectAdmin)
  const adminStatus = admin.status
  const adminId = admin.data?.adminId
  const token = admin.data?.token
  
  const gemsList = useSelector(selectGems).data
  const gemsStatus = useSelector(selectGems).status
  
  // retour pour récupérer les gems
  useEffect(() => {
    if (gemsStatus==='void') {
      navigate('/wikigems')
    }
  }, [ navigate, gemsStatus ])

  // Elements du body à envoyer
  const [ name, setName ] = useState(data?data.name:"")
  const [ nameOrigin, setNameOrigin ] = useState(data?data.nameOrigin:"")
  const [ historyText, setHistoryText ] = useState(data?data.historyText:"")
  const [ deposits, setDeposits ] = useState(data?data.deposits:[])
  const [ chimicalComposition, setChimicalComposition ] = useState(data?data.chimicalComposition:[])
  const [ hardnessMin, setHardnessMin ] = useState(data?data.hardnessMin:"")
  const [ hardnessMax, setHardnessMax ] = useState(data?data.hardnessMax:"")
  const [ crystalSystem, setCrystalSystem ] = useState(data?data.crystalSystem:[])
  const [ colours, setColours ] = useState(data?data.colours:[])
  const [ descriptionVirtues, setDescriptionVirtues ] = useState(data?data.descriptionVirtues:"")
  const [ physicalVirtues, setPhysicalVirtues ] = useState(data?data.physicalVirtues:[])
  const [ psychologicalVirtues, setPsychologicalVirtues ] = useState(data?data.psychologicalVirtues:[])
  const [ image, setImage ] = useState(data?data.image:"")
  
  // envoi du l'objet créé ou modifié
  function save() {
    const body = {
      userId : adminId,
      name,
      nameOrigin,
      historyText,
      chimicalComposition,
      hardnessMin,
      hardnessMax,
      crystalSystem,
      deposits,
      colours,
      descriptionVirtues,
      physicalVirtues,
      psychologicalVirtues,
      image:""
    }
    if(data){
      modifyOneGem(store, gemId, body, image, token)
      retour()
    } else {
      createGem(store, body, image, token)
      navigate('/wikigems')
    }
  }

  // warning utilisateur non connecté
  /* if (adminStatus === 'void') {
    return (
      <div>
        Vous devez être connecté en tant qu'administrateur pour afficher la page ...
      </div>
    )
  } */

  if (adminStatus === 'pending' || adminStatus === 'updating' || gemsStatus === 'pending' || gemsStatus === 'updating') {
    return (
      <Loader />
    )
  }
  
  return (
    <StyledMainContainer>
      {data ? <StyledH1>
        Modification d'une pierre
      </StyledH1> : <StyledH1>
        Création d'une pierre
      </StyledH1>}
      <StyledPresentationContainer>
        <ImageSelector feedback={(file) => setImage(file)} data={data}/>
        <StyledGeneralContainer>
          <StyledInputName type='text' id='Name' name='Name' value={name} onChange={(e) => setName(e.target.value.toUpperCase())} placeholder='Nom' required/>
          <StyledInputNameOrigin type='text' id='NameOrigin' name='NameOrigin' value={nameOrigin} onChange={(e) => setNameOrigin(e.target.value)} placeholder="Nom d'origine" />
          <StyledTextarea type='text' id='HistoryText' name='HistoryText' value={historyText} onChange={(e) => setHistoryText(e.target.value)} rows={7} cols={30} wrap='hard' placeholder='Introduction/Histoire' />
        </StyledGeneralContainer>
      </StyledPresentationContainer>
      <StyledInfoContainer>
        <h2>Gisements</h2>
        <FormForCreateOrModifyItem base={gemsList} name='Deposits' value='deposits' source={deposits} setSource={(e)=>setDeposits(e)}/>
      </StyledInfoContainer>
      <StyledInfoContainer>
        <h2>Composition Chimique</h2>
        <FormForCreateOrModifyItem base={gemsList} name='ChimicalComposition' value='chimicalComposition' source={chimicalComposition} setSource={(e)=>setChimicalComposition(e)}/>
      </StyledInfoContainer>
      <StyledInfoContainer>
        <h2>Dureté</h2>
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
        <h2>Système Cristallin</h2>
        <FormForCreateOrModifyItem base={gemsList} name='CrystalSystem' value='crystalSystem' source={crystalSystem} setSource={(e)=>setCrystalSystem(e)}/>
      </StyledInfoContainer>
      <StyledInfoContainer>
        <h2>Couleurs</h2>
        <FormForCreateOrModifyItem base={gemsList} name='Colours' value='colours' source={colours} setSource={(e) => setColours(e)} />
      </StyledInfoContainer>
      <StyledInfoContainer>
        <StyledTextarea type='text' id='DescriptionVirtues' name='DescriptionVirtues' value={descriptionVirtues} onChange={(e) => setDescriptionVirtues(e.target.value)} rows={5} cols={30} wrap='hard' placeholder='Description des Vertus' />
        <h2>Vertus Physiques</h2>
        <FormForCreateOrModifyItem base={gemsList} name='PhysicalVirtues' value='physicalVirtues' source={physicalVirtues} setSource={(e)=>setPhysicalVirtues(e)}/>
        <h2>Vertus Psychologiques</h2>
        <FormForCreateOrModifyItem base={gemsList} name='PsychologicalVirtues' value='psychologicalVirtues' source={psychologicalVirtues} setSource={(e)=>setPsychologicalVirtues(e)}/>
      </StyledInfoContainer>
      
      <StyledButton value='Save' onClick={save} disabled={adminId?false:true}>
        Sauvegarder
      </StyledButton>
      <p style={{visibility:`${adminId?'hidden':'visible'}`}}>Vous devez être connecté en tant qu'administrateur pour valider la création de la pierre</p>
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

const StyledGeneralContainer = styled.div`
  min-width:450px;
  width:60%;
  margin:3%;
  min-height:300px;
  max-height:300px;
  display: flex;
  flex-flow: column;
  justify-content:space-between;
  align-items:center;
  background-color:white;
  border-radius:15px;
  box-shadow:15px 15px 50px grey;
`
const StyledInputName = styled.input`
  flex:2;
  width:98%;
  margin:1% 1% 0 1%;
  border:0;
  text-align:center;
  color:#000;
  font-size:27px;
  font-weight:700;
  border-radius: 15px 15px 0 0;
`
const StyledInputNameOrigin = styled.input`
  flex:1;
  width:98%;
  border:0;
  margin:0;
  text-align:center;
  color:#000;
  font-size:12px;
  font-weight:normal;
`
const StyledTextarea = styled.textarea`
  flex:3;
  width:98%;
  margin:0;
  border:0;
  padding-left:10px;
  color:#000;
  font-size:13px;
  font-weight:normal;
`
const StyledForm = styled.form`
  display: flex;
  flex-flow: row wrap;  
  flex:3;
  width:98%;
  margin: 0 1% 1% 1%;
  padding:10px;
  color:#000;
  font-size:13px;
  font-weight:normal;
  border-radius: 0 0 15px 15px;
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
  margin:0 1% 0 1%;
  font-size:12px;
`

const StyledInfoContainer = styled.div`
  min-width:450px;
  width:95%;
  margin:2%;
  display: flex;
  flex-flow: column;
  justify-content:space-between;
  align-items:center;
  background-color:white;
  border-radius:15px;
  box-shadow:15px 15px 50px grey;
`

const StyledButton = styled.button`
  width:auto;
  font-size:15px;
  background:grey;
  border-radius:5px;
  color:white;
`