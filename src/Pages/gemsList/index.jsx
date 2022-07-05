import React, { useState } from "react";
import { selectGems } from "../../Utils/selectors";
import { useSelector } from "react-redux";
import { Loader } from "../../Utils/Styles/Loader";
import { Card } from "../../Components/Card";
import {TitleOfPage} from '../../Components/TitleOfPage'
import { Button } from "../../Components/Button";
import GemViewer from "../../Components/Viewer";
import styled from "styled-components";
import colors from "../../Utils/Styles/colors";

export default function GemsList() {
  const gemsStatus = useSelector(selectGems).status
  const gemsData = useSelector(selectGems).data ?? {}
  const [gemsList, setGemsList] = useState(gemsData ?? [])
  const [ search, setSearch ] = useState("")
  const [dataViewerId, setDataViewerId] = useState('')

  if (gemsStatus === 'pending' || gemsStatus === 'updating') {
    return (
      <Loader />
    )
  }

  const searchAction = () => {
    const newGemsList = gemsData.filter(gem => gem.name.toLowerCase().includes(search.toLowerCase())|| gem.nameOrigin.toLowerCase().includes(search.toLowerCase()))
    setGemsList(newGemsList)
    if (search===""){setGemsList(gemsData)}
  }

  const resetSearchAction = () => {
    setGemsList(gemsData)
    setSearch('')
  }
  
  //const gemData = gemsData.filter(gem=>gem._id===dataViewerId)

  return (
    <div className="main_container">
      <TitleOfPage>WikiGems</TitleOfPage>
      <div style={{ display: 'flex' }}>
        <StyledLeftWindow>
          <StyledSearchWrapper>
            <StyledInput type="text" id="search" name="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)} value={search} />
            <Button action={searchAction}>Search</Button>
          </StyledSearchWrapper>

          {gemsList.length === 0 ? (
            <StyledResultWrapper>
              <Button style={{marginTop: '50px'}} action={resetSearchAction}>Créer {search.toUpperCase()}</Button> <Button style={{marginTop: '50px'}} action={resetSearchAction}>Annuler</Button>
            </StyledResultWrapper>
            ) : (
            <StyledResultWrapper>
              {gemsList?.map(({index, name, nameOrigin, image, _id}) =>
                <Card
                  key={`${index}-${name}`}
                  objet="pierre"
                  id={_id}
                  name={name}
                  nameOrigin={nameOrigin}
                  image={image}
                  stock="35"
                  onclick={()=>setDataViewerId(_id)}
                />
              )}
            </StyledResultWrapper>
          )}
        </StyledLeftWindow>
        <StyledRightWindow>
          {dataViewerId?<GemViewer dataViewerId = {dataViewerId} />:null}
        </StyledRightWindow>
      </div>
    </div>
)
}

const StyledRightWindow = styled.div`
  display:flex;
  flex:3;
  border:1px solid  ${colors.tertiary};
  border-radius : 10px;
  margin:0.5%;
  padding:1%;
  height:93vh;
`
const StyledLeftWindow = styled.div`
  display:flex;
  flex:1;
  flex-direction:column;
  height:93vh;
  margin:0.5%;
  padding:1%;
  border:1px solid  ${colors.tertiary};
  border-radius : 10px;
`
const StyledSearchWrapper = styled.div`
  display:flex;
  width:100%
`
const StyledResultWrapper = styled.div`
  display:flex;
  flex-direction:column;
  width:100%
`

const StyledInput = styled.input`
  margin-right: 1%;
  padding:1%;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  display: flex;
  align-items: center;
  width: 99%;
  height: 50px;
  border-radius:10px;
  border:0;
  box-shadow: inset ${colors.boxShadowDark};
  background-color: ${colors.primary};
`