// sqlite-db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./welcomer.sqlite') ;

// Créer la table welcomes
db.run(`
  CREATE TABLE IF NOT EXISTS welcomes (
    guildID TEXT, 
    channelID TEXT,
    message TEXT,
    roleID TEXT,
    rulesID TEXT
  )  
`);

// Récupérer les infos de bienvenue
const getWelcome = (guildID) => {

  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM welcomes guildID = ?', [guildID], (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(row); 
    });
  });

}

// Définir les infos de bienvenue 
const setWelcome = (guildID, channelID, message, roleID, rulesID) => {

  return new Promise((resolve, reject) => {
    db.run('REPLACE INTO welcomes (guildID, channelID, message, roleID, rulesID) VALUES (?, ?, ?, ?, ?)',
      [guildID, channelID, message, roleID, rulesID], 
    (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });

}

const reset1 = (guildID, channelID, message, roleID, rulesID) => {

  return new Promise((resolve, reject) => {
    db.run('DELETE FROM welcomes WHERE guildID = ?', [guildID]);
    [guildID, channelID, message, roleID, rulesID],
    (err) => {
    if (err) {
      reject(err);
      return;
    }
    resolve();
  };
});
}

// Fermer la connexion 
// process.on('SIGINT', () => {
//   db.close();
//   process.exit();
// });

module.exports = {
  getWelcome,
  setWelcome,
  reset1
};