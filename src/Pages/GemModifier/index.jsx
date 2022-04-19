import { useState } from "react"
import styled from "styled-components"

export const GemModifier = ({data, retour}) => {
  const [image, setImage]=useState()
  const [ imageShower, setImageShower ] = useState(data.image)
  
  const { name } = data

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

  return (
    <div>
      {name}
      <button onClick={retour}>Enregistrer</button>


      <StyledImageContainer>
          <StyledImage src={imageShower} alt={name} />
          <StyledFileInput htmlFor="Image">Sélectionner une image
          </StyledFileInput>
          <input type='file' id='Image' name='Image' accept='image/png, image/jpeg, image/jpg' onChange={(e) => imageReader(e)} required style={{opacity:0, position:'absolute'}} />
      </StyledImageContainer>
      


    </div>
  )
}

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