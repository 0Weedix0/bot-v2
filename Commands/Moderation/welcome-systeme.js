const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const sqlite3 = require('../../Models/Welcome');
// const { getWelcome, setWelcome } = require('../../database');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('welcome')
        .setDescription('Welcome System')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Set Welcome System')
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('Welcome Channel')
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('message')
                        .setDescription('Welcome Message'))
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('Welcome Role'))
                .addChannelOption(option =>
                    option
                        .setName('rule')
                        .setDescription('Rules Channel')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove Welcome System'))
        .setDMPermission(false),
    async execute(interaction, client) {

        if (interaction.options.getSubcommand() === 'set') {
            const data = await sqlite3.getWelcome(interaction.guild.id);

            if (data) { // If Welcome System Already Enabled
                const channel = interaction.options.getChannel('channel')
                let message = interaction.options.getString('message')
                if (!message) message = null
                let role = interaction.options.getRole('role')
                if (role) role = role.id
                if (!role) role = null
                let rule = interaction.options.getChannel('rule')
                if (rule) rule = rule.id
                if (!rule) rule = null
                console.log(data)
                
                await sqlite3.getWelcome(
                    interaction.guild.id,
                    channel.id,
                    message,
                    role,
                    rule
                );


                const welcomeSetupEmbed = new EmbedBuilder()
                    .setColor('Random')
                    .setTimestamp()
                    .setAuthor({
                        name: `Welcome Setup Update`,
                        iconURL: interaction.guild.iconURL()
                    })
                    .setDescription(`
Welcome Channel Set As ${channel}, Role As <@&${role}> And Rule Channel As <#${rule}>
Welcome Message: ${message}
`)

                await interaction.reply({ embeds: [welcomeSetupEmbed] })
            }

            if (!data) { // If Setting Up Welcome System For First Time
                const channel = interaction.options.getChannel('channel')
                let message = interaction.options.getString('message')
                if (!message) message = null
                let role = interaction.options.getRole('role')
                if (role) role = role.id
                if (!role) role = null
                let rule = interaction.options.getChannel('rule')
                if (rule) rule = rule.id
                if (!rule) rule = null

                const data = await sqlite3.setWelcome(
                    interaction.guild.id,
                    channel.id,
                    message,
                    role,
                    rule
                );


                const welcomeSetupEmbed = new EmbedBuilder()
                    .setColor('Random')
                    .setTimestamp()
                    .setAuthor({
                        name: `Welcome Setup`,
                        iconURL: interaction.guild.iconURL()
                    })
                    .setDescription(`
Welcome Channel Set As ${channel}, Role As <@&${role}> And Rule Channel As <#${rule}>
Welcome Message: ${message}
`)

                await interaction.reply({ embeds: [welcomeSetupEmbed] })
            }
        }

        if (interaction.options.getSubcommand() === 'remove') {
            const data = sqlite3.reset1(interaction.guild.id)

            if (!data) {
                await interaction.reply({ content: `Welcome System Not Setup In **${interaction.guild.name}**`, ephemeral: true })
            } else {
                await interaction.reply({ content: `Welcome System Disabled For **${interaction.guild.name}**` })
            }
        }
    }
}
// const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
// const welcomeSchema = require('../../Models/Welcome')

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('welcome')
//         .setDescription('Welcome System')
//         .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
//         .addSubcommand(subcommand =>
//             subcommand
//                 .setName('set')
//                 .setDescription('Set Welcome System')
//                 .addChannelOption(option =>
//                     option
//                         .setName('channel')
//                         .setDescription('Welcome Channel')
//                         .setRequired(true))
//                 .addStringOption(option =>
//                     option
//                         .setName('message')
//                         .setDescription('Welcome Message'))
//                 .addRoleOption(option =>
//                     option
//                         .setName('role')
//                         .setDescription('Welcome Role'))
//                 .addChannelOption(option =>
//                     option
//                         .setName('rule')
//                         .setDescription('Rules Channel')))
//         .addSubcommand(subcommand =>
//             subcommand
//                 .setName('remove')
//                 .setDescription('Remove Welcome System'))
//         .setDMPermission(false),
//     async execute(interaction, client) {

//         if (interaction.options.getSubcommand() === 'set') {
//             const data = await welcomeSchema.getWelcome({
//                 guild: interaction.guild.id
//             })

//             if (data) { // If Welcome System Already Enabled
//                 const channel = interaction.options.getChannel('channel')
//                 let message = interaction.options.getString('message')
//                 if (!message) message = null
//                 let role = interaction.options.getRole('role')
//                 if (role) role = role.id
//                 if (!role) role = null
//                 let rule = interaction.options.getChannel('rule')
//                 if (rule) rule = rule.id
//                 if (!rule) rule = null

//                 await welcomeSchema.getWelcome({ // Updating Old Data
//                     Guild: interaction.guild.id,
//                     Channel: channel.id,
//                     Message: message,
//                     Role: role,
//                     Rule: rule,
//                 })
                

//                 const welcomeSetupEmbed = new EmbedBuilder()
//                     .setColor('Random')
//                     .setTimestamp()
//                     .setAuthor({
//                         name: `Welcome Setup Update`,
//                         iconURL: interaction.guild.iconURL()
//                     })
//                     .setDescription(`
// Welcome Channel Set As ${channel}, Role As <@&${role}> And Rule Channel As <#${rule}>
// Welcome Message: ${message}
// `)

//                 await interaction.reply({ embeds: [welcomeSetupEmbed] })
//             }

//             if (!data) { // If Setting Up Welcome System For First Time
//                 const channel = interaction.options.getChannel('channel')
//                 let message = interaction.options.getString('message')
//                 if (!message) message = null
//                 let role = interaction.options.getRole('role')
//                 if (role) role = role.id
//                 if (!role) role = null
//                 let rule = interaction.options.getChannel('rule')
//                 if (rule) rule = rule.id
//                 if (!rule) rule = null

//                 const data = await welcomeSchema.setWelcome({ // Creating New Data
//                     Guild: interaction.guild.id,
//                     Channel: channel.id,
//                     Message: message,
//                     Role: role,
//                     Rule: rule,
//                 })
                

//                 const welcomeSetupEmbed = new EmbedBuilder()
//                     .setColor('Random')
//                     .setTimestamp()
//                     .setAuthor({
//                         name: `Welcome Setup`,
//                         iconURL: interaction.guild.iconURL()
//                     })
//                     .setDescription(`
// Welcome Channel Set As ${channel}, Role As <@&${role}> And Rule Channel As <#${rule}>
// Welcome Message: ${message}
// `)

//                 await interaction.reply({ embeds: [welcomeSetupEmbed] })
//             }
//         }

//         if (interaction.options.getSubcommand() === 'remove') {
//             const data = await welcomeSchema.setWelcome({
//                 guild: interaction.guild.id
//             })

//             if (!data) {
//                 await interaction.reply({ content: `Welcome System Not Setup In **${interaction.guild.name}**`, ephemeral: true })
//             } else {
//                 await welcomeSchema.setWelcome({ // Deleting Data
//                     guild: interaction.guild.id
//                 })
//                 await interaction.reply({ content: `Welcome System Disabled For **${interaction.guild.name}**` })
//             }
//         }
//     }
// }