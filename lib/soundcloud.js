var util=require('util'),
    rest=require('restler'),
    baseURL='https://api.soundcloud.com',
    cloudsound=exports;

cloudsound.saveOauthToken=function(token){
    this.oauth_token=token;
};

cloudsound.me=function(callback){
    rest.get(baseURL+'/me.json?oauth_token='+this.oauth_token).on('complete',callback) ;
};



