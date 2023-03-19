import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Event from './Event';
// import Header from './components/Header';
// import {Container} from './components/styles/Container.styled'
import EventList from './EventList';
import Navbar from './Navbar';
 
function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
        
          <Route path="/" element={ <Navigate to="/events" /> } />

          <Route path="/events" element={<EventList />} />
          <Route path="/event/:id" element={<Event />} />
          
        </Routes>
      </BrowserRouter>
      
      
      


    </>
    );
}

export default App;
