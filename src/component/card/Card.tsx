import React, { forwardRef } from "react";
import './card.css';
import vibr from '../../assets/vibr.png';
import SmallCard from "../smallcard/SmallCard";
import { StringLiteralLike } from "typescript";
import closer from '../../assets/closer.png';
import kokuhaku from '../../assets/kokuhaku.png';
import dynamite from '../../assets/dynamite.png';
import { url } from "inspector";

interface cardProps{
    user: string;
    custom: boolean;
    items: any;
    limit: number;
}

const Card = forwardRef((props: cardProps, ref: any) => {

    interface smallCard{
        artist: string;
        title: string;
        img: string;
    }
    const db: Array<smallCard> = [
        {artist: "Asuza", title: "Kokuhaku", img: kokuhaku},
        {artist: "Joe Inoue", title: "CLOSER", img: closer},
        {artist: "BTS", title: "Dynamite", img: dynamite}
    ]
    
    return (
        <div className={props.limit === 3? "big-card" : "auto-card"} ref={ref}>
            <div className="big-cards">
                {props.custom ? 
                    props.items.data.items.slice(0, props.limit).map((s: any) => (
                    <SmallCard artist={s.album.artists[0].name}  title={s.name} img={s.album.images[1]['url']}/>
                ))
                :db.slice(0, props.limit).map(s => (
                    <SmallCard artist={s.artist} title={s.title} img={s.img} />
                )) }
            </div>
            <div className={props.limit === 3? "big-cards-two" : "big-cards-three"}>
                <h1>{props.user}'s Week</h1>
                <img src={vibr} alt='' className='' />
            </div>
        </div>
    )
})

export default Card;