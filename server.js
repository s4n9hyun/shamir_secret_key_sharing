const express = require('express');
const bodyParser = require('body-parser');
const sss = require('shamirs-secret-sharing');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.post('/create-shares', (req, res) => {
    const secret = req.body.secret;
    // Shamir's Secret Sharing 알고리즘 사용
    const shares = sss.split(Buffer.from(secret), { shares: 5, threshold: 3 });
    res.json({ shares: shares.map(share => share.toString('hex')) });
});
app.post('/recover-secret', (req, res) => {
    const shares = req.body.shares.map(share => Buffer.from(share, 'hex'));
    const recovered = sss.combine(shares).toString();
    res.json({ secret: recovered });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
