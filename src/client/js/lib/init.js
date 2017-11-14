(function(global) {
    "use strict;"

    var Config = {
         APIEndpoint : '/dogsystem/v1',
         SpikaBaseURL : '/dogsystem',
         defaultContaier : 'body', // write JQuery style selector
        

        port:7070,


    };

    // Exports ----------------------------------------------
    module["exports"] = Config;

})((this || 0).self || global);
