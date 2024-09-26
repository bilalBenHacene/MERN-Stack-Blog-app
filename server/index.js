import express from'express'
import cors from'cors'
import 'dotenv/config'
import './db/index.js'
import blogRoutes from './routes/blog-routes.js';
const app = express();
const port = process.env.PORT || 3000
app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRoutes);
// app.get('/api', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})