import React, {useEffect, useRef,useState} from "react";
import styled from "styled-components";
import { CasReducer } from "../Constantes";
import axios from "axios";
import Sidebar from "./Sidebar";
import Corps from "./Corps";
import Navbar from "./Navigation";
import Footer from "./Footer";
import { useStateProvider } from "../StateProvider";

export default function Layout() {

    const [{ token }, dispatch] = useStateProvider() ;


    const [navBackground, setNavBackground] = useState(false);

    const [headerBackground, setHeaderBackground] = useState(false);

    const bodyRef = useRef();

    const bodyScrolled = () => {
        bodyRef.current.scrollTop >= 30
          ? setNavBackground(true)
          : setNavBackground(false);
        bodyRef.current.scrollTop >= 268
          ? setHeaderBackground(true)
          : setHeaderBackground(false);
      };

    useEffect(() => {
        const getUserInfo = async () => {
            //From Get Current User's Profile https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
          const { data } = await axios.get("https://api.spotify.com/v1/me", {
            //Doesn't change
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          });
            const userInfo = {
                userId: data.id,
                userUrl: data.external_urls.spotify,
                name: data.display_name,
            };
            dispatch({ type: CasReducer.SET_USER, userInfo });   
        };
        getUserInfo();   
        }, [dispatch, token]);

    return <Container>
        <div className="Layout_Body">
            <Sidebar/>
            <div className="Body" ref={bodyRef} onScroll={bodyScrolled}>
                <Navbar navBackground={navBackground}/>
                <div className="Body_Contents">
                    <Corps headerBackground={headerBackground} />
                </div>
            </div>
        </div>
        <div className="Layout_Footer">
            <Footer />
        </div>
    </Container>
}

const Container = styled.div`
max-width: 100vw;
max-height: 100vh;
overflow: hidden;
display: grid;
grid-template-rows: 85vh 15vh;
.Layout_Body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 145, 100);
    .Body {
        height: 100%;
        width: 100%;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0.7rem;
            max-height: 2rem;
            &-thumb {
              background-color: rgba(255, 255, 255, 0.6);
            }
        }
    }
}
`;