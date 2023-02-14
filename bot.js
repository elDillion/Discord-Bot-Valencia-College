
//Declaring Variables
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
const weather = require('weather-js');
var giveMeAJoke = require('give-me-a-joke');
var WikiFakt = require('wikifakt')
const korona = require("covid-global")

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    
    
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !test
            case 'test':
                bot.sendMessage({
                    to: channelID,
                    message: 'Testing!'
        });
            break;
           //!weather
           case 'weather':
           var weather = require('weather-js');
             weather.find({search: '32765', degreeType: 'F'}, function(err, result) {
                if(err) console.log(err);
                 bot.sendMessage ({
                     to:channelID,
                     message: (JSON.stringify(result[0].current, null, 2))
                    });
        });
           
            break;
            //!joke
            case 'joke':
            var giveMeAJoke = require('give-me-a-joke');
            giveMeAJoke.getRandomDadJoke (function(joke) {
                console.log(joke);
                bot.sendMessage ({
                    to:channelID,
                    message: (joke)
                
                })
});
            break;
            //!help
            case 'help':

            bot.sendMessage ({
                to:channelID,
                message: '!test, !weather, !joke, !fact'
});
        

            // INSERT ALL NEW COMMANDS FOR APIs HERE!!!!
            break;
            case 'fact':
            var WikiFakt = require('wikifakt')
            WikiFakt.getRandomFact().then(function(fact) {
                 console.log(fact);
                 bot.sendMessage ({
                     to:channelID,
                     message: (fact)

                 })
});
            break;
            case 'covid':
             async function output() {
             let country = await korona.country("Afghanistan")
                bot.sendMessage ({
                to:channelID,
                message: (JSON.stringify(country))
            })
             }
             output()

            break;
         }
        
     }
});