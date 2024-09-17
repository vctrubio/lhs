
import { ColorPalette } from "@/app/dev/colors";
import Link from "next/link";

const items = [
    "casas",
    "eventos",
    "madrid",
    "contacto"
]

const TopLogo = () => {
    return <div className="top-logo">
        <Link href="/">
            LHS
        </Link>
    </div>
}
const NavBar = ({ flag }) => {

    return (
        <div className="flex">
            {flag && <TopLogo />}
            <div className="navbar">
                {items.map((item) => (
                    <div key={item}>
                        <Link href={`/${item}`} className="w-full h-full">
                            {item}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default NavBar;