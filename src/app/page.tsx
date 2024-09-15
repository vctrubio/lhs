import Banner from "@/components/Banner";
import NavBar from "@/components/NavBar";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search for a flats, things to do..." />
    </div>
  )
}

const Logo = () => {
  return (
    <div id="logo">
      LHS Concept [Logo]<br></br>Luxury Flats and Lifestyle Madrid [Desscription]
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
      <SearchBar />
      <Features />
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
        <NavBar />
        <Banner />
      </div>
    </div>
  );
}
