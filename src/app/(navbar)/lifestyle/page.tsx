import { LuluCard } from "@/components/Lhs"

const SubNow = () => {
    return (
        <div className="subscribe-now">
            <input placeholder="Subribe to my newsletter"></input>
            <button>√</button>
        </div>
    )
}

const WhatsNow = () => {
    return (
        <div className="subscribe-now">
            <input placeholder="Send me a Whatsapp"></input>
            <button>√</button>
        </div>
    )
} 

const www = () => {

    return (
        <>
            <ul>Contact page</ul>
            <li>Contact lourder</li>
            <li>About lourdes</li>
            <li>Reviews past events / buyers</li>
            <li>Where we are</li>
            <li>Like a place you like? Share it with us...</li>
        </>
    )
}

const FancyPants = () => {
    return (
        <div className="what-we-do">
            <div>
                <h2>Redefine Luxury Living.</h2>
                <div>Embrace a Distinct Brand.</div>
                <div>Experience a lifestyle in Madrid that illuminates new beginnings.</div>
                <h2>The Power of Transformation</h2>
                <div>On a mission to help you discover your authentic home... </div>
                <div>Where lifestyle meets identity.</div>
                <h2>We offer our services through a tailored experience,</h2>
                <div>by connecting exceptional individuals with their aspirations.</div>
                <h2>Delivering an authentic <span>Madrileño</span> lifestyle.</h2>
            </div>
        </div>

    )
}

const NextFlixChill = ({ title, content }) => {
    return (
        <div className="border border-black w-full my-2" style={{ height: '250px' }}>
            <h1>{title}</h1>
        </div>
    )
}

const CardsBait = () => {
    return (
        <div className="border border-black w-full flex flex-col gap-8 justify-center my-2" style={{ height: '250px', lineHeight: '12px' }}>
            <div>Plan Your Next Event</div>
            <div>Help us help you, Find your dream home</div>
            <div> &nbsp;&nbsp;&nbsp;&nbsp; - Form to find what you are looking for</div>
            <div> &nbsp;&nbsp;&nbsp;&nbsp; - Incredible houses / Sold</div>
            <div>What are clients are saying</div>
        </div>
    )
}

const ContactPage = () => {
    return (
        <div className="flex justify-center flex-col items-center" style={{marginBottom: '38px'}}>
            {/* <div className="flex flex-col h-screen w-full border border-black"> */}
            <div className="flex flex-col h-screen w-full ">
                <NextFlixChill title={'Blogs'} content={null} />
                <NextFlixChill title={'Weekly Newsletter'} content={null} />
                <CardsBait />
            </div>
            <div className="gap-8 justify-center items-center flex-mob">
                <FancyPants />
                <div className="flex flex-col gap-8">
                    <LuluCard />
                    <SubNow />
                    <WhatsNow/>
                </div>
            </div>

        </div>
    )
}

export default ContactPage;