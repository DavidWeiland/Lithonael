import React, { useState } from "react";
import { selectGems } from "../../Utils/selectors";
import { useSelector } from "react-redux";
import { Loader } from "../../Utils/Styles/Loader";
import { LithoCard } from "../../Components/Card";
import SearchComponent from "../../Components/SearchComponent"

export default function GemsList() {
  const gemsStatus = useSelector(selectGems).status
  const gemsData = useSelector(selectGems).data ?? {}
  const [gemsList, setGemsList] = useState(gemsData ?? [])

  if (gemsStatus === 'pending' || gemsStatus === 'updating') {
    return (
      <Loader />
    )
  }

  return (
    <div className="main_container_with_search">
      
      <SearchComponent gemsData={gemsData} gemsList={gemsList} updateGemsList={setGemsList} />

     <div style={{display:"flex", flexFlow:"wrap", flex:9}}>
        {gemsList?.map(({index, name, image, _id}) =>
          <LithoCard
            key={`${index}-${name}`}
            objet="pierre"
            id={_id}
            name={name}
            image={image}
          />
        )}
      </div>
      
    </div>
)
}
