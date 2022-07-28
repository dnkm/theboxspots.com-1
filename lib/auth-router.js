import { useRouter } from 'next/router';
import { useContext } from 'react';
import SiteContext from '../lib/site-context';

export default function AuthRouter({ authed, redirect }) {
    let { place } = useContext(SiteContext);
    let router = useRouter();

    if (Boolean(place) !== authed) router.replace(redirect);

    return <></>
}