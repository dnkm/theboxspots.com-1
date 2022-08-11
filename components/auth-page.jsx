import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import SiteContext from '../lib/site-context';

export default function AuthPage({ authed, redirect, ...props }) {
    let { place } = useContext(SiteContext);
    let router = useRouter();

    useEffect(() => {
        console.log(place);
        //if (Boolean(place) !== authed) router.replace(redirect);
    }, [place]);

    if (Boolean(place) !== authed)
        return <></>

    return <div {...props} />
}