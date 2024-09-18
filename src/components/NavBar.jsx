
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';

const items = [
    "events",
    "properties",
    "lifestyle",
]

const TopLogo = () => {
    return <div className="top-logo">
        <Link href="/">
            LHS
        </Link>
    </div>
}

const LeftFootBar = () => {
    return (
        <div className="call-to-action">
            <div>
                <FontAwesomeIcon icon={faWhatsapp} size="2x" />
            </div>
            <div>
                <FontAwesomeIcon icon={faInstagram} size="2x" />
            </div>
            <div>
                <FontAwesomeIcon icon={faTelegram} size="2x" />
            </div>
        </div>
    );
}

const NavBar = ({ flag }) => {
    return (
        <div >
            {flag && (
                <>
                    <TopLogo />
                    <LeftFootBar />
                </>
            )}
            <div className="six-ways">
                {items.map((item) => (
                    <div key={item}>
                        <Link href={`/${item}`} className="w-full h-full">
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NavBar;