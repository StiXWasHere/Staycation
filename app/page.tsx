'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/Header";
import Searchbar from "./components/Searchbar";
import { useRouter } from 'next/navigation';
import Link from "next/link";

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
            <Link href={'/listings?query=Stockholm'}>
            <div className="home-container-center-card">
              <div className="home-container-center-card-top">
                <img id="CityImg" src="/Stockholm.jpg" alt="Stockholm" />
              </div>
              <div className="home-container-center-card-bottom">
                <h4>Stockholm</h4>
              </div>
            </div>
            </Link>
            <Link href={'/listings?query=Göteborg'}>
            <div className="home-container-center-card">
              <div className="home-container-center-card-top">
                <img id="CityImg" src="/Göteborg.jpg" alt="Göteborg" />
              </div>
              <div className="home-container-center-card-bottom">
                <h4>Göteborg</h4>
              </div>
            </div>
            </Link>
            <Link href={'/listings?query=Malmö'}>
            <div className="home-container-center-card">
              <div className="home-container-center-card-top">
                <img id="CityImg" src="/Malmö.jpg" alt="Malmö" />
              </div>
              <div className="home-container-center-card-bottom">
                <h4>Malmö</h4>
              </div>
            </div>
            </Link>
            <Link href={'/listings?query=Karlskrona'}>
            <div className="home-container-center-card">
              <div className="home-container-center-card-top">
                <img id="CityImg" src="/Karlskrona.jpg" alt="Karlskrona" />
              </div>
              <div className="home-container-center-card-bottom">
                <h4>Karlskrona</h4>
              </div>
            </div>
            </Link>
            <Link href={'/listings?query=Visby'}>
            <div className="home-container-center-card">
              <div className="home-container-center-card-top">
                <img id="CityImg" src="/Visby.jpg" alt="Visby" />
              </div>
              <div className="home-container-center-card-bottom">
                <h4>Visby</h4>
              </div>
            </div>
            </Link>
            <Link href={'/listings?query='}>
            <div className="home-container-center-card">
              <div className="home-container-center-card-top">
                <img id="CityImg" src="/Sverige.jpg" alt="Sverige" />
              </div>
              <div className="home-container-center-card-bottom">
                <h4>Hela Sverige</h4>
              </div>
            </div>
            </Link>
          </div>
          <div className="home-container-bottom">

          </div>
        </div>
      </div>
    </>
  )
}
