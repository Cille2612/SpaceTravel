import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const API_URL = "https://api.spacexdata.com/v3/history";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL);
    // Wir übergeben das gesamte Array 'result.data' an die EJS-Datei
    res.render("index.ejs", { historyData: result.data });
  } catch (error) {
    console.error(error);
    res.render("index.ejs", { historyData: null, error: "Fehler beim Laden der Daten" });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

