import React, { useState } from 'react'
import PathCard from './Map/PathCard';
import { ToFetch } from './Services/ToFetchClass';

const User = ({id, username, address, login}) => {

    const [show, setShow] = useState(true);
    const [statePaths, setPaths] = useState([])

    const handleClick = () => {

        console.log(`Coucou ${id}`)
        setShow(!show)
        getPaths(id);

    }
    
    const getPaths = (id) => {

        const toFetch = new ToFetch(`/hikkers/${id}?with=paths`, 'GET')
        toFetch.launch()
        .then( ({data:{paths}}) => {
            setPaths(paths)
        } )
        .catch(err => console.error(err))

    }

    return (
        <div className='card border-success  text-center my-3'>
            <div className='card-header text-bg-success bg-gradient'>
                <h2 className='card-title'>
                {username}
                </h2>
                <h3 className='card-subtitle'>
                # {id}
                </h3>
            </div>
            <div className='card-body bg-success bg-gradient bg-opacity-50'>
                <p>
                    Address: {address}
                </p>
                <div className='d-flex flex-column flex-md-row justify-content-center align-items-lg-baseline'>
                    <span>
                        Envoyer un mail
                    </span>
                    <a href={`mailto:${login}`} className='btn ms-2'>
                        {login}
                    </a>
                </div>

                <button onClick={handleClick} className="btn btn-success m-3">Chemins de l'utilisateur</button>
                <div hidden={show}>
                    {   statePaths.length > 0 ?
                        statePaths.map((path)=>
                        <PathCard 
                            key={path.id} 
                            id={path.id} 
                            name={path.name} 
                            description={path.description} 
                            createdAt={path.createdAt}
                            withNavigate={false}    
                            />
                        )
                        :
                        <p>Aucun Chemin</p>
                    }
                </div>
            </div>
        </div>
  )
}

export default User