import React, {useState} from "react";
import { useSelector, useStore } from 'react-redux'
import { selectAdmin } from '../../Utils/selectors'
import { signupAdmin, modifyAdmin } from '../../Features/admin'

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
    <div>
      <span>
        Pour créer un nouvel identifiant, vous devez vous rapproché d'un administrateur déjà enregistré. Celui-ci devra s'identifier pour créer le nouveau compte.
      </span>
      <form>
        <label htmlFor="Identifiant"> Identifiant :</label>
        <input type='text' id='Identifiant' name='Identifiant' value={identifiant} onChange={(e) => setIdentifiant(e.target.value)} />
        <label htmlFor="Password"> Password :</label>
        <input type='text' id='Password' name='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </form>
      {admin.data?.name !== identifiant ?
        <button onClick={signup}>Nouveau</button> :
        <button onClick={modify}>Modifier</button>
      }
    </div>
  );
}
