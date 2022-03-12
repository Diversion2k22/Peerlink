const express = require('express');
const app = express();
const apiRoute = require('./routes/auth');
const conversationRoute = require('./routes/conversations');
const messageRoute = require('./routes/messages');
const contactRoute = require('./routes/contacts');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.use(express.json());
app.use('/auth',apiRoute);
const port = process.env.PORT || 8000;

app.use('/api/conversation',conversationRoute);
app.use('/api/message',messageRoute);
app.use('/api/contact',contactRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
      console.log(`express server connection is stable in port number ${port}`)
})