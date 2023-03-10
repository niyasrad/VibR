import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie'
import './home.css';
import dash from '../../assets/dash.png';
import mobdash from '../../assets/dash-mobile.png';
import Card from "../../component/card/Card";

import axios from 'axios';


const { UserTop} = require('react-spotify-api');
const { SpotifyApiContext, SpotifyAuth, Scopes } = require('react-spotify-auth');

export default function Home(props: any) {
    async function queryModels(limit: number) {
        axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=" + limit +"&offset=0", { headers: {"Authorization" : `Bearer ${token}`} })
        .then(function (response) {
            setTop(response);
          })
        .catch(function (error) {
            // handle error
            console.log(error);
            Cookies.remove('spotifyAuthToken', { path: '', domain: '' })
        })
    }
    async function queryName() {
        axios.get("https://api.spotify.com/v1/me", { headers: {"Authorization" : `Bearer ${token}`} })
        .then(function (response) {
            setUser(response.data.display_name);
            console.log("Response:", response)
          })
        .catch(function (error) {
            // handle error
            console.log(error);
            Cookies.remove('spotifyAuthToken', { path: '', domain: '' })
        })
    }
    const [token, setToken] = React.useState(Cookies.get("spotifyAuthToken"))
    const [user, setUser] = React.useState("Rad");
    const [top, setTop] = useState({});
    useEffect(() => { 
        if (token) {
            setTop(queryModels(3));
        }
        queryName();
        
        
    }, [token])
    console.log(top);
    const componentRef = useRef<any>(null);
    const componentRef1 = useRef<any>(null); 
    return (
        <div id="home" className="home-page">
            <h1 className='home-par'>Share your Most Liked Songs this <span className='home-strike'>year</span> <span className='home-green'>week</span>.</h1>
            {Object.keys(top).length !== 0 &&
                <div style={{ position: 'absolute', right: '120%'}}>
                    <Card ref={componentRef} user={user} custom={true} items={top} limit={3}/>
                </div>
            }
            {token ? 
                (Object.keys(top).length !== 0 ?
                <div className='home-button' onClick={() => exportComponentAsJPEG(componentRef, { html2CanvasOptions: {backgroundColor: "#0C0C0C", allowTaint: true}})}>GET YOUR <span className='home-green'>CARD</span></div>
                :
                <div className="loadingio-spinner-rolling-s4w34mo1ahn"><div className="ldio-xluxjqkwgl"><div></div></div></div>
                ):
                <SpotifyAuth
                    redirectUri='https://vib-r.vercel.app/'
                    clientID='b003c3bcc93049dab0337f6437419ceb'
                    scopes={['user-read-email', 'user-top-read']} // either style will work
                    onAccessToken={(token: any) => setToken(token)}
                    title="LOGIN"
                    noLogo={true}
                    btnClassName="home-button"
                />
            }
            
            <div className="home-display-desktop">
                {Object.keys(top).length !== 0 ?
                    <div>
                        <Card ref={componentRef1} user={user} custom={true} items={top} limit={3}/>
                    </div> : <Card user={user} custom={false} items={{}} limit={3}/>
                }
            </div>
            <div className="home-display-tablet">
                {Object.keys(top).length !== 0 ?
                    <div>
                        <Card ref={componentRef1} user={user} custom={true} items={top} limit={2}/>
                    </div> : <Card user={user} custom={false} items={{}} limit={2}/>
                }
            </div>
            <div className="home-display-mobile">
                {Object.keys(top).length !== 0 ?
                    <div>
                        <Card ref={componentRef1} user={user} custom={true} items={top} limit={1}/>
                    </div> : <Card user={user} custom={false} items={{}} limit={1}/>
                }
            </div>
        </div>
    )
}