import React from "react";
import axios from "axios";
import { useStateProvider } from "../StateProvider";
import { CasReducer } from "../Constantes";

import styled from "styled-components";
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsShuffle } from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";



export default function ControlButtons() {
    
    const [{ token, playerState }, dispatch] = useStateProvider();

    const changeState = async () => {
        const state = playerState ? "pause" : "play";
        //En pause, ou entrain de jouer
        //
        await axios.put(
          `https://api.spotify.com/v1/me/player/${state}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        dispatch({
          type: CasReducer.SET_PLAYER_STATE, playerState: !playerState,
        });
      };

    //Changer de chanson
    const changeTrack = async (type) => {
        //Here c'est un post
        await axios.post(`https://api.spotify.com/v1/me/player/${type}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        dispatch({ type: CasReducer.SET_PLAYER_STATE, playerState: true });
        const response1 = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response1.data !== "") {
          const currentPlaying = {
            id: response1.data.item.id,
            name: response1.data.item.name,
            artists: response1.data.item.artists.map((artist) => artist.name),
            image: response1.data.item.album.images[2].url,
          };
          dispatch({ type: CasReducer.SET_PLAYING, currentPlaying });
        } else {
          dispatch({ type: CasReducer.SET_PLAYING, currentPlaying: null });
        }
    };  

    return (

        <Container>
            <div className="shuffle">
                <BsShuffle />
            </div>
      
        <div className="Precedant">
            <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
        </div>

        <div className="etat">
            {playerState ? (
                <BsFillPauseCircleFill onClick={changeState} />
            ) : (
                <BsFillPlayCircleFill onClick={changeState} />
            )}
        </div>

        <div className="Suivant">
            <CgPlayTrackNext onClick={() => changeTrack("next")} />
        </div>

        <div className="repeat">
            <FiRepeat />
        </div>
        
        </Container>
    )
}


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .etat {
    svg {
      color: white;
    }
  }
  .Precedant,
  .Suivant,
  .etat {
    font-size: 2rem;
  }
`;