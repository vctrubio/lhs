import Banner from "@/components/Banner";
import NavBar from "@/components/NavBar";
import TigerEye from "@/components/TigerEye"
import { Logo } from "@/lib/utils";


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
        <NavBar flag={null} />
        <div className="banner-container">
          <Banner />
        </div>
      </div>
    </div>
  );
}
