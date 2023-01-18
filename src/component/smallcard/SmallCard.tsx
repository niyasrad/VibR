import React from "react";
import './smallcard.css';

export default function SmallCard(props: any) {
    return (
        <div className='small-card'>
            <img src={props.img} alt="" />
            <p className='title'>{props.title}</p>
            <p className='artist'>{props.artist}</p>
        </div>
    )
}