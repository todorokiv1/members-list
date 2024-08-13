const { Client, Intents } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Load configuration
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
  if (message.content === '!members') {
    if (message.guild) {
      try {
        // Fetch the members
        const members = await message.guild.members.fetch();
        // Create a list of member names
        const memberList = members.map(member => member.user.tag).join('\n');
        // Send the list as a message
        message.channel.send(`Members:\n${memberList}`);
      } catch (error) {
        console.error('Error fetching members:', error);
        message.channel.send('There was an error fetching the members.');
      }
    } else {
      message.channel.send('This command can only be used in a server.');
    }
  }
});

client.login(config.TOKEN);
