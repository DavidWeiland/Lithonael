import React, { useState } from "react";
import styled from "styled-components";
import CheckboxComponent from "../../Checkbox"

export default function SearchComponent({gemsData, gemsList, updateGemsList}) {

  const [ searchText, setSearchText ] = useState("")
  const [ searchArray, setSearchArray ] = useState([])

  const gemsChimicalComposition = []
  const gemsColours = []

  gemsData?.forEach(gem => {
    gemsChimicalComposition.push([ ...gem.chimicalComposition ])
    gemsColours.push([ ...gem.colours ])
  })

  const gemsBaseChimicalComposition = gemsChimicalComposition.length > 0 ?
    gemsChimicalComposition
      .reduce((a, b) => { return a.concat(b) })
      .reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), [])
    : null
  const baseChimicalComposition = gemsBaseChimicalComposition?.sort((a, b) => a > b ? 1 : -1) || []
  
  const gemsBaseColours = gemsColours.length > 0 ?
    gemsColours
      .reduce((a, b) => { return a.concat(b) })
      .reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), [])
    : null
  const baseColours = gemsBaseColours?.sort((a, b) => a > b ? 1 : -1) || []

  const supprSearchElmt = (e) => {
    const value = e.target.id
    let search = [ ...searchArray ]
    const index = search.indexOf(value)
    search.splice(index, 1)
    setSearchArray(search.reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), []))
    if (search.length <= 0) {
      reinit()
    }
  }
  
  const reinit = () => {
    setSearchArray([])
    updateGemsList(gemsData)
  }

  const searching = (e) => {
    const value = e.target.id
    let search = [ ...searchArray ]
    const index = search.indexOf(value)
    if (index < 0) {
      search.push(value)
    } else {
      search.splice(index,1)
    }
    setSearchArray(search.reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), []))
    setSearchText("")
  }

  const searchFunction = () => {
    searchArray.forEach(search => {
      const keyword = search.toLowerCase()
      
      let tableau = gemsList.filter(gem =>
        gem.name.toLowerCase().includes(keyword) ||
        gem.nameOrigin.toLowerCase().includes(keyword) ||
        gem.descriptionVirtues.toLowerCase().includes(keyword))
        
      gemsList.forEach(gem => {
        for (const i in gem.chimicalComposition) {
          if (gem.chimicalComposition[ i ].toLowerCase().includes(keyword)) {
            tableau.push(gem)
          }
        }
        for (const i in gem.deposits) {
          if (gem.deposits[ i ].toLowerCase().includes(keyword)) {
            tableau.push(gem)
          }
        }
        for (const i in gem.colours) {
          if (gem.colours[ i ].toLowerCase().includes(keyword)) {
            tableau.push(gem)
          }
        }
        for (const i in gem.physicalVirtues) {
          if (gem.physicalVirtues[ i ].toLowerCase().includes(keyword)) {
            tableau.push(gem)
          }
        }
        for (const i in gem.psychologicalVirtues) {
          if (gem.psychologicalVirtues[ i ].toLowerCase().includes(keyword)) {
            tableau.push(gem)
          }
        }
      })
      let tab2 = tableau.reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), [])
      updateGemsList(tab2)
    })
    setSearchText("")
  }

  return (
    <StyledMainWrapper>
      
        {searchArray.length > 0 ? (<div style={{ display: "flex", flexFlow: "column wrap" }}>
          <div style={{ display: "flex", flexFlow: "wrap" }}>
            {searchArray.map((elmt, index) =>
              <CheckboxComponent
                key={`${elmt}-${index}`}
                elmt={elmt}
                onclick={supprSearchElmt}
                cross={true}
              />
            )}
          </div>
          <span style={{ alignSelf: "flex-end", textDecoration: "underline" }} onClick={() => reinit()}>Réinitialiser</span>
          <button value={searchText} onClick={() => searchFunction()}>Rechercher avec ces critères</button>
        </div>) : null}
        
        <label htmlFor="search">
          <input type="text" id="search" name="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          <button value={searchText} id={searchText} onClick={(e)=>searching(e)}>Ajouter</button>
        </label>
        <h4>Composition Chimique</h4>
        <div style={{display:"flex", flexFlow:"wrap"}}>
          {baseChimicalComposition.map((elmt, index) =>
            <CheckboxComponent
              key={`${elmt}-${index}`}
              elmt={elmt} 
              onclick={searching}
              cross={false}
            />
          )}
        </div>
        <h4>Couleur</h4>
        <div style={{display:"flex", flexFlow:"wrap"}}>
          {baseColours.map((elmt, index) =>
            <CheckboxComponent
              key={`${elmt}-${index}`}
              elmt={elmt} 
              onclick={searching}
            />
          )}
        </div>
      
    </StyledMainWrapper>
)
}

const StyledMainWrapper = styled.div`
  display:flex;
  flex-flow:column nowrap;
  flex:3;
  border:1px solid black;
  border-radius:15px;
  min-height:80vh;
  padding:1%
`