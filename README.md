
# Project Title

Simple ToDo List Application Using Node + Express JS

## Installation

Upon navigating through your created directory, initialize a new Node.js project
```bash
  npm init
```

Install dependencies like body-parser, nodemon and dotenv
```bash
  npm install express body-parser
  npm install dotenv
  npm install nodemon --save-dev
```

add necessary files such as app.js public, routes, views and the environment variables

Add start script to package.json
```bash
  npm pkg set scripts.start="node app.js"
  npm pkg set scripts.dev="nodemon app.js"
```
Test if working, add this code in app.js
```javascript
  const express = require('express');
  const app = express();

  app.get('/', (req, res) =>  {
      res.send('Hello World!');
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`)
  });
```

Run it
 ```bash
  npm start
```
   
