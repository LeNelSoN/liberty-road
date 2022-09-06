import { useCallback } from "react"
import { MdWhereToVote as HereIcon} from "react-icons/md";


function Location({ map }) {

    const onClick = useCallback(() => {
      map.locate({setView: true})
    }, 
    [map])
  
    return (
        <button className="position-absolute top-0 start-100 translate-middle p-2 btn btn-secondary btn-lg" onClick={onClick}>
            <HereIcon/>
        </button>
    )
  }
export default Location;