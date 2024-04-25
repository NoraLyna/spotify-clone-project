import React, {useEffect, useState} from "react";
import Login from './composants/Login.jsx';
import Layout from './composants/Layout.jsx'
import { useStateProvider } from './providers/StateProvider.jsx';
import { CasReducer } from './providers/Constantes.jsx';

export default function App() {
  const [{token}, dispatch] = useStateProvider ()
  useEffect(()=> {
    const hash = window.location.hash;
    if(hash) {
      const token = hash.substring(1).split("&")[0].split('=')[1];
      console.log(token);
      dispatch({type:CasReducer.SET_TOKEN, token})
    }
    //access_token=BQCIm9Imay0CrSnLcy2nU0VeYXiO0MqKqnyj1dXzvxbK2ep36A3PMfoqEOgEruibvkvrwf6n3xOAU1W2qqszxbMmIBLb4St-j9wd9gOW4e9fW-ELu6AtH9cCDdJe5hDTWebMfCPcDcoJl7_cHsOCfweF0DytLPvmOh8nKDXaGrt3jT_SAZNqkXy-1URTx20cm3VUzJiTx60xwt4wNhXbdkOX-wWkF3Tq49K-8egE&token_type=Bearer&expires_in=3600
    //On prend seulement le premier élément qui est le token 
    //et on enlève le access_token= en prenant le deuxième élément qui est le token
    //token = BQCIm9Imay0CrSnLcy2nU0VeYXiO0MqKqnyj1dXzvxbK2ep36A3PMfoqEOgEruibvkvrwf6n3xOAU1W2qqszxbMmIBLb4St-j9wd9gOW4e9fW-ELu6AtH9cCDdJe5hDTWebMfCPcDcoJl7_cHsOCfweF0DytLPvmOh8nKDXaGrt3jT_SAZNqkXy-1URTx20cm3VUzJiTx60xwt4wNhXbdkOX-wWkF3Tq49K-8egE
  },[token, dispatch])

  return ( 
    <div>
      {
        token ? <Layout /> : <Login/>

      }
    </div>
  );
}


