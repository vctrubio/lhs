import Banner from "@/components/Banner";
import NavBar from "@/components/NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort, faSearch } from '@fortawesome/free-solid-svg-icons';
import {  } from "@/components/Lhs"

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search for a flats, things to do..." />
    </div>
  )
}

const TigerEye = () => {
  return (
    <div id="tiger-eye">
      <input type="text" placeholder="a concept of living" />
    </div>
  )
}

const Logo = () => {
  return (
    <div id="logo">
      <div>L</div>
      <div>H</div>
      <div>S</div>
    </div>
  )
}

const Features = () => {
  return (
    <div>
      <ul>Coming up on this page to show...</ul>
      <li>-- search and appear flats and places --</li>
      <li>[btn] subcribe btn for weekly newsletter</li>
      <li>[btn] plan your next event</li>
      <li>[btn] Looking to buy?</li>
    </div>
  )
}

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Logo />
      <TigerEye />
      {/* <Features /> */}
    </div>
  )
}

export default function MainPage() {
  return (
    <div className="main">
      <div id="landing" className="flex justify-center w-full">
        <LandingPage />
      </div>
      <div>
        <NavBar flag={null}/>
        {/* <ClickWiggy /> */}
      </div>
    </div>
  );
}
