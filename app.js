import 'dotenv/config';   
import express from "express";
import bodyParser from "body-parser";
import pg  from "pg";
import fs from 'fs';
import csv from 'csv-parser';
const app = express();
const port = process.env.PORT || 3000;

fs.createReadStream('./countries.csv')
  .pipe(csv())
  .on('data', async row => {
      await db.query(
        'INSERT INTO countries(country_code, country_name) VALUES ($1, $2)',
        [row.country_code, row.country_name]
      )
  })

export const db = new pg.Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

export async function users() {
  const result = await db.query('SELECT * FROM users');
  return result.rows 
}

export async function country() {
  const result = await db.query('SELECT * FROM countries');
  return result.rows 
}

export async function checkVisited() {
  const result = await db.query(`
    SELECT u.id,name,country_code,color
    FROM users u
    JOIN visited_countries v ON u.id = v.user_id
    WHERE u.id = $1`,[currentUserId]);
    
    let countries = [];
    
    result.rows.forEach((country) => {
      countries.push(country.country_code);
  });
  countries.push(result.rows[0]?.color);
  return  countries ;
}


app.get("/", async (req, res) => {  
  const countries = await checkVisited();
  let user = await users();
  let color_spes = countries.pop();
  console.log(user);


  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: user,
    color: color_spes,
  });
});


app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(`
        INSERT INTO visited_countries (country_code, user_id)
        VALUES ($1, $2)
        `,[countryCode , currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  currentUserId = req.body["user"];
  const add = req.body["add"];
  
  if(add === "new"){
    res.render('new.ejs');
  }else{
    res.redirect('/');
  }  
});

app.post("/new", async (req, res) => {
  const name = req.body["name"];
  const color = req.body["color"];
  console.log(name);
  console.log(color);
  await db.query("INSERT INTO users(name,color) VALUES($1,$2)",[name,color]);
  res.redirect('/');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;