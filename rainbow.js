const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const size = config.colors;
const rainbow = new Array(size);


for (var i=0; i<size; i++) {
var red = sin_to_hex(i, 0 * Math.PI * 2/3); // 0 deg
var blue = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
var green = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg
var wings = sin_to_hex(i, 0 * Math.PI * 2/3);

rainbow[i] = '#'+ red + blue + green;
}


function sin_to_hex(i, phase) {
var sin = Math.sin(Math.PI / size * 2 * i + phase);
var int = Math.floor(sin * 127) + 128;
var hex = int.toString(16);

return hex.length === 1 ? '0'+hex : hex;
}

let place = 0;
const servers = config.servers;

function changeColor() {
for (let index = 0; index < servers.length; ++index) {
client.guilds.get(servers[index]).roles.find('name', config.roleName).setColor(rainbow[place])
    
 

if(place == (size - 1)){
place = 0;
}else{
place++;
}
}
}

client.on('ready', () => {
if(config.speed < 0){console.log("The minimum speed is 60.000, if this gets abused your bot might get IP-banned"); process.exit(1);}
setInterval(changeColor, config.speed);
});


client.on("ready", function () {
	
	client.user.setPresence({
		game: {
			name: "радуга включена"
		}
	}); 
});


client.login(config.token);