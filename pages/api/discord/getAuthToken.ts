import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import cookie from 'cookie';
import { access } from 'fs';

const {
    DISCORD_SERVER_ID,
    DISCORD_CLIENT_SECRET,
    DISCORD_CLIENT_ID,
    APP_URI,
    JWT_SECRET,
    COOKIE_NAME, 
} = process.env;

// Create scopes, oauth querystring and URIs
const scope = ["guilds"].join(" ");
const REDIRECT_URI = `${APP_URI}/api/discord/getAuthToken`;

console.log("REDIRECT_URI", REDIRECT_URI);
console.log("DISCORDSERVERID", DISCORD_SERVER_ID);
console.log("DISCORDCLIENTID", DISCORD_CLIENT_ID);
console.log("APPURI", APP_URI);


const OAUTH_QS = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID || "0",
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope,
}).toString();

const OAUTH_URI = `https://discord.com/api/oauth2/authorize?${OAUTH_QS}`;

export default async function getAuthToken(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.redirect("/");
    
    // Find the code or error from the request querystring
    const { code = null, error = null } = req.query;

    // If there is an error, redirect to the index page
    if (error) {
        return res.redirect("/?error=oauth");
    }

    // If there is no code, redirect to the OAuth URI
    if (!code || typeof code !== "string") return res.redirect(OAUTH_URI);
    console.log("code: ", code)

    const body = new URLSearchParams({
        client_id: DISCORD_CLIENT_ID!,
        client_secret: DISCORD_CLIENT_SECRET!,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
        code,
        scope,
    }).toString();

    // Request our access token, defaulting it to null if something goes wrong
    const {access_token = null}:any = await fetch(
        "https://discord.com/api/oauth2/token",
        {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "POST",
            body,
        }
    ).then((res) => res.json());

    // If the access token does not exist, return
    if (!access_token || typeof access_token !== "string") {
        return res.redirect(OAUTH_URI);
    }

    console.log("eventLink: ", `http://discord.com/api/guilds/${DISCORD_SERVER_ID}/scheduled-events`, "access_token: ", access_token);
    // Fetch scheduled guild events (uses the "guild" scope)
    const guild:any | { unauthorized: true } = await fetch(
        `http://discord.com/api/guilds/${DISCORD_SERVER_ID}/scheduled-events`,
        {
            headers: { "Authorization": `Bearer ${access_token}` },
        }
    ).then((res) => res.json());

    console.log(guild)

    // If the id does not exist in the response body, request reauthorization
    // if (!("id" in me)) {
    //     return res.redirect(OAUTH_URI);
    // }

    // Sign a JWT with the payload of the current user...
    // const token = jwt.sign(me, JWT_SECRET!, { expiresIn: "24h" });

    // ...and set it as a header
    // res.setHeader(
    //     "Set-Cookie",
    //     cookie.serialize(COOKIE_NAME!, token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV !== "development",
    //     sameSite: "lax",
    //     path: "/",
    //     })
    // );

    // Redirect back to the homepage
    // res.redirect("/");

    try{
        const clientID = '958615047595249684'
        const secret = 'NL1WMxmtLeCou5U3k9G7_tcf8DmU-OS4'
        // const auth = await fetch(
        //    `https://discord.com/api/oauth2/authorize?client_id=${clientID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fdiscord%2FeventList&response_type=code&scope=guilds`).then(res => res.headers)
        // const events = await fetch(
        //     'https://discord.com/api/guilds/913694033031864350/scheduled-events',
        //     {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': 'Bearer CZhtkLDpNYXgPH9Ml6shqh2OwykChw'
        //         }
        //     }
        // ).then(res => res.json())
        console.log(auth)

        res.status(200).json(auth)
    } catch (e){
        console.log(e)
        res.status(500).json({ error: e })
    }
}