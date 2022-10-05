import Map  from '../components/Map';


const Home = ({isEdit}) => {

  return (
    <>
      <div className='sticky-top'>
        <Map isEdit={isEdit}/>
      </div>
    </>  
    )
}

export default Home