import React, {useState} from "react";
import { useSelector, useStore } from 'react-redux'
import { selectAdmin } from '../../Utils/selectors'
import { createGem } from '../../Features/gems'
import styled from "styled-components";
import ListComponent from '../../Components/ListComponent'

export default function GemCreator() {
  const store = useStore()

  const admin = useSelector(selectAdmin)
  const adminId = admin.data?.adminId
  const token = admin.data?.token

  // Elements du body à envoyer (feedback des inputs)
  const [ name, setName ] = useState("")
  const [ nameOrigin, setNameOrigin ] = useState("")
  const [ historyText, setHistoryText ] = useState("")
  const [ chimicalComposition, setChimicalComposition ] = useState([])
  const [ hardnessMin, setHardnessMin ] = useState("")
  const [ hardnessMax, setHardnessMax ] = useState("")
  const [ crystalSystem, setCrystalSystem ] = useState("")
  const [ deposits, setDeposits ] = useState([])
  const [ colours, setColours ] = useState([])
  const [ descriptionVirtues, setDescriptionVirtues ] = useState("")
  const [ physicalVirtues, setPhysicalVirtues ] = useState([])
  const [ psychologicalVirtues, setPsychologicalVirtues ] = useState([])
  const [ image, setImage ] = useState("")
  
  //gestion des viewers
  const [ imageShower, setImageShower ] = useState("")
  const [ chimicalCompositionView, setChimicalCompositionView ] = useState("")
  const [ depositsView, setDepositsView ] = useState("")
  const [ coloursView, setColoursView ] = useState("")
  const [ physicalVirtuesView, setPhysicalVirtuesView ] = useState("")
  const [ psychologicalVirtuesView, setPsychologicalVirtuesView ] = useState("")

  //creation des array
  const tagPusher = (e, tag) => {
    e.preventDefault()
    let newTags = []
    const elementForFocus = document.getElementById(tag)
    switch (tag) {
      case 'ChimicalComposition':
        if (chimicalCompositionView) {
          newTags = [ ...chimicalComposition ]
          newTags.push(chimicalCompositionView)
          setChimicalComposition(newTags)
          setChimicalCompositionView("")
        }
        break
        
      case 'Deposits':
        if (depositsView) {
          newTags = [ ...deposits ]
          newTags.push(depositsView)
          setDeposits(newTags)
          setDepositsView("")
        }
        break
      case 'Colours':
        if (coloursView) {
          newTags = [ ...colours ]
          newTags.push(coloursView)
          setColours(newTags)
          setColoursView("")
        }
        break
      case 'PhysicalVirtues':
        if (coloursView) {
          newTags = [ ...physicalVirtues ]
          newTags.push(physicalVirtuesView)
          setPhysicalVirtues(newTags)
          setPhysicalVirtuesView("")
        }
        break
      case 'PsychologicalVirtues':
        if (coloursView) {
          newTags = [ ...psychologicalVirtues ]
          newTags.push(psychologicalVirtuesView)
          setPsychologicalVirtues(newTags)
          setPsychologicalVirtuesView("")
        }
        break
      default:
    }
    elementForFocus.focus()
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
  if (!adminId) {
    return (
      <div>
        Vous devez être connecté en tant qu'administrateur pour afficher la page ...
      </div>
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
          
          <StyledTextarea type='text' id='HistoryText' name='HistoryText' value={historyText} onChange={(e) => setHistoryText(e.target.value)} rows={7} cols={30} wrap='hard' placeholder='Introduction' />
          
          <StyledForm>
            <StyledLabel>
              <StyledInputGeneric type='text' id='Deposits' name='Deposits' value={depositsView} onChange={(e) => setDepositsView(e.target.value)} placeholder='Provenance' />
              <StyledButtonGeneric onClick={(e) => tagPusher(e, 'Deposits')}>
                Ajouter
              </StyledButtonGeneric>
            </StyledLabel>
            <ListComponent name={deposits} />
          </StyledForm>
        
        </StyledGeneralContainer>
      </StyledPresentationContainer>
      <StyledInfoContainer>
        
        <StyledForm>
          <StyledLabel>
            <StyledInputGeneric type='text' id='ChimicalComposition' name='ChimicalComposition' value={chimicalCompositionView} onChange={(e) => setChimicalCompositionView(e.target.value)} placeholder='ChimicalComposition' />
            <StyledButtonGeneric onClick={(e) => tagPusher(e, 'ChimicalComposition')}>
              Ajouter
            </StyledButtonGeneric>
          </StyledLabel>
          <ListComponent name={chimicalComposition} />
        </StyledForm>
        
        <StyledForm>
          <StyledLabel>
            <StyledInputGeneric type='number' id='HardnessMin' name='HardnessMin' value={hardnessMin} onChange={(e) => setHardnessMin(e.target.value)} placeholder='Dureté minimum' />
          </StyledLabel>
          <StyledLabel>
            <StyledInputGeneric type='number' id='HardnessMax' name='HardnessMax' value={hardnessMax} onChange={(e) => setHardnessMax(e.target.value)} placeholder='Dureté maximum' />
          </StyledLabel>
        </StyledForm>
        
        <StyledForm>
          <StyledLabel>
            <StyledInputGeneric type='text' id='CrystalSystem' name='CrystalSystem' value={crystalSystem} onChange={(e) => setCrystalSystem(e.target.value)} placeholder='Système cristallin' />
          </StyledLabel>
        </StyledForm>
        
        <StyledForm>
          <StyledLabel>
            <StyledInputGeneric type='text' id='Colours' name='Colours' value={coloursView} onChange={(e) => setColoursView(e.target.value)} placeholder='Couleurs' required/>
            <StyledButtonGeneric onClick={(e) => tagPusher(e, 'Colours')}>
              Ajouter
            </StyledButtonGeneric>
          </StyledLabel>
          <ListComponent name={colours} />
        </StyledForm>
      </StyledInfoContainer>
      
      <StyledInfoContainer>
        <StyledTextarea type='text' id='DescriptionVirtues' name='DescriptionVirtues' value={descriptionVirtues} onChange={(e) => setDescriptionVirtues(e.target.value)} rows={5} cols={30} wrap='hard' placeholder='Description des Vertus' />
        
        <StyledForm>
          <StyledLabel>
            <StyledInputGeneric type='text' id='PhysicalVirtues' name='PhysicalVirtues' value={physicalVirtuesView} onChange={(e) => setPhysicalVirtuesView(e.target.value)} placeholder='Vertus Physiques' required/>
            <StyledButtonGeneric onClick={(e) => tagPusher(e, 'PhysicalVirtues')}>
              Ajouter
            </StyledButtonGeneric>
          </StyledLabel>
          <ListComponent name={physicalVirtues} />
        </StyledForm>
        
        <StyledForm>
          <StyledLabel>
            <StyledInputGeneric type='text' id='PsychologicalVirtues' name='PsychologicalVirtues' value={psychologicalVirtuesView} onChange={(e) => setPsychologicalVirtuesView(e.target.value)} placeholder='Vertus Psychologiques' required/>
            <StyledButtonGeneric onClick={(e) => tagPusher(e, 'PsychologicalVirtues')}>
              Ajouter
            </StyledButtonGeneric>
          </StyledLabel>
          <ListComponent name={psychologicalVirtues} />
        </StyledForm>
      </StyledInfoContainer>
      
      <StyledButton value='Save' onClick={create}>
        Sauvegarder
      </StyledButton>
    
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
  width:100%;
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