import React, {useState} from "react";
import { useSelector, useStore } from 'react-redux'
import { selectAdmin } from '../../Utils/selectors'
import { signupAdmin, loginAdmin, modifyAdmin, resetAdmin } from '../../Features/admin'

export default function AdminApp() {
  const store = useStore()
  const [ identifiant, setIdentifiant ] = useState("David")
  const [ password, setPassword ] = useState("123")
  
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

  const login = () => {
    loginAdmin(store, body)
  }
  
  const reset = () => {
    resetAdmin(store)
  }

  const connected = (
    <div>
      {admin.data?.name !== identifiant ?
        <button onClick={signup}>Nouveau</button> :
        <div><button onClick={modify}>Modifier</button>
          <button onClick={reset}>Se déconnecter</button></div>}
    </div>)

  return (
    <div>
      <h1>Bonjour {admin.data?.name},</h1>
      <form>
        <label htmlFor="Identifiant"> Identifiant :</label>
        <input type='text' id='Identifiant' name='Identifiant' value={identifiant} onChange={(e) => setIdentifiant(e.target.value)} />
        <label htmlFor="Password"> Password :</label>
        <input type='text' id='Password' name='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </form>
      <span>
        Pour créer un nouvel identifiant, vous devez vous rapproché d'un administrateur déjà enregistré. Celui-ci devra s'identifier pour créer le nouveau compte.
      </span>
      
      <br/><br/>
      {(adminId) ? connected :
        <button onClick={login}>Se connecter</button>}
    </div>
  );
}
