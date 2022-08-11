import Head from "next/head";
import { useEffect, useState } from "react";
import SiteContext from "../lib/site-context";
import "../styles/globals.css";
import { initializeAuth } from "firebase/auth";
import { firebaseApp } from "../lib/firebase";
import axios from "axios";
import { onLog } from "firebase/app";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  let [place, setPlace] = useState(null);
  let [pageTitle, setPageTitle] = useState("Box Spots");
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    let data = sessionStorage.getItem("isLoggedIn");
    let fauth = initializeAuth(firebaseApp);

    if (data) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      setLoading(false);
    }

    let unsub = fauth.onAuthStateChanged((fb) => {
      if (fb) {
        setLoading(false);
        onLogin(fb);
      } else {
        // onLogout();
      }
    });

    return () => unsub();
  }, []);

  const onLogin = async (fb) => {
    let token = await fb.getIdToken(false);
    let p = (
      await axios.post(`/api/auth/place`, undefined, {
        headers: { authorization: `bearer ${token}` },
      })
    ).data;
    if (p.first_name?.length) setPageTitle("Welcome " + p.first_name);
    setPlace(p);

    // sessionStorage.setItem("p", JSON.stringify(p));
    localStorage.setItem("isLoggedIn", "true");
  };

  const onLogout = () => {
    let fauth = initializeAuth(firebaseApp);
    signOut(fauth);

    setPlace(null);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <SiteContext.Provider value={{ place, setPageTitle, onLogout }}>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      {loading && <FullScreenLoading />}
      <Component {...pageProps} />
    </SiteContext.Provider>
  );
}


function FullScreenLoading()  {
    return <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 40
    }}>
        loading...
    </div>
}