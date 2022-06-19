const { Pool } = require ("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "pomonella21",
    database: "proyecto",
    port: 5433,
});


