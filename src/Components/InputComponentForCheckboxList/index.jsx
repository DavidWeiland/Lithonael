import { useState } from "react";
import styled from "styled-components";

export const InputComponentForCheckboxList = ({ base, source, name, modifBase, modifSource }) => {
  
  const [inputValue, setInputValue] = useState("")
  
  const tagPusher = (e) => {
    const id = e.target.id
    
    e.preventDefault()
    if (inputValue) {
      //add new tag in list
      let tagsList = [ ...base ]
      tagsList.push(inputValue)
      const list = tagsList.reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), [])
      modifBase(list.sort((a, b) => a > b ? 1 : -1))
      //checked new tag and push it
      tagsList = [ ...source ]
      tagsList.push(inputValue)
      modifSource(tagsList.reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), []))

      setInputValue("")
      document.getElementById(id.split('_')[ 0 ]).focus()
    }
  }

  return (
    <StyledContainer>
      <StyledInputGeneric type='text' id={`Add${name}`} name={`Add${name}`} value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Other' />
      <StyledButtonGeneric id={`Add${name}_Btn`} onClick={(e) => tagPusher(e)}>
        Ajouter
      </StyledButtonGeneric>
    </StyledContainer>
  )
}
const StyledContainer = styled.div`
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