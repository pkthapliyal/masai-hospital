const express = require("express");
const port = 3000;
const app = express();
const { connection } = require("./config/db")
const cors = require("cors")



//  middleware
app.use(express.json());
app.use(cors())


//  routers 
const { userRoute } = require("./routes/user.route");
const { appointmentRoute } = require("./routes/appointment.route")


app.use("/", userRoute);
app.use("/", appointmentRoute)

app.listen(port, async () => {
    try {
        await connection;
        console.log("server is listening at", port)

    } catch (error) {
        console.log(error.message)
    }
})