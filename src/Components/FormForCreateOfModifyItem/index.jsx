import { useState } from "react";
import styled from "styled-components"
import { CheckboxComponentForCreateOrModifyItem } from "../CheckboxComponentForCreateOrModifyItem";
import { InputComponentForCheckboxList } from "../InputComponentForCheckboxList"

export const FormForCreateOrModifyItem = ({base, value, name, source, setSource}) => {
  const infoList = []
  
  base.forEach(gem => {
    infoList.push([...gem[value]])
  })
  
  const InfosGems = infoList.length > 0 ?
    infoList
      .reduce((a, b) => { return a.concat(b) })
      .reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), [])
    : null
  const [ informations, setInformations ] = useState(InfosGems?.sort((a,b)=> a>b ? 1 : -1) ?? [])

  return (
    <StyledForm>
          {informations.map((land, index) =>
            <CheckboxComponentForCreateOrModifyItem key={`${land}-${index}`} value={land} name={name} source={source} onClick={(e) => setSource(e)} />
          )}
          <InputComponentForCheckboxList base={informations} source={source} name={name} modifSource={(e)=>setSource(e)} modifBase={(e) => setInformations(e)}/>
    </StyledForm>
  )
}

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