import DashBoard from './components/DashBoard';
import Form from './components/Form';
import Map  from './components/Map';

function App() {

  return (
    <>
      <div className='sticky-top'>
        <Map/>
      </div>
      <DashBoard />
      <Form />
    </>
  );
}

export default App;
