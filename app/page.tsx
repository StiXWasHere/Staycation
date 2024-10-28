import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/Header";
import Searchbar from "./components/Searchbar";

export default function Home() {
  
  return (
    <>
      <Header/>
      <div className="home">
        <div className="home-container">
          <div className="home-container-top">
            <h2>Vart vill du boka?</h2>
            <Searchbar/>
            <h3 id="Slogan">Upptäck världen hemifrån - din bästa semester väntar runt hörnet!</h3>
          </div>
          <div className="home-container-center">
            <div className="home-container-center-card">
              <div className="home-container-center-card-top">
                <img id="CityImg" src="../images/Stockholm.jpg" alt="Stockholm" />
              </div>
              <div className="home-container-center-card-bottom">
                <h4>Stockholm</h4>
              </div>
            </div>
            <div className="home-container-center-card">
              <div className="home-container-center-card-top">
                <img id="CityImg" src="../images/Göteborg.jpg" alt="Göteborg" />
              </div>
              <div className="home-container-center-card-bottom">
                <h4>Göteborg</h4>
              </div>
            </div>
            <div className="home-container-center-card">
              <div className="home-container-center-card-top">
                <img id="CityImg" src="../images/Malmö.jpg" alt="Malmö" />
              </div>
              <div className="home-container-center-card-bottom">
                <h4>Malmö</h4>
              </div>
            </div>
            <div className="home-container-center-card">
              <div className="home-container-center-card-top">
                <img id="CityImg" src="/images/Stockholm.jpg" alt="Stockholm" />
              </div>
              <div className="home-container-center-card-bottom">
                <h4>Test</h4>
              </div>
            </div>
            <div className="home-container-center-card">
              <div className="home-container-center-card-top">
                <img id="CityImg" src="/images/Stockholm.jpg" alt="Stockholm" />
              </div>
              <div className="home-container-center-card-bottom">
                <h4>Test</h4>
              </div>
            </div>
          </div>
          <div className="home-container-bottom">

          </div>
        </div>
      </div>
    </>
  )
}
