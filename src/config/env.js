const required = ["APP_NAME", "NODE_ENV", "LIBRARY_TAGLINE"];

// Checking if all required environment variables are set
for (const key of required) {
    if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
    }
}

// Exporting the environment variables for easier use
export const env = {
    appName: process.env.APP_NAME,
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV,
    libraryTagline: process.env.LIBRARY_TAGLINE,
};