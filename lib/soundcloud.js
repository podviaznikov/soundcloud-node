var util=require('util'),
    rest=require('restler'),
    baseURL='https://api.soundcloud.com',
    cloudsound=exports;
    
//should be called before calling othe rapi methods
cloudsound.saveOauthToken=function(token){
    this.oauth_token=token;
};


//me resources
cloudsound.me=function(callback){
    jsonRequest('/me.json',callback);
};

cloudsound.mytracks=function(callback){
    jsonRequest('/me/tracks.json',callback);   
};

var jsonRequest=function(resource,callback){
    rest.get(baseURL+resource+'?oauth_token='+cloudsound.oauth_token).on('complete',callback);
};

