const { ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const config = require("../../Snippets/config.json");
require("colors");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        await mongoose.connect(config.mongodb || '', {
            keepAlive: true,
        });

        if (mongoose.connect) {
            console.log('[+]'.green + ' MongoDB connection succesful.')
        }

        const activities = ["predn sont mal patience", "apprend a codée", "discord.gg/4bFcMcaz"];
        let i = 0;

        setInterval(() => client.user.setPresence({ activities: [{ name: activities[i++ % activities.length], type: ActivityType.Watching }], status: "dnd" }), 15000);
        console.log(`[ONLINE]`.green + ` ${client.user.tag} is online in ${client.guilds.cache.size} servers! `);
    },
};