import { MongoClient } from "mongodb";
import bcryptjs from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, phone, address, username, password } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !phone ||
      phone.trim() === "" ||
      !address ||
      address.trim() === "" ||
      !password ||
      password.length < 6
    ) {
      res.status(500).json({ message: "Invalid input." });
      return;
    }

    let client;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.9srxm.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db = client.db();

    try {
      const hashedPassword = bcryptjs.hashSync(password, 12);
      await db.collection("account").updateOne(
        { username },
        {
          $set: {
            password: hashedPassword,
            name,
            email,
            phone,
            address,
          },
        }
      );
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Updating account failed!" });
      return;
    }

    client.close();

    res.status(201).json({ message: "Successfully saved account!" });
  }
}
