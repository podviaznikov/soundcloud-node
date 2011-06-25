var util=require('util'),
    querystring=require('querystring'),
    rest=require('restler'),
    cloudsound=exports;
    
//should be called before calling othe rapi methods
cloudsound.saveOauthToken=function(token){
    this.oauth_token=token;
};


//me resources
cloudsound.me=function(callback){
    jsonRequest('/me.json',callback);
};
//all tracks for user
cloudsound.myTracks=function(callback){
    jsonRequest('/me/tracks.json',callback);
};
//private streamable tracks
cloudsound.myPrivateStreamableTracks=function(callback){
    jsonRequest('/me/tracks.json',function(tracks){
        var newTracks=[];
        if(tracks && tracks.length>0){
            for(var i=0;i<tracks.length;i++){
                var track=tracks[i],
                    newTrack={
                        name:track.title,
                        url:track.stream_url+'?oauth_token='+cloudsound.oauth_token
                    };
                newTracks[i]=newTrack;    
            }
        }
        callback(newTracks);
    },{filter:'private,streamable'});
};

var jsonRequest=function(resource,callback,params){
    params=params||{};
    params.oauth_token=cloudsound.oauth_token;
    rest.get('https://api.soundcloud.com'+resource+'?'+querystring.stringify(params)).on('complete',callback);
};

