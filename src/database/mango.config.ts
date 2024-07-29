import mongoose from "mongoose";

export function connect(){
    mongoose

    .connect(process.env.MONGO_URL="mongodb+srv://user2024:user2025@nextauth-cluster.zzr21yz.mongodb.net/"! , {
        tls: true,
    })
    .then(() => console.log("database connected successfully!"))
    .catch((err) => console.log("Hey there is some error", err))
}