import express from "express"
import db from "./src/db/index.js"
import userRouter from "./src/routes/userRoutes.js"

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/users", userRouter);
app.use("/companys", userRouter)







app.listen(PORT, () => {
    console.log(`Server is running - ${PORT}`)
})
