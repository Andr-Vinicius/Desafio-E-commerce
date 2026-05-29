const { Client } = require('pg');

const client = new Client({
  host: 'ep-proud-surf-ac78uz24-pooler.sa-east-1.aws.neon.tech', // seu host real aqui
  port: 5432,
  user: 'neondb_owner', // seu user real
  password: 'npg_kLnHBP5g8tIK', // sua senha real
  database: 'neondb', // seu banco real
  ssl: { rejectUnauthorized: false }
});

client.connect()
  .then(() => { console.log('CONECTOU!'); client.end(); })
  .catch(err => console.error('ERRO:', err.message));