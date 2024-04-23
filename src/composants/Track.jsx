import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../StateProvider";
import { CasReducer } from "../Constantes";


export default function Track() {

    const [{ token, currentPlaying }, dispatch] = useStateProvider();  

    useEffect(() => {
        const getTrack = async () => {
            //https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track
            const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );

          if (response.data !== "") {
            const currentPlaying = {
              id: response.data.item.id,
              name: response.data.item.name,
              artists: response.data.item.artists.map((artist) => artist.name),
              image: response.data.item.album.images[2].url,
            };
            dispatch({ type: CasReducer.SET_PLAYING, currentPlaying });
          } else {
            dispatch({ type: CasReducer.SET_PLAYING, currentPlaying: null });
          }
          console.log({response});

        };

        getTrack();

      }, [token, dispatch]);


  return (
    <Container>
      {currentPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={currentPlaying.image} alt="currentPlaying" />
          </div>
          <div className="track__info">
            <h4 className="track__info__track__name">{currentPlaying.name}</h4>
            <h6 className="track__info__track__artists">
              {currentPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
      )}
    </Container>
  )
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__image {
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      &__track__name {
        color: white;
      }
      &__track__artists {
        color: #b3b3b3;
      }
    }
  }
`;