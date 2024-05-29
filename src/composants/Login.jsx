import React from "react";
import styled from "styled-components";

export default function Login() {

    const handleClick = () => {
        //Le client ID est dispo sur le site spotify dev après avoir créé un projet
        const client_id = "";
        const redirectUrl = "http://localhost:5173/";
        const apiUrl = "https://accounts.spotify.com/authorize";
        //Nous redirige vers le login
       
        //Scopes are needed when implementing some of the authorization grant types.
        //Scopes provide Spotify users using third-party apps the confidence that only the information they choose to share will be shared, and nothing more
        const scope = [
            "user-read-private",
            "user-read-email", 

            "user-read-playback-state",
            "user-modify-playback-state",
            "user-read-currently-playing", 

            "user-read-playback-position", 
            "user-top-read", 
            "user-read-recently-played"];
        //"user-read-email", "user-read-private" : Scope Users : on a les informations de l'utilisateur
        //"user-read-playback-state","user-modify-playback-state","user-read-currently-playing" : Scope Connect : toute les actions qu'on va faire seront en utilisant ce scope, le reste fetch juste les informations déjà existantes
        //"user-read-playback-position", "user-top-read", "user-read-recently-played" : scope Listening history
        window.location.href = `${apiUrl}?client_id=${client_id}&redirect_uri=${redirectUrl}&scope=${scope.join(
            " "
        )}&response_type=token&show_dialog=true`;
    };
    //Important !! Il faut avoir premium
    //access token créé et qui s'ajoute à l'URL : #access_token=&token_type=Bearer&expires_in=3600
    
    return <Container>
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png" alt="logo"/>
        <button onClick={handleClick}>Se connecter à Spotify</button>
    </Container>
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-color: #1db954;
    gap: 5rem;
    button {
        padding: 1rem 5rem;
        border-radius: 5rem;
        background-color: black;
        color: #49f585;
        border: none;
        font-size: 1.4rem;
        cursor: pointer;
    }
    img {
        height: 20vh;
    }
`;
