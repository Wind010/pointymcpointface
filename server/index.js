const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Routes
const planningPokerRoutes = require('./server/routes/planningPokerRoutes');
app.use('/planningpoker', planningPokerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
