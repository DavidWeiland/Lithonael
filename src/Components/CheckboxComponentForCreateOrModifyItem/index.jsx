import styled from "styled-components"

export const CheckboxComponentForCreateOrModifyItem = ({ source, value, name, onClick }) => {
    
  const tagPusher = (e) => {
    const value = e.target.value
    const isChecked = e.target.checked
    let newTags = [...source]
    if (isChecked) {
      newTags.push(value)
    } else {
      const index = source.indexOf(value)
      newTags.splice(index, 1)
    }
    onClick(newTags.reduce((acc, element) => acc.includes(element) ? acc : acc.concat(element), []))
  }
  
  return (
    <StyledCheckboxInputWrapper>
      {source.indexOf(value) >= 0 ? (
        < input type='checkbox' value={value} id={name} onClick={(e) => tagPusher(e)} defaultChecked />
      ) : (
        <input type='checkbox' value={value} id={name} onClick={(e) => tagPusher(e)} />
      )}
      <label htmlFor={name}>{value}</label>
    </StyledCheckboxInputWrapper>
  )
}

const StyledCheckboxInputWrapper = styled.div`
  width:25%;
  font-size:13px;
  display:flex;
  flex-wrap: nowrap;
  justify-content:flex-start;
  align-items:center;
`