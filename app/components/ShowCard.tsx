import Link from "next/link";
import { Show } from "../types/Show";
import Image from 'next/image';

import styles from './showCard.module.css';

const ShowCard = ({ show }: { show: Show }) => {
    return (
        <div key={show.id} className={styles.showCard}>
            <Link href={`/show/${show.id}`}>
                {show.poster_path && (
                    <Image
                        className={styles.cardImage}
                        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                        alt={`Poster of ${show.name}`}
                        width={275}
                        height={400}
                        loading="lazy"
                    />
                )}
                <div>
                    <h2 className={styles.cardTitle}>{show.name}</h2>
                    {show.name !== show.original_name && <p className={styles.cardOriginalTitle}>{show.original_name}</p>}
                    <p className={styles.cardScore}>Rating: {show.vote_average}</p>
                </div>
            </Link>
        </div>
    )
}

export default ShowCard;