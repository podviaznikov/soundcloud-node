var util=require('util'),
    cloudsound=require('./soundcloud'),
    express=require('express'),
    app=express.createServer();

cloudsound.saveOauthToken('90bfd2a3e6cf54515d6da428c1dd4d6a');

cloudsound.mytracks(function(data) {
  util.log(util.inspect(data));
});

cloudsound.me(function(data) {
  util.log(util.inspect(data));
});

app.listen(process.env.C9_PORT);
util.log('started app');