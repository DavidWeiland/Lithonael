import React, {useState} from "react";
import { useSelector, useStore } from 'react-redux'
import { selectAdmin } from '../../Utils/selectors'
import { signupAdmin, modifyAdmin } from '../../Features/admin'
import styled from "styled-components";
import { TitleOfPage } from "../../Components/TitleOfPage";
import { Button } from "../../Components/Button";
import colors from "../../Utils/Styles/colors";

export default function AdminApp() {
  const store = useStore()
  const [ identifiant, setIdentifiant ] = useState("")
  const [ password, setPassword ] = useState("")
  
  const admin = useSelector(selectAdmin)
  const adminId = admin.data?.adminId
  const token = admin.data?.token

  const body = {
    identifiant,
    password
  }

  function signup() {
    signupAdmin(store, body, token)
  }

  const modify = () => {
    modifyAdmin(store, body, adminId, token)
  }

  return (
    <div className='main_container'>
      <TitleOfPage>Employee Manager</TitleOfPage>
      <span>
        Pour créer un nouvel identifiant, vous devez vous rapproché d'un administrateur déjà enregistré. Celui-ci devra s'identifier pour créer le nouveau compte.
      </span>
      <StyledConnectContainer>
        <label htmlFor="Identifiant"> Identifiant :
         <StyledInput type='text' id='Identifiant' name='Identifiant' value={identifiant} onChange={(e) => setIdentifiant(e.target.value)} placeholder='Identifiant' />
        </label>
        
        <label htmlFor="Password"> Password :
            <StyledInput type='text' id='Password' name='Password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        </label>
        
      {admin.data?.name !== identifiant ?
        <Button style={{marginTop: '50px'}} action={signup}>Nouveau</Button> :
        <Button style={{marginTop: '50px'}} action={modify}>Modifier</Button>
      }
      </StyledConnectContainer>

      <div>
        Note : create route for read all employees. So admin can modify or delete an employee.
      </div>
    </div>
  );
}
const StyledConnectContainer = styled.div`
  background-color:${colors.secondary};
  display:flex;
  flex-flow:column;
  align-items:center;
  width:400px;
  height:500px;
  border-radius:10px;
  box-shadow: ${colors.boxShadowDark};
  padding-top:100px;
`
const StyledInput = styled.input`
  margin-bottom: 50px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  display: flex;
  align-items: center;
  width: 300px;
  height: 50px;
  border-radius:10px;
  border:0;
  box-shadow: inset ${colors.boxShadowDark};
  background-color: ${colors.primary};
`