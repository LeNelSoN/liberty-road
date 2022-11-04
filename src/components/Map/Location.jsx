import { useCallback } from "react"
import { MdWhereToVote } from "react-icons/md";

function Location({ map, locateIsDisable }) {

    const onClick = useCallback(() => {
      map.locate({setView: true})
    }, 
    [map])
      
    return (
        <button className="btn btn-link text-primary" onClick={onClick} disabled={locateIsDisable}>
            <MdWhereToVote className="h1"/>
        </button>
    )
  }
export default Location;