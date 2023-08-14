// sqlite-db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./welcomer.sqlite') ;

// Créer la table welcomes
db.run(`
  CREATE TABLE IF NOT EXISTS welcomes (
    guild TEXT, 
    channel TEXT,
    message TEXT,
    role TEXT,
    rules TEXT
  )  
`);

// Récupérer les infos de bienvenue
const getWelcome = (guild) => {

  return new Promise((resolve, reject) => {
     db.get('SELECT * FROM welcomes WHERE guild = ?', [guild], (err, row) => {
      if (err) {
        console.log("not found", err);
        reject(err);
        return;
      }

      resolve(row); 
    });
  });

}

// Définir les infos de bienvenue 
const setWelcome = (guild, channel, message, role, rules) => {

  return new Promise((resolve, reject) => {
    db.run('REPLACE INTO welcomes (guild, channel, message, role, rules) VALUES (?, ?, ?, ?, ?)',
      [guild, channel, message, role, rules], 
    (err) => {
      if (err) {
        console.log("it's ok")
        reject(err);
        return;
      }

      resolve();
    });
  });

}

const reset1 = (guild, channel, message, role, rules) => {

  return new Promise((resolve, reject) => {
    db.run('DELETE FROM welcomes WHERE guild = ?', [guild]);
    [guild, channel, message, role, rules],
    (err) => {
    if (err) {
      console.log("it's fine")
      reject(err);
      return;
    }
    resolve();
  };
});
}

// Fermer la connexion 
process.on('SIGINT', () => {
  db.close();
  process.exit();
});

module.exports = {
  getWelcome,
  setWelcome,
  reset1
};