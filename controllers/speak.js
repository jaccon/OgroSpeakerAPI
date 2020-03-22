const { Authorization, GoogleHomeIp  } = require('../configuration');

module.exports = {

  async status(req, res){
    
    const ping = require('ping');
    const hosts = [GoogleHomeIp];

    hosts.forEach(function (host) {
      ping.promise.probe(host)
        .then(function (response) {
            let status = response.alive;
            if(status === true){
              return res.status(200).json({"message" : "Google Home Online"});
            } else {
              return res.status(400).json({"message" : "Google Home Offline"});
            }
        });
    });

  },

  async sender(req, res) {

    const { authorization, language, speed } = req.headers;
    const { message } = req.body;

    // Check Authorization
    if(authorization !== Authorization){
      return res.status(400).json({'error' : 'Autorization denied'});
    }

    // Check Messages
    if(!message){
      return res.status(400).json({'error' : 'Message not defined'});
    }

    // Check Language
    if(!language){
      locale = 'pt';
    } else {
      locale = language;
    }

    // Check Speed
    if(!speed){
      speed = 1
    }

    const GoogleHomePlayer = require('./streaming'); 
    const googleHome = new GoogleHomePlayer(GoogleHomeIp, locale, Number(speed));

    await googleHome
    .say(message)
    .then(function() {
      console.log('done');
    })
    .catch(function(err) {
      console.error(err);
    });

    return res.json({
      'language': language, 
      'speed' : speed, 
      'message' : message
    });

  },

  
};