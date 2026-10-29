import { env } from "./config/env.js";

console.log(`[${env.appName}] starting in ${env.nodeEnv}`);
console.log(`Tagline: ${env.libraryTagline}`);
console.log(`Process id: ${process.pid}`);
console.log(`Configured port: ${env.port}`);
import { createApp } from "./app.js";

/**
 * Create the express application from our app.js file
 * @type {import('express').Application}
 */
const app = createApp();

// Start the express application on a spesific port
app.listen(env.port, () => {
    console.log(`[${env.appName}] running on port ${env.port}`);
});