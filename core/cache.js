const cache = require("node-cache")


const myCache = new cache( { stdTTL: 100, checkperiod: 120 } );

function getCache(key){
    if(key === undefined || key===""){
        return myCache.keys()
    }
    
    return myCache.get(key)
}

function setCache(uniqueIdentifier,data,ttl)
{
    myCache.set(uniqueIdentifier,data,ttl)
}

module.exports = {getCache,setCache}