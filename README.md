# crc-client
A demo client app that responds to Challenge-Response-Checks (CRCs)

## About
This is an app that demonstrates a way to respond to challenge-response checks (CRCs). A CRC is a domain verification method where the requesting entity sends a challenge to a third party client and expects a response in a specified format. Usually this involves using some kind of shared secret to calculate the response.

For the purposes of this demonstration, let's assume that we're trying to integrate with a SaaS platform that sends us webhooks and requires us to prove domain ownership of the endpoint that we configured to receive webhooks. 

We implement a REST endpoint that accepts a `challenge` query parameter that represents the challenge portion of the CRC. We use a shared secret to compute a hash value and respond appropriately. 

## Installation

1. Install npm and Node.js. Refer to docs [here](https://nodejs.org/en/download/package-manager).
2. `npm install`
3. `node app.js`