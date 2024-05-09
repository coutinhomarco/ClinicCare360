import express from 'express';
import userRoutes from './api/routes/user/userRoutes';

const app = express();

app.use(express.json());
app.use('/api', userRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
