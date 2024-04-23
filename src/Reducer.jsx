import { CasReducer } from "./Constantes";

export const initialState = {
    token: null,
    playlists : [],
    userInfo: null,
    //N'importe quelle playlist à afficher en premier, il suffit d'accéder à spotify et prendre le id qui est dans l'url
    selectedPlaylistId: '6KsWz7VBWVdhjyCooI46HM',
    selectedPlaylist: null,
    currentPlaying: null,
    playerState: false,
};

const reducer = (state,action) => {
    switch (action.type) {
        case CasReducer.SET_TOKEN : 
            return {
                ...state, token:action.token,
            };
        case CasReducer.SET_USER:
            return {
              ...state,
              userInfo: action.userInfo,
            };
        case CasReducer.SET_PLAYLISTS : 
            return {
                ...state, playlists:action.playlists,
            }
        case CasReducer.SET_PLAYLIST : {
            return {
                ...state, selectedPlaylist:action.selectedPlaylist,
            }
        }
        case CasReducer.SET_PLAYING : {
            return {
              ...state, currentPlaying: action.currentPlaying,
            };
        }
        case CasReducer.SET_PLAYER_STATE: {
            return {
              ...state,
              playerState: action.playerState,
            };
        }
        case CasReducer.SET_PLAYLIST_ID: {
            return {
              ...state,selectedPlaylistId: action.selectedPlaylistId,
            };
        }
              
        default :
            return state;
    }
};

export default reducer;