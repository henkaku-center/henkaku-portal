import cookie from "cookie";

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


const OAUTH_QueryString = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID || "0",
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope,
}).toString();

const OAUTH_URI = `https://discord.com/api/oauth2/authorize?${OAUTH_QueryString}`;

async function exchangeToken(code){
    
}