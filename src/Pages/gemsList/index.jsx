import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { selectGems } from "../../Utils/selectors";
import { getAllGems } from "../../Features/gems";
import { useSelector, useStore } from "react-redux";

export default function GemsList() {
  const store = useStore()
  useEffect(() => {
    getAllGems(store)
  }, [ store ])
  
  const GemsStatus = useSelector(selectGems).status
  const GemsData = useSelector(selectGems).data
  
  return (
    <div>
      <span>Status : {GemsStatus}</span>
      <ul>
      {GemsData?.map((index) =>
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