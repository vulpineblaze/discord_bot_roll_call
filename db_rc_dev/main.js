const util = require('util')


// import the discord.js module
const Discord = require('discord.js');
const config = require('./config.js');
const rc = require('./roll_call.js');
const rd = require('./roll_dice.js');


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
  NOTIFY_CHANNEL = bot.channels.fetch('563397845432926238'); // Channel to send notification
  // NOTIFY_CHANNEL = bot.channels.find('id', '580062237662642186'); // DEBUG

});
bot.on('error', function(err){
    // handle the error safely
    console.log(err)
});



const announceList = [
	{day:3, hour:8, minute:9, role_id:"<@&576081452211372062>", 
		day_word:"Wednesday", meet:"(*Online*) at 6:30pm!",remind:false}
];

// {day:0, hour:8, minute:9, role_id:"<@&651108830956224515>", 
	// 	day_word:"Sunday", meet:"Tribe at 11:30am!",remind:false},
	// {day:6, hour:18, minute:9, role_id:"<@&651108830956224515>", 
	// 	day_word:"Sunday", meet:"Tribe at 11:30am!",remind:true},

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

  const msgLC = message.content.toLowerCase();


  if (msgLC === 'ping') {
    // send "pong" to the same channel.
    var msg = pingList[getPong(pingList.length-1)];
    message.channel.send(msg);
  }
  if (msgLC === 'reactt') {
    // send "pong" to the same channel.
    message.channel.send('react??')
    		.then(message => {
    			message.react('🇾')
					.then(() => message.react('❔'))
					.then(() => message.react('🇳'))
					.catch(() => console.error('One of the emojis failed to react.'));
    		});
  }

  if (is_admin && msgLC === 'need_chan_id') {
    // send "pong" to the same channel.
    var chan = message.channel.id;
    message.channel.send("Channel ID:"+chan);
  }

	
  if(msgLC.includes("!setup_rc") && !message.author.bot){
  // if(message.content.toLowerCase().includes("!cookie")){
  	console.log(message.text);
  	var retval = rc.setup_rollcall(message,"!setup_rc");
  	message.channel.send(retval);
  }

	
  if(msgLC.charAt(0) == 'r' && !message.author.bot){
  // if(message.content.toLowerCase().includes("!cookie")){
  	// console.log(message.text);
  	// var retval = rc.setup_rollcall(message,"!setup_rc");
  	var dice = parseInt(msgLC.split('r')[1]);
  	var retval = "Invalid input: \n" + message.content;
  	var prefix = "@" + message.author.username.toString() + " sent: \n";
  	if(Number.isInteger(dice)){
  		if(dice > 0 && dice < 100){
  			message.channel.send(prefix+rd.rollDice(dice));
  		}else{
  			message.channel.send(prefix+"You really don't need to be rolling "+dice+" dice..");
  		}
  		message.delete();
  	}else{
  		// message.channel.send(prefix+retval);
  	}
  	
  }

  if(msgLC.charAt(0) == 's' && !message.author.bot){

  	var dice = parseInt(msgLC.split('s')[1]);
  	var retval = "Invalid input: \n" + message.content;
  	var prefix = "@" + message.author.username.toString() + "'s streak test: \n";
  	if(Number.isInteger(dice)){
  		if(dice > 0 && dice < 21){
  			message.channel.send(prefix+rd.rollDice(dice) + "\n"+rd.rollDice(dice) + "\n"+rd.rollDice(dice));
  			message.channel.send(rd.rollDice(dice) + "\n"+rd.rollDice(dice) + "\n"+rd.rollDice(dice));
  			message.channel.send(rd.rollDice(dice) + "\n"+rd.rollDice(dice) + "\n"+rd.rollDice(dice));
  			message.channel.send(rd.rollDice(dice) + "\n"+rd.rollDice(dice) + "\n"+rd.rollDice(dice));
  		}else{
  			message.channel.send(prefix+"You really don't need to be rolling "+dice+" dice..");
  		}
  		message.delete();
  	}else{
  		// message.channel.send(prefix+retval);
  	}
  	
  }

  if(msgLC.charAt(0) == 'g' && (msgLC.charAt(1) == 'm' || msgLC.charAt(1) == 's') && !message.author.bot){
  	var dice = parseInt(msgLC.split('m')[1]);
  	var streak	 = parseInt(msgLC.split('s')[1]);
  	var prefix = "@" + message.author.username.toString() + " *feels the Universe like:* \n";
  	// console.log("rollChance", dice);
  	if(Number.isInteger(dice)){
  		if(dice > 0 && dice < 100){
  			message.channel.send(prefix+rd.rollChance(dice));
  		}else{
  			message.channel.send(prefix+"Mmmm.. "+dice+" is too big..");
  		}
  		message.delete();
  	}else if(Number.isInteger(streak)){
  		message.channel.send("Running streak: " + streak);
  		while (streak > 0 && streak < 100) {
		  streak -= 3;
		  message.channel.send(rd.rollChance()+"\t"+rd.rollChance()+"\t"+rd.rollChance());
		}
		message.channel.send("...  *phew* ...  done streak: " + streak);
  		message.delete();
  	}
  	else if(msgLC.includes("bone")){
  		var bonePrefix = "@" + message.author.username.toString() + " wills  ***__T H E   B O N E S__***  to speak! \n";
  		message.channel.send(bonePrefix+rd.rollTheBones());
  		message.delete();
  	}
  	else{
  		// message.channel.send(prefix+retval);
  	}
  }

  if(msgLC.charAt(0) == 'm' && msgLC.includes("monster")  && !message.author.bot){
  	var power = parseInt(msgLC.split(' ')[1]);
  	var prefix = "@" + message.author.username.toString() + " summons a monster like whoa: \n";
  	// console.log("rollChance", dice);
  	if(msgLC.includes("streak!")){
  		message.channel.send("You asked for it....");
  		var fakePwr = 4;
  		message.channel.send(fakePwr+"\n"+rd.generateMonster(fakePwr)+rd.generateMonster(fakePwr)+rd.generateMonster(fakePwr));
  		fakePwr = 8;
  		message.channel.send(fakePwr+"\n"+rd.generateMonster(fakePwr)+rd.generateMonster(fakePwr)+rd.generateMonster(fakePwr));
  		fakePwr = 14;
  		message.channel.send(fakePwr+"\n"+rd.generateMonster(fakePwr)+rd.generateMonster(fakePwr)+rd.generateMonster(fakePwr));
  		fakePwr = 20;
  		message.channel.send(fakePwr+"\n"+rd.generateMonster(fakePwr)+rd.generateMonster(fakePwr)+rd.generateMonster(fakePwr));
  		message.delete();
  	}
  	if(Number.isInteger(power)){
  		if(power > 4 && power < 21){
  			message.channel.send(prefix+rd.generateMonster(power));
  		}else{
  			message.channel.send(prefix+"Power: "+power+", should represent approx highest monster dice pool, between 5 and 20.");
  		}
  		message.delete();
  	}
  	else{
  		// message.channel.send(prefix+retval);
  	}
  }

});




// log our bot in
try{
	console.log("My token is: "+token);
	bot.login(token);
}catch(err){
	console.log(err.message);
}
