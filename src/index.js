import { env } from "./config/env.js";

console.log(`[${env.appName}] starting in ${env.nodeEnv}`);
console.log(`Tagline: ${env.cafeTagline}`);
console.log(`Process id: ${process.pid}`);
console.log(`Configured port: ${env.port}`);

/**
 * Loads a featured book from the API
 * @returns {Promise<Object>} - The featured book *not actually a book yet*
 */
async function loadFeaturedBook() {
    // Using a fetch to perform a GET request to the API
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1",
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        },
    );

    // Reading from the response headers
    const contentType = response.headers.get("content-type");
    console.log(`HTTP status: ${response.status}, ok: ${response.ok}`);
    console.log(`Content-Type: ${contentType}`);

    // Checking if the response is ok or if server is down
    if (!response.ok) {
        throw new Error(`Special unavailable (HTTP ${response.status})`);
    }

    // Parsing the response body as JSON making it readable
    const post = await response.json();
    // Returning the featured "book" object
    return {
        name: post.title,
        priceSek: 35,
    };
}

/**
 * Loads a staff member from the API
 * @returns {Promise<Object>} - The staff member *not actually a staff member yet*
 */
async function loadStaffMember() {
    // Same as above but for a staff member
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1",
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        },
    );

    const contentType = response.headers.get("content-type");
    console.log(`HTTP status: ${response.status}, ok: ${response.ok}`);
    console.log(`Content-Type: ${contentType}`);

    if (!response.ok) {
        throw new Error(`Staff unavailable (HTTP ${response.status})`);
    }

    const user = await response.json();
    // Returning the staff member object
    return {
        name: user.name,
        email: user.email,
        city: user.address.city,
        role: "barista",
    };
}

/**
 * Runs the server and loads the featured book for now
 */
async function runServer() {
    try {
        const featuredBook = await loadFeaturedBook();
        console.log(`Featured book: ${featuredBook.name} (${featuredBook.priceSek} kr)`);

        const staffMember = await loadStaffMember();
        console.log(`Staff member: ${staffMember.name} (${staffMember.email})`);
        console.log(`City: ${staffMember.city}`);
        console.log(`Role: ${staffMember.role}`);
    } catch (err) {
        console.error(`Could not load featured book: ${err.message}`);
        console.error(`Could not load staff member: ${err.message}`);
    }
}

runServer();
