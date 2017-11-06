(function(global) {
    "use strict;"

    var Config = {
         APIEndpoint : '/api/v1',
        SpikaBaseURL : '/dogSysytem',
        defaultContaier : 'body', // write JQuery style selector
        
        port:7070,


    };

    // Exports ----------------------------------------------
    module["exports"] = Config;

})((this || 0).self || global);
