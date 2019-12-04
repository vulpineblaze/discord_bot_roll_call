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


// const START_DATE = '2018-08-04'; // Date used as the starting point for multi-hour intervals, must be YYYY-MM-DD format
// const START_HOUR = 10; // Hour of the day when the timer begins (0 is 12am, 23 is 11pm), used with START_DATE and INTERVAL_HOURS param
// const INTERVAL_HOURS = 1; // Trigger at an interval of every X hours
// const TARGET_MINUTE = 0; // Minute of the hour when the chest will refresh, 30 means 1:30, 2:30, etc.
// const OFFSET = 10; // Notification will warn that the target is X minutes away

const NORTH_DAY = 3; // 3 is weds my dudes
const SOUTH_DAY = 0;
const SEND_HOUR = 8; // PST
const SEND_MINUTE = 1; // +9 offset, this number should be 9 larger than desired
// 8,1 became 9:52am

const NORTH_ROLE_ID = "<@&576081452211372062>";
const SOUTH_ROLE_ID = "<@&651108830956224515>";

const NORTH_DAY_WORD = "Wednesday";
const SOUTH_DAY_WORD = "Sunday";

const NORTH_MEET = "GameKastle at 630!";
const SOUTH_MEET = "Tribe at 1130!";

var announce = "\n Lemme know below if you can make it!";
	announce += "\n";
	announce += "\n🇾 - If you are coming (late is okay)";
	announce += "\n❔ - If you might try but aren't sure";
	announce += "\n🇳 - If you cannot make it";
	announce += "\n";
	announce += "\n We will see you at ";

// Don't change any code below
// const NOTIFY_MINUTE = (TARGET_MINUTE < OFFSET ? 60 : 0) + TARGET_MINUTE - OFFSET;
// const START_TIME = new Date(new Date(START_DATE).getTime() + new Date().getTimezoneOffset() * 60000 + START_HOUR * 3600000).getTime();
// var emoji = bot.emojis.find(emoji => emoji.name == "heart");

// console.log("DEBUG: find:" + bot.emojis.find(emoji => emoji.name.includes("h") ));

// var emoji = bot.emojis;

// for (var [key, value] of emoji.entries()) {
// 	console.log("DEBUG: emoji ALL:"+key+"|"+value);

// }

// var newThing = emoji.array();
// console.log("DEBUG: newThing: ${newThing}");

// for (var i in newThing) {
// 	console.log("DEBUG: emoji ALL:"+i);

// }



// console.log("DEBUG: emoji:"+emoji.values());
// console.log("DEBUG: emoji:"+emoji);

setInterval(function() {
    var d = new Date();
    // NOTIFY_CHANNEL.send("DEBUG: Day is:"+d.getDay()
    // 							+", Hour is:"+d.getHours()
    // 							+" Minute is:"+d.getMinutes());

    if(NORTH_DAY == d.getDay() 
	    	&& SEND_HOUR == d.getHours()
	    	&& SEND_MINUTE == d.getMinutes()){
	    	// ){

    	var msg = " **It is "+NORTH_DAY_WORD+" my dudes!!**";
    	
    	NOTIFY_CHANNEL.send(NORTH_ROLE_ID + msg + announce + NORTH_MEET)
    		.then(message => {
    			message.react('🇾')
					.then(() => message.react('❔'))
					.then(() => message.react('🇳'))
					.catch(() => console.error('One of the emojis failed to react.'));
    		});

    }

    if(SOUTH_DAY == d.getDay() 
	    	&& SEND_HOUR == d.getHours()
	    	&& SEND_MINUTE == d.getMinutes()){
	    	// ){

    	var msg = " **It is "+SOUTH_DAY_WORD+" my dudes!!**";
    	
    	NOTIFY_CHANNEL.send(SOUTH_ROLE_ID + msg + announce + SOUTH_MEET)
    		.then(message => {
    			message.react('🇾')
					.then(() => message.react('❔'))
					.then(() => message.react('🇳'))
					.catch(() => console.error('One of the emojis failed to react.'));
    		});

    }

    // if(Math.floor((d.getTime() - START_TIME) / 3600000) % INTERVAL_HOURS > 0) return; // Return if hour is not the correct interval
    // if(d.getMinutes() !== NOTIFY_MINUTE) return; // Return if current minute is not the notify minute
    // console.log('The chests refresh in ' + OFFSET + ' minutes!');
    // NOTIFY_CHANNEL.sendMessage('The chests refresh in ' + OFFSET + ' minutes!');
}, 60 * 1000); // Check every minute


// create an event listener for messages
bot.on('message', message => {
	// user_active.time_stamp(message.author);

 //  // console.log(message.content.toLowerCase());
  
  var is_admin = false;
  if( message.member){
    is_admin =  message.member.hasPermission("ADMINISTRATOR");
  }

 //  if(json_refresh){
 //  	json_refresh = false;

 //  	redirector.json_refresher();
 //  	autorespond.json_refresher();
 //  	setTimeout(function(){json_refresh=true}, 0.1 * 60 * 1000);
 //  }

  if (message.content.toLowerCase() === 'ping') {
    // send "pong" to the same channel.
    message.channel.send('pong');
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


 //  if(is_admin && message.content.toLowerCase().includes("show timestamps")){
 //  	var ts_string = user_active.show_all_stamps()
	// 	message.channel.send("timestamps:\n"+ts_string);
 //  }

 //  if(message.content.toLowerCase().includes("!cookies")){
 //  	var retval = cookie.give_cookie(message,"!cookies");
 //  	message.channel.send(retval);
 //  }
 //  else if(message.content.toLowerCase().includes("!cookie")){
 //  	var retval = cookie.give_cookie(message,"!cookie");
 //  	message.channel.send(retval);
 //  }
	
 //  if(!message.author.bot && message.content.toLowerCase().includes("!calendar")){
 //  	calendar.process_calendar(message,"!calendar");

 //  }
	
  if(message.content.toLowerCase().includes("!setup_rc") && !message.author.bot){
  // if(message.content.toLowerCase().includes("!cookie")){
  	console.log(message.text);
  	var retval = rc.setup_rollcall(message,"!setup_rc");
  	message.channel.send(retval);
  }

 //  if(message.content.toLowerCase().includes("!topic")){
 //    var topic = message.channel.topic;
 //    var chan_name = message.channel.name;
 //    console.log("topic:"+topic);
 //    message.channel.send("#"+chan_name+":\n"+topic);
 //  }



	// redirector.check_and_respond(message);
	// autorespond.check_and_respond(message);
	// moodtrack.check_and_store(message);
	// linksave.check_and_respond(message);

});

// bot.on('guildMemberRemove', member => {
  
//   console.log('guildMemberRemove ' + member + " aka " +  member.user.username );
//   var user = "<@149628603632451584>";
//   // me <@149628603632451584>
//   // loki actual "<@246743107855581185>"
//   // var loki = member.client.users.find("<@149628603632451584>") 
//   var test = member.guild.owner; 
//   // console.log("test user left "+loki);
//   // console.log("test user left "+member.client.fetchUser(user).username );
  
//   test.sendMessage('test user left: '+ member + " aka " +  member.user.username )
//     .then(message => console.log(`Sent message: ${message.content}`))
//     .catch(console.error);
//     // for(var key in users) {
//     //   if(users.hasOwnProperty(key)) {
//     //       console.log("showing: "+users[key]);
//     //   }
//     // }
//   // loki.sendMessage("test user left "+loki);
// });



// log our bot in
try{
	console.log("My token is: "+token);
	bot.login(token);
}catch(err){
	console.log(err.message);
}
