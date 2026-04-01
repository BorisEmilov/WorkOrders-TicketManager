const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = 3000

connectDB();

app.use(express.json());

app.use('/api/tickets', require('./routes/ticket.routes'));
app.use('/api/queues', require('./routes/queue.routes'));




app.listen(PORT, () => console.log(`Server on port: ${PORT}`));
