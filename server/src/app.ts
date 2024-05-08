import express from 'express';
import userRoutes from './api/routes/userRoutes';

const app = express();

app.use(express.json());
app.use('/api', userRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
