const util = require('util')


// import the discord.js module
const Discord = require('discord.js');
const config = require('./config.js');
const rc = require('./roll_call.js');


// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// the token of your bot - https://discordapp.com/developers/applications/me
const token = config.token;

var fs = require('fs');



function getPong(max) {
  max = Math.floor(max);
  return Math.floor(Math.random() * (max + 1)); //The maximum is inclusive and the minimum is inclusive 
}




// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
var NOTIFY_CHANNEL;
bot.on('ready', () => {
  console.log('I am ready!');
  NOTIFY_CHANNEL = bot.channels.find('id', '563397845432926238'); // Channel to send notification
  // NOTIFY_CHANNEL = bot.channels.find('id', '580062237662642186'); // DEBUG

});
bot.on('error', function(err){
    // handle the error safely
    console.log(err)
});



const announceList = [
	{day:3, hour:8, minute:9, role_id:"<@&576081452211372062>", 
		day_word:"Wednesday", meet:"GameKastle at 6:30pm!",remind:false},
	{day:0, hour:8, minute:9, role_id:"<@&651108830956224515>", 
		day_word:"Sunday", meet:"Tribe at 11:30am!",remind:false},
	{day:6, hour:18, minute:9, role_id:"<@&651108830956224515>", 
		day_word:"Sunday", meet:"Tribe at 11:30am!",remind:true},
];

const pingList = ["pong","pong","pong","pong","pong","pong","pong","pong","pong","pong","pong","pong",
			"pong","pong","pong","pong","pong","pong","pong","pong","pong","pong","pong","pong",
			"stahp","i got u","wat","wat do", "cash me ousside","no plz no","ooo-wee","oof","big mood",
			"im here", "relax bruh", "chill dawg", "naw, that aint me", "raspberry sherbert","get rekt skrub",
			"roundtrip 24.7ms\n...lol not really", "🇾", "💖💞💝", "㊙️","🍆🍑💦"];



var announce = "\n Lemme know below if you can make it!";
	announce += "\n";
	announce += "\n🇾 - If you are coming (late is okay)";
	announce += "\n❔ - If you might try but aren't sure";
	announce += "\n🇳 - If you cannot make it";
	announce += "\n";
	announce += "\n We will see you at ";

var reminder = "\n The #roll_call will post later,";
	reminder += "\n just a heads up to let you know this is coming!";
	reminder += "\n";
	reminder += "\n We will see you at ";



setInterval(function() {
    var d = new Date();
    // NOTIFY_CHANNEL.send("DEBUG: Day is:"+d.getDay()
    // 							+", Hour is:"+d.getHours()
    // 							+" Minute is:"+d.getMinutes());

    for (const item of announceList) {
	  // console.log(item);
	  if(item.day == d.getDay() 
		    	&& item.hour == d.getHours()
		    	&& item.minute == d.getMinutes()){
		    	// ){

		    if(item.remind){
		    	var msg = " **"+item.day_word+" is coming, my dudes!!**";
		    	NOTIFY_CHANNEL.send(item.role_id + msg + reminder + item.meet);
		    }else{
		    	var msg = " **It is "+item.day_word+" my dudes!!**";
		    	NOTIFY_CHANNEL.send(item.role_id + msg + announce + item.meet)
		    		.then(message => {
		    			message.react('🇾')
							.then(() => message.react('❔'))
							.then(() => message.react('🇳'))
							.catch(() => console.error('One of the emojis failed to react.'));
		    	});
		    }

	    }
	} 

   
}, 60 * 1000); // Check every minute


// create an event listener for messages
bot.on('message', message => {
	// user_active.time_stamp(message.author);

 //  // console.log(message.content.toLowerCase());
  
  var is_admin = false;
  if( message.member){
    is_admin =  message.member.hasPermission("ADMINISTRATOR");
  }



  if (message.content.toLowerCase() === 'ping') {
    // send "pong" to the same channel.
    var msg = pingList[getPong(pingList.length-1)];
    message.channel.send(msg);
  }
  if (message.content.toLowerCase() === 'reactt') {
    // send "pong" to the same channel.
    message.channel.send('react??')
    		.then(message => {
    			message.react('🇾')
					.then(() => message.react('❔'))
					.then(() => message.react('🇳'))
					.catch(() => console.error('One of the emojis failed to react.'));
    		});
  }

  if (is_admin && message.content.toLowerCase() === 'need_chan_id') {
    // send "pong" to the same channel.
    var chan = message.channel.id;
    message.channel.send("Channel ID:"+chan);
  }

	
  if(message.content.toLowerCase().includes("!setup_rc") && !message.author.bot){
  // if(message.content.toLowerCase().includes("!cookie")){
  	console.log(message.text);
  	var retval = rc.setup_rollcall(message,"!setup_rc");
  	message.channel.send(retval);
  }


});




// log our bot in
try{
	console.log("My token is: "+token);
	bot.login(token);
}catch(err){
	console.log(err.message);
}
