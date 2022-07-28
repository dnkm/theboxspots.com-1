import { getAuth } from "../../../lib/db";

// Returns place information if authed
export default async function handler(req, res) {
    let place = await getAuth(req);

    if (!place) res.status(403).end();
    else res.status(200).json(place);
}