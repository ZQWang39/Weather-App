import "./App.scss";
import GetWeather from "./components/GetWeather/GetWeather.jsx";
import Footer from "./components/Footer/Footer.jsx";
import GetCurrentWeather from "./components/GetCurrentWeather/GetCurrentWeather.jsx";
import Header from "components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <GetCurrentWeather />
      <GetWeather />
      <Footer />
    </div>
  );
}

export default App;
