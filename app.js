var express = require('express');
var crypto = require('crypto');
const bodyParser = require('body-parser');

// Express server running on port 3000
var app = express();
const PORT = 3000;

// Parse JSON requests
app.use(bodyParser.json());

// Shared secret between integrating app and SaaS platform
const signatureKey = "<paste shared secret here>";

// GET request handler to respond to CRCs
app.get('/', (req, res) => {
    console.log(new Date().toLocaleString());

    // Read 'challenge' query parameter
    var challenge = req.query.challenge;
    console.log('challenge=' + challenge);

    // Calculate response
    var responseHash = verifyDomain(signatureKey, challenge);
    console.log('response=' + responseHash, '\n');

    // Respond in appropriate format dictated by SaaS platform
    res.json({ response : responseHash });
});

// no-op POST request handler to log webhooks received
app.post('/', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

// Calculate SHA-256 hash value using challenge and shared secret
function verifyDomain(signatureKey, challenge) {
    // Perform UTF-8 encoding to bytes
    let challengeBytes = Buffer.from(challenge, 'utf-8');
    let signatureKeyBytes = Buffer.from(signatureKey, 'utf-8');
    
    // Init HMAC SHA-256
    var hmac = crypto.createHmac('sha256', signatureKeyBytes);

    // Calculate hash value
    data = hmac.update(challengeBytes);

    // Return base64 encoded bytes
    return hmac.digest('base64');
}

// Start server on specified port
app.listen(PORT, function(error){ 
    if(error) throw error 
    console.log("Server listening on PORT", PORT, '\n') 
}) 