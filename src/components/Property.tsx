import { House } from "@/types/house";
import Image from "next/image";
import Link from "next/link";
import { getTotalRooms } from "@/lib/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRulerCombined, faBed, faMapMarkerAlt, faBath } from '@fortawesome/free-solid-svg-icons'; // Import icons

function formatCurrency(value: number, rent: boolean = false): any {
    let formattedValue;
    if (value >= 1_000_000) {
        formattedValue = (value / 1_000_000).toFixed(1) + 'M';
    } else if (value >= 1_000) {
        formattedValue = (value / 1_000).toFixed(0) + 'K';
    } else {
        formattedValue = value.toLocaleString('de-DE');
    }

    return (
        <>
            {formattedValue} <span className="italic">€{rent ? '' : '/mes'}</span>
        </>
    );
}

interface DescBoxProps {
    text: string;
    icon: any;
}
const DescBox: React.FC<DescBoxProps> = ({ text, icon }) => {
    return (
        <div className="desc-box">
            <FontAwesomeIcon icon={icon} className="desc-icon" />
            <span>{text}</span>
        </div>
    );
};

export const PropertyCard = ({ house }: { house: House }) => {
    const coverPhoto = house.photos[0].fields.file.url.startsWith('http')
        ? house.photos[0].fields.file.url
        : `https:${house.photos[0].fields.file.url}`;

    return (
        <div className="property">
            <Link href={`/properties/${house.url}`}>
                <div className="property-title">
                    <h1>{house.title}</h1>
                    <h2>{formatCurrency(house.precio, house.buyOrRent)}</h2>
                </div>
                <div className="property-banner">
                    <Image
                        src={coverPhoto}
                        alt={house.title}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        priority
                    />
                    <div className="property-desc">
                        <DescBox text={`${house.totalArea} m²`} icon={faRulerCombined} /> {/* Square meters */}
                        {house.rooms.Dormitorios && <DescBox text={String(house.rooms.Dormitorios)} icon={faBed} />}
                        {house.rooms.Baños && <DescBox text={String(house.rooms.Baños)} icon={faBath} />}
                        <DescBox text={String(house.barrioRef?.name)} icon={faMapMarkerAlt} /> {/* Location */}
                    </div>
                </div>
            </Link>
        </div >
    );
};
