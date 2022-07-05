import { useState } from "react"
import styled from "styled-components"
import colors from "../../Utils/Styles/colors"

export const ImageSelector = ({data, feedback}) => {
  const { image, name } = data ?? {}
  const [ imageShower, setImageShower ] = useState(image)
  

const imageReader = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const file = e.target.files[ 0 ]
    feedback(file)
    const fileReader = new FileReader()
    fileReader.onload = (progressEvent) => {
      const url = fileReader.result
      setImageShower(url)
    }
  fileReader.readAsDataURL(file)
  }

  return (
      <StyledImageContainer>
          <StyledImage src={imageShower} alt={name} />
          <StyledFileInput htmlFor="Image">Sélectionner une image
          </StyledFileInput>
          <input type='file' id='Image' name='Image' accept='image/png, image/jpeg, image/jpg' onChange={(e) => imageReader(e)} required style={{opacity:0, position:'absolute'}} />
      </StyledImageContainer>
  )
}

const StyledImageContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content:center;
  align-items:center;
  width:250px;
  height:250px;
  background-color:white;
  border-radius:10px;
  box-shadow:${colors.boxShadowDark};
`
const StyledImage = styled.img`
  width:98%;
  height:98%;
  margin:1%;
  object-fit: cover;
  background-color:${colors.secondary};
  border:0;
  border-radius:10px;
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