import logo from './logo.svg';
import Home from './screens/Home';
import {Route,Routes} from 'react-router-dom'
import UserInfo from './screens/UserInfo';
import ThankYou from './screens/ThankYou';

function App() {
  return (
    <div className="App">
      <Routes>
         <Route path='/upload' element={<Home />} />
         <Route path="/details" element={<UserInfo />} /> 
         <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </div>
  );
}

export default App;
