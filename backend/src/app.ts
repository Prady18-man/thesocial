import express from 'express'
import { authrouter } from './routes/auth.routes';

const app = express();
const port = process.env.PORT || 8000;

app.set("port",port);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/user",authrouter);

app.listen(port,()=>{
    console.log('🚀 is rocking over', port);
});