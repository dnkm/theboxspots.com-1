import Head from 'next/head';
import { useEffect, useState } from 'react';
import SiteContext from '../lib/site-context';
import '../styles/globals.css';
import { initializeAuth } from "firebase/auth";
import { firebaseApp } from '../lib/firebase';
import axios from 'axios';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    let [place, setPlace] = useState(null);
    let [pageTitle, setPageTitle] = useState("Box Spots");

    useEffect(() => {
        let fauth = initializeAuth(firebaseApp);
        let unsub = fauth.onAuthStateChanged(fb => fb ? onLogin(fb) : onLogout());

        return () => unsub();
    }, []);

    const onLogin = async (fb) => {
        let token = await fb.getIdToken(false);
        let p = (await axios.post(`/api/auth/place`, undefined, { headers: { authorization: `bearer ${token}` } })).data;

        if (p.first_name?.length) setPageTitle("Welcome " + p.first_name);

        setPlace(p);
    }

    const onLogout = () => {
        setPlace(null);
    }

    return (
        <SiteContext.Provider value={{ place, setPageTitle }}>
            <Head>
                <title>{pageTitle}</title>
            </Head>

            <Component {...pageProps} />
        </SiteContext.Provider>
    );
}