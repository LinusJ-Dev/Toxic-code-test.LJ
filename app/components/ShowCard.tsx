import Link from "next/link";
import { Show } from "../types/Show";
import Image from 'next/image';

const ShowCard = ({ show }: { show: Show }) => {
    return (
        <div key={show.id} className="show-card">
            <Link href={`/show/${show.id}`}>
                {show.poster_path && (
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                        alt={`Poster of ${show.name}`}
                        width={200}
                        height={300}
                    />
                )}
                <div className="show-info">
                    <h2>{show.name}</h2>
                    {show.name !== show.original_name && <p>{show.original_name}</p>}
                    <p>Rating: {show.vote_average}</p>
                </div>
            </Link>
        </div>
    )
}

export default ShowCard;