import React, { useState } from "react";
import { selectGems } from "../../Utils/selectors";
import { useSelector } from "react-redux";
import { Loader } from "../../Utils/Styles/Loader";
import { Card } from "../../Components/Card";
import {TitleOfPage} from '../../Components/TitleOfPage'
import { Button } from "../../Components/Button";
import styled from "styled-components";
import colors from "../../Utils/Styles/colors";

export default function GemsList() {
  const gemsStatus = useSelector(selectGems).status
  const gemsData = useSelector(selectGems).data ?? {}
  const [gemsList, setGemsList] = useState(gemsData ?? [])
  const [ search, setSearch ] = useState("")

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


  return (
    <div className="main_container">
      <TitleOfPage>WikiGems</TitleOfPage>
      <StyledSearchWrapper>
        <StyledInput type="text" id="search" name="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)} value={search} />
        <Button action={searchAction}>Search</Button>
      </StyledSearchWrapper>

      {gemsList.length === 0 ? (
        <div>
          <Button style={{marginTop: '50px'}} action={resetSearchAction}>Créer {search.toUpperCase()}</Button> <Button style={{marginTop: '50px'}} action={resetSearchAction}>Annuler</Button>
        </div>
        ) : (
        <StyledSearchWrapper>
          {gemsList?.map(({index, name, nameOrigin, image, _id}) =>
            <Card
              key={`${index}-${name}`}
              objet="pierre"
              id={_id}
              name={name}
              nameOrigin={nameOrigin}
              image={image}
              stock="35"
            />
          )}
        </StyledSearchWrapper>
      )}
    </div>
)
}

const StyledSearchWrapper = styled.div`
  display:flex;
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