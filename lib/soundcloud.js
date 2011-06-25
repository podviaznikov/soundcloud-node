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
    jsonRequest('/me.json',{},callback,function(){
        callback({});    
    });
};
//all tracks for user
cloudsound.myTracks=function(callback){
    jsonRequest('/me/tracks.json',{},callback,function(){
        callback([]);    
    });
};
//private streamable tracks
cloudsound.myPrivateStreamableTracks=function(callback){
    jsonRequest('/me/tracks.json',{filter:'private,streamable'},function(tracks){
        var newTracks=[];
        if(tracks && tracks.length>0){
            for(var i=0;i<tracks.length;i++){
                var track=tracks[i];
                if(track.title){
                    var newTrack={
                        name:track.title,
                        url:track.stream_url+'?oauth_token='+cloudsound.oauth_token
                    };
                    newTracks[i]=newTrack;    
                }
            }
        }
        callback(newTracks);
    },function(){
        callback([]);
    });
};

var jsonRequest=function(resource,params,successCallback,errorCallback){
    params=params||{};
    params.oauth_token=cloudsound.oauth_token;
    rest.get('https://api.soundcloud.com'+resource+'?'+querystring.stringify(params))
        .on('complete',successCallback)
        .on('error',errorCallback);
};

