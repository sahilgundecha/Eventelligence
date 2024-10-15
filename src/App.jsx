import { useState, useEffect, useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './screens/Dashboard/Dashboard';
import LoginPage from './screens/LoginPage/Login';
import CopyJourney from './screens/CopyEventJourney/CopyEventJourney';
import { Route, Routes } from 'react-router-dom';
import { FormContext, FormProvider } from './utils/formContext';

function App() {
  // const [events, setEvents] = useState([]);

  const { setEvents } = useContext(FormContext);

  console.log({ setEvents });
  async function myFun() {
    const result = await fetch('http://localhost:3001/events');
    const data = await result.json();

    setEvents(data);
  }

  useEffect(() => {
    myFun();
  }, []);

  return (
    <>
      <Navbar />
      <div className='w-11/12 mx-auto'>
        <Routes>
          <Route element={<Dashboard />} path='/dashboard' />
          <Route element={<LoginPage />} path='/' />
          <Route element={<CopyJourney />} path='/event/copy' />
        </Routes>
      </div>
    </>
  );
}

export default App;
