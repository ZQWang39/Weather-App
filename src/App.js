import './App.scss';
import GetWeather from './components/GetWeather/GetWeather.jsx'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'

function App() {
  return (
    <div className="App">
      <Header />
      <GetWeather />
      <Footer />     
    </div>
  );
}

export default App;
