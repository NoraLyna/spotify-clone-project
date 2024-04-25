import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../providers/StateProvider";
import { AiFillClockCircle } from "react-icons/ai";
import { CasReducer } from "../providers/Constantes";


export default function Corps({ headerBackground }){
  
  //Pour changer la duration de ms à mm:ss
  const msChange = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  //On a besoin de l'id pour changer à chaque fois et avoir l'info
  const [{ token, selectedPlaylistId, selectedPlaylist}, dispatch] = useStateProvider();

  //On affiche une playlist lambda qui s'affichera en premier
  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        //la docu : https://developer.spotify.com/documentation/web-api/reference/get-playlist, https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n, dans l'exemple ils ont mis
        // directement une playlist, on utilise la selectedPlaylistId qui est définit dans Reducer
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          //Ne change pas
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlaylist = {
        //Informations de Response
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          //La durée est en ms, il faut la changer
          duration: track.duration_ms,
          album: track.album.name,
          //on en a besoin pour changer la chanson
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({ type: CasReducer.SET_PLAYLIST, selectedPlaylist });
    };
    getInitialPlaylist();

  }, [token, dispatch, selectedPlaylistId]);


  return (
    <Container headerBackground={headerBackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="selected playlist" />
            </div>
            <div className="details">
              <span className="type">Playlist</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header-row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>Titre</span>
              </div>
              <div className="col">
                <span>Album</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  }, index) => 
                  
                  {
                  return ( 
                    <div className="row" key={id} onClick = { () => 
                        PlayTrack( 
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }>
                    
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>

                      <div className="col detail">

                        <div className="image">
                          <img src={image} alt="track" />
                        </div>

                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>

                      </div>

                      <div className="col">
                        <span>{album}</span>
                      </div>

                      <div className="col">
                        <span>{msChange(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>       
          </div>
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list {
    .header-row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      margin: 1rem 0 0 0;
      color: #dddcdc;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerBackground }) => headerBackground ? "#000000dc" : "none"};
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
            width: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`;