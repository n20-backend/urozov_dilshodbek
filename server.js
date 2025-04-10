import express from "express"
import db from "./src/db/index.js"
import { userRouter, reviewRouter, companyRouter, appRouter, jobRouter } from "./src/routes/index.js"

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/users", userRouter);
app.use("/companys", companyRouter)
app.use("/apps", appRouter)
app.use("/jobs", jobRouter)
app.use("/reviews", reviewRouter)







app.listen(PORT, () => {
    console.log(`Server is running - ${PORT}`)
})
