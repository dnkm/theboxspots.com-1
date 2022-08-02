import { Client } from 'pg';
import firebaseAuth from './firebaseAuth';

const client = new Client();
client.connect();

/**
 * 
 * @param {*} req - Request object from REST
 * @param {('place'|'tourist')} type - Auth type
 * @returns User information
 */

export async function getAuth(req, type) {
    try {
        let token = req.headers?.authorization;
        if (!token) throw null;

        token = token.split(" ")[1];
        if (!token) throw null;

        let { uid, firebase } = await firebaseAuth.verifyIdToken(token);

        switch (firebase.sign_in_provider) {
            case 'password': // Place
                if (type !== "place") throw null;

                let place = await client.query(`SELECT * FROM place WHERE firebase_id = $1`, [uid]);

                if (place.rowCount === 0)
                    place = await client.query(`INSERT INTO place(firebase_id, created_at) VALUES ($1, $2) RETURNING *`, [uid, new Date()]);

                return place.rows[0];

            case 'google.com': // TODO - User

        }


    } catch (error) { console.error(error); return null; }
}