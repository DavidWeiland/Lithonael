import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useStore } from 'react-redux'
import { selectAdmin, selectGems } from '../../Utils/selectors'
import { createGem } from '../../Features/gems'
import styled from "styled-components";
import { Loader } from "../../Utils/Styles/Loader";

export default function GemCreator() {
  const store = useStore()
  const navigate = useNavigate()
  
  const admin = useSelector(selectAdmin)
  const adminStatus = admin.status
  const adminId = admin.data?.adminId
  const token = admin.data?.token
  
  const gemsList = useSelector(selectGems).data?.gemsList
  const gemsStatus = useSelector(selectGems).status
  
  // retour pour récupérer les gems
  useEffect(() => {
    if (gemsStatus==='void') {
      navigate('/wikigems')
    }
  }, [ navigate, gemsStatus ])
  
  //Contruction des checkbox
  const gemsDeposits = []
  const gemsChimicalComposition = []
  const gemsCrystal = []
  const gemsColours = []
  const gemsPhysicalVirtues = []
  const gemsPsychologicalVirtues = []

  gemsList?.forEach(gem => {
    gemsDeposits.push([ ...gem.deposits ])
    gemsChimicalComposition.push([ ...gem.chimicalComposition ])
    gemsCrystal.push([ ...gem.crystalSystem ])
    gemsColours.push([ ...gem.colours ])
    gemsPhysicalVirtues.push([ ...gem.physicalVirtues ])
    gemsPsychologicalVirtues.push([ ...gem.psychologicalVirtues ])
  })

  const gemsBaseDeposits = gemsDeposits.length>1 ? gemsDeposits.reduce((a,b)=>{return a.concat(b)}).reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), []) : null
  const [ baseDeposits, setBaseDeposits ] = useState(gemsBaseDeposits?.sort((a,b)=> a>b ? 1 : -1) ?? [])

  const gemsBaseChimicalComposition = gemsChimicalComposition.length > 1 ? gemsChimicalComposition.reduce((a, b) => { return a.concat(b) }).reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), []) : null
  const [ baseChimicalComposition, setBaseChimicalComposition ] = useState(gemsBaseChimicalComposition?.sort((a, b) => a > b ? 1 : -1) || [])
  
  const gemsBaseCrystalSystem = gemsCrystal.length>1 ? gemsCrystal.reduce((a,b)=>{return a.concat(b)}).reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), []) : null
  const [ baseCrystalSystem, setBaseCrystalSystem ] = useState(gemsBaseCrystalSystem?.sort((a, b) => a > b ? 1 : -1) || [])

  const gemsBaseColours = gemsColours.length>1 ? gemsColours.reduce((a,b)=>{return a.concat(b)}).reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), []) : null
  const [ baseColours, setBaseColours ] = useState(gemsBaseColours?.sort((a, b) => a > b ? 1 : -1) || [])
  
  const gemsBasePhysicalVirtues = gemsPhysicalVirtues.length>1 ? gemsPhysicalVirtues.reduce((a,b)=>{return a.concat(b)}).reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), []) : null
  const [ basePhysicalVirtues, setBasePhysicalVirtues ] = useState(gemsBasePhysicalVirtues?.sort((a, b) => a > b ? 1 : -1) || [])

  const gemsBasePsychologicalVirtues = gemsPsychologicalVirtues.length>1 ? gemsPsychologicalVirtues.reduce((a,b)=>{return a.concat(b)}).reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), []) : null
  const [ basePsychologicalVirtues, setBasePsychologicalVirtues ] = useState(gemsBasePsychologicalVirtues?.sort((a,b)=> a>b ? 1 : -1) || [])

  // Elements du body à envoyer (feedback des inputs)
  const [ name, setName ] = useState("")
  const [ nameOrigin, setNameOrigin ] = useState("")
  const [ historyText, setHistoryText ] = useState("")
  const [ deposits, setDeposits ] = useState([])
  const [ chimicalComposition, setChimicalComposition ] = useState([])
  const [ hardnessMin, setHardnessMin ] = useState("")
  const [ hardnessMax, setHardnessMax ] = useState("")
  const [ crystalSystem, setCrystalSystem ] = useState([])
  const [ colours, setColours ] = useState([])
  const [ descriptionVirtues, setDescriptionVirtues ] = useState("")
  const [ physicalVirtues, setPhysicalVirtues ] = useState([])
  const [ psychologicalVirtues, setPsychologicalVirtues ] = useState([])
  const [ image, setImage ] = useState("")
  
  //gestion des viewers
  const [ imageShower, setImageShower ] = useState("")
  const [ depositsView, setDepositsView ] = useState("")
  const [ chimicalCompositionView, setChimicalCompositionView ] = useState("")
  const [ crystalSystemView, setCrystalSystemView ] = useState("")
  const [ colourView, setColourView ] = useState("")
  const [ physicalVirtuesView, setPhysicalVirtuesView ] = useState("")
  const [ psychologicalVirtuesView, setPsychologicalVirtuesView ] = useState("")
  
  //creation des array
  const tagPusher = (e) => {
    const id = e.target.id
    const value = e.target.value
    const isChecked = e.target.checked
    let newTags = []
    console.log(id, value)
    
    switch (id) {
      case 'Deposits':
        newTags = [ ...deposits ]
        if (isChecked) {
          newTags.push(value)
        } else {
          const index = deposits.indexOf(value)
          newTags.splice(index,1)
        }
        setDeposits(newTags)
        break
      case 'AddDeposit_Btn':
        e.preventDefault()
        if (depositsView) {
          newTags = [ ...baseDeposits ]
          newTags.push(depositsView)
          const new2 = newTags.reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), [])
          setBaseDeposits(new2.sort((a,b)=> a>b ? 1 :-1))
          setDepositsView("")
          document.getElementById(id.split('_')[0]).focus()
        }
        break
      case 'ChimicalComposition':
        newTags = [ ...chimicalComposition ]
        if (isChecked) {
          newTags.push(value)
        } else {
          const index = chimicalComposition.indexOf(value)
          newTags.splice(index,1)
        }
        setChimicalComposition(newTags)
        break
      case 'AddChimicalComposition_Btn':
        e.preventDefault()
        if (chimicalCompositionView) {
          newTags = [ ...baseChimicalComposition ]
          newTags.push(chimicalCompositionView)
          const new2 = newTags.reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), [])
          setBaseChimicalComposition(new2.sort((a,b)=> a>b ? 1 :-1))
          setChimicalCompositionView("")
          document.getElementById(id.split('_')[0]).focus()
        }
        break
      case 'CrystalSystem':
        newTags = [ ...crystalSystem ]
        if (isChecked) {
          newTags.push(value)
        } else {
          const index = crystalSystem.indexOf(value)
          newTags.splice(index,1)
        }
        setCrystalSystem(newTags)
        break
      case 'AddCrystalSystem_Btn':
        e.preventDefault()
        if (crystalSystemView) {
          newTags = [ ...baseCrystalSystem ]
          newTags.push(crystalSystemView)
          const new2 = newTags.reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), [])
          setBaseCrystalSystem(new2.sort((a,b)=> a>b ? 1 :-1))
          setCrystalSystemView("")
          document.getElementById(id.split('_')[0]).focus()
        }
        break
      case 'Colours':
        newTags = [ ...colours ]
        if (isChecked) {
          newTags.push(value)
        } else {
          const index = colours.indexOf(value)
          newTags.splice(index,1)
        }
        setColours(newTags)
        break
      case 'AddColour_Btn':
        e.preventDefault()
        if (colourView) {
          newTags = [ ...baseColours ]
          newTags.push(colourView)
          const new2 = newTags.reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), [])
          setBaseColours(new2.sort((a,b)=> a>b ? 1 :-1))
          setColourView("")
          document.getElementById(id.split('_')[0]).focus()
        }
        break
      case 'PhysicalVirtues':
        newTags = [ ...physicalVirtues ]
        if (isChecked) {
          newTags.push(value)
        } else {
          const index = physicalVirtues.indexOf(value)
          newTags.splice(index,1)
        }
        setPhysicalVirtues(newTags)
        break
      case 'AddPhysicalVirtues_Btn':
        e.preventDefault()
        if (physicalVirtuesView) {
          newTags = [ ...basePhysicalVirtues ]
          newTags.push(physicalVirtuesView)
          const new2 = newTags.reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), [])
          setBasePhysicalVirtues(new2.sort((a,b)=> a>b ? 1 :-1))
          setPhysicalVirtuesView("")
          document.getElementById(id.split('_')[0]).focus()
        }
        break
      case 'PsychologicalVirtues':
        newTags = [ ...psychologicalVirtues ]
        if (isChecked) {
          newTags.push(value)
        } else {
          const index = psychologicalVirtues.indexOf(value)
          newTags.splice(index,1)
        }
        setPsychologicalVirtues(newTags)
        break
      case 'AddPsychologicalVirtues_Btn':
        e.preventDefault()
        if (psychologicalVirtuesView) {
          newTags = [ ...basePsychologicalVirtues ]
          newTags.push(psychologicalVirtuesView)
          const new2 = newTags.reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), [])
          setBasePsychologicalVirtues(new2.sort((a,b)=> a>b ? 1 :-1))
          setPsychologicalVirtuesView("")
          document.getElementById(id.split('_')[0]).focus()
        }
        break
      default:
    }
  }

  // affichage de l'image à envoyer
  const imageReader = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const file = e.target.files[ 0 ]
    setImage(file)
    const fileReader = new FileReader()
    fileReader.onload = (progressEvent) => {
      const url = fileReader.result
      setImageShower(url)
    }
    fileReader.readAsDataURL(file)
  }

  // envoi du l'objet créé
  function create() {
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
    createGem(store, body, image, token)
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
      
      <StyledH1>
        Création d'une pierre
      </StyledH1>
      
      <StyledPresentationContainer>
        
        <StyledImageContainer>
          <StyledImage src={imageShower} alt={name} />
          <StyledFileInput htmlFor="Image">Sélectionner une image
          </StyledFileInput>
          <input type='file' id='Image' name='Image' accept='image/png, image/jpeg, image/jpg' onChange={(e) => imageReader(e)} required style={{opacity:0, position:'absolute'}} />
        </StyledImageContainer>
        
        <StyledGeneralContainer>
          <StyledInputName type='text' id='Name' name='Name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Nom' required/>
          
          <StyledInputNameOrigin type='text' id='NameOrigin' name='NameOrigin' value={nameOrigin} onChange={(e) => setNameOrigin(e.target.value)} placeholder="Nom d'origine" />
          
          <StyledTextarea type='text' id='HistoryText' name='HistoryText' value={historyText} onChange={(e) => setHistoryText(e.target.value)} rows={7} cols={30} wrap='hard' placeholder='Introduction/Histoire' />
        </StyledGeneralContainer>
      </StyledPresentationContainer>

      <StyledInfoContainer>
        <label>Gisements :</label>
        <StyledForm>
          {baseDeposits.map((land, index) =>
            <StyledCheckboxInputWrapper key={`${land}-${index}`}>
              <input type='checkbox' value={land} id='Deposits' onClick={(e) => tagPusher(e)} />
              <label htmlFor='Deposits'>{land}</label>
            </StyledCheckboxInputWrapper>
          )}
          <StyledLabel>
            <StyledInputGeneric type='text' id='AddDeposit' name='AddDeposit' value={depositsView} onChange={(e) => setDepositsView(e.target.value)} placeholder='Other' />
            <StyledButtonGeneric id='AddDeposit_Btn' onClick={(e) => tagPusher(e)}>
              Ajouter
            </StyledButtonGeneric>
          </StyledLabel>
        </StyledForm>
      </StyledInfoContainer>

      <StyledInfoContainer>
        <label>Composition Chimique :</label>
        <StyledForm>
          {baseChimicalComposition.map((chimic, index) =>
            <StyledCheckboxInputWrapper key={`${chimic}-${index}`}>
              <input type='checkbox' value={chimic} id='ChimicalComposition' onClick={(e) => tagPusher(e)} />
              <label htmlFor='ChimicalComposition'>{chimic}</label>
            </StyledCheckboxInputWrapper>
          )}
          <StyledLabel>
            <StyledInputGeneric type='text' id='AddChimicalComposition' name='AddChimicalComposition' value={chimicalCompositionView} onChange={(e) => setChimicalCompositionView(e.target.value)} placeholder='Other' />
            <StyledButtonGeneric id='AddChimicalComposition_Btn' onClick={(e) => tagPusher(e)}>
              Ajouter
            </StyledButtonGeneric>
          </StyledLabel>
        </StyledForm>
      </StyledInfoContainer>
      
      <StyledInfoContainer>
        <label>Dureté :</label>
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
        <label>Système Cristallin :</label>
        <StyledForm>
          {baseCrystalSystem.map((system, index) =>
            <StyledCheckboxInputWrapper key={`${system}-${index}`}>
              <input type='checkbox' value={system} id='CrystalSystem' onClick={(e) => tagPusher(e)} />
              <label htmlFor='CrystalSystem'>{system}</label>
            </StyledCheckboxInputWrapper>
          )}
          <StyledLabel>
            <StyledInputGeneric type='text' id='AddCrystalSystem' name='AddCrystalSystem' value={crystalSystemView} onChange={(e) => setCrystalSystemView(e.target.value)} placeholder='Other' />
            <StyledButtonGeneric id='AddCrystalSystem_Btn' onClick={(e) => tagPusher(e)}>
              Ajouter
            </StyledButtonGeneric>
          </StyledLabel>
        </StyledForm>
      </StyledInfoContainer>
      
      <StyledInfoContainer>
        <label>Couleurs :</label>
        <StyledForm>
          {baseColours.map((colour, index) =>
            <StyledCheckboxInputWrapper key={`${colour}-${index}`}>
              <input type='checkbox' value={colour} id='Colours' onClick={(e) => tagPusher(e)} />
              <label htmlFor='Colours'>{colour}</label>
            </StyledCheckboxInputWrapper>
          )}
          <StyledLabel>
            <StyledInputGeneric type='text' id='AddColour' name='AddColour' value={colourView} onChange={(e) => setColourView(e.target.value)} placeholder='Other' />
            <StyledButtonGeneric id='AddColour_Btn' onClick={(e) => tagPusher(e)}>
              Ajouter
            </StyledButtonGeneric>
          </StyledLabel>
        </StyledForm>
      </StyledInfoContainer>
      
      <StyledInfoContainer>
        <StyledTextarea type='text' id='DescriptionVirtues' name='DescriptionVirtues' value={descriptionVirtues} onChange={(e) => setDescriptionVirtues(e.target.value)} rows={5} cols={30} wrap='hard' placeholder='Description des Vertus' />

        <label>Vertus Physiques :</label>
        <StyledForm>
          {basePhysicalVirtues.map((physicalVirtu, index) =>
            <StyledCheckboxInputWrapper key={`${physicalVirtu}-${index}`}>
              <input type='checkbox' value={physicalVirtu} id='PhysicalVirtues' onClick={(e) => tagPusher(e)} />
              <label htmlFor='PhysicalVirtues'>{physicalVirtu}</label>
            </StyledCheckboxInputWrapper>
          )}
          <StyledLabel>
            <StyledInputGeneric type='text' id='AddPhysicalVirtues' name='AddPhysicalVirtues' value={physicalVirtuesView} onChange={(e) => setPhysicalVirtuesView(e.target.value)} placeholder='Other' />
            <StyledButtonGeneric id='AddPhysicalVirtues_Btn' onClick={(e) => tagPusher(e)}>
              Ajouter
            </StyledButtonGeneric>
          </StyledLabel>
        </StyledForm>

        <label>Vertus Psychologiques :</label>
        <StyledForm>
          {basePsychologicalVirtues.map((psychologicalVirtu, index) =>
            <StyledCheckboxInputWrapper key={`${psychologicalVirtu}-${index}`}>
              <input type='checkbox' value={psychologicalVirtu} id='PsychologicalVirtues' onClick={(e) => tagPusher(e)} />
              <label htmlFor='PsychologicalVirtues'>{psychologicalVirtu}</label>
            </StyledCheckboxInputWrapper>
          )}
          <StyledLabel>
            <StyledInputGeneric type='text' id='AddPsychologicalVirtues' name='AddPsychologicalVirtues' value={psychologicalVirtuesView} onChange={(e) => setPsychologicalVirtuesView(e.target.value)} placeholder='Other' />
            <StyledButtonGeneric id='AddColour_Btn' onClick={(e) => tagPusher(e)}>
              Ajouter
            </StyledButtonGeneric>
          </StyledLabel>
        </StyledForm>
      </StyledInfoContainer>
      
      <StyledButton value='Save' onClick={create} disabled={adminId?false:true}>
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
const StyledFileInput = styled.label`
  border-radius:15px;
  background-color:transparent;
  width:98%;
  height:98%;
  margin:1%;
  margin-top:-99%;
  display:flex;
  justify-content:center;
  align-items:flex-start;
  color:white;
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
  text-transform:uppercase
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
const StyledCheckboxInputWrapper = styled.div`
  width:25%;
  font-size:13px;
  display:flex;
  flex-wrap: nowrap;
  justify-content:flex-start;
  align-items:center;
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
const StyledButtonGeneric = styled.button`
  width:auto;
  font-size:12px;
  background:grey;
  border-radius:5px;
  color:white;
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