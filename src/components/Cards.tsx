
import { House } from "@/types/house";
import Image from 'next/image';
import Link from 'next/link';

interface CardHouseProps {
    house: House;
}

function formatCurrency(value: number, rent: boolean = false): any {
    const formattedValue = value.toLocaleString('de-DE');
    return (
        <>
            {formattedValue} <span className="italic">€{rent ? '' : '/mes'}</span>
        </>
    );
}

function getRentOrBuyText(buyOrRent: boolean): string {
    return buyOrRent ? 'buy' : 'rent';
}


export const CardHouse: React.FC<CardHouseProps> = ({ house }) => {
    console.log("🚀 ~ house:", house)

    //**find a default house if not available 
    const coverPhoto = house.photos[0].fields.file.url.startsWith('http')
        ? house.photos[0].fields.file.url
        : `https:${house.photos[0].fields.file.url}`;

    return (
        <Link href={`/casas/${house.url}`}>
            <div className="card">
                <div className="cover">
                    <Image
                        src={coverPhoto}
                        alt={house.title}
                        layout="fill"
                        objectFit="cover"
                        loading="lazy"
                        quality={100}
                    />
                    <div id='rent-or-buy'>{getRentOrBuyText(house.buyOrRent)}</div>                </div>
                <div className="desc">
                    <div>
                        <div>m2</div>
                        <div>rooms</div>
                        <div>hood</div>
                    </div>
                    <div>
                        <div>{formatCurrency(house.precio, house.buyOrRent)}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
}