const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

const token = 'YOUR_BOT_TOKEN_HERE';

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', async (message) => {
    if (message.content === '!listmembers') {
        if (!message.guild) return;

        try {
            await message.guild.members.fetch(); // Fetch all members
            const members = message.guild.members.cache.map(member => member.user.username).join('\n');
            message.channel.send(`Members:\n${members}`);
        } catch (error) {
            console.error('Error fetching members:', error);
            message.channel.send('Failed to fetch members.');
        }
    }
});

client.login(token);
