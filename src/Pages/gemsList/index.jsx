import React from "react";
import { Link } from "react-router-dom";
import { selectGems } from "../../Utils/selectors";
import { useSelector } from "react-redux";

export default function GemsList() {
  
  const gemsStatus = useSelector(selectGems).status
  const gemsList = useSelector(selectGems).data?.gemsList
  
  return (
    <div>
      <span>Status : {gemsStatus}</span>
      <ul>
      {gemsList?.map((index) =>
        <li
          key={`${index}-${index.name}`}
        > {index.name}
          <img src={index.image} alt={index.name} style={{maxWidth:'50px', maxHeight:'50px'}} />
          <Link to={`/wikigems/${index._id}`}>Vers la fiche de {index.name}</Link>
        </li>
      )}
      </ul>
    </div>
)
}