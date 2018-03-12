/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\index\valuesModule.js
 * 
 *  Last Revision:  08-03-2018
 * 
 *  Purpose:  
 *      creates the project values
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: valuesModule( void ) void
    
    alienInvasion.valuesModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object
        self.MODULE = 'valuesModule';                       // string
        self.debugOn = false;                               // boolean
        self.values = [                                     // json[ json, json, json..]: values
            {                                               // json: audio supported
                "groupName" :   "audio",                    // string
                "valueName" :   "supported",                // string
                "value"     :   true                        // var
            },                                              // done json: audio supported
            {                                               // json: audio on
                "groupName" :   "audio",                    // string
                "valueName" :   "on",                       // string
                "value"     :   alienInvasion.config['audioOn'] // var
            },                                              // done json: audio on
            {                                               // json: music on
                "groupName" :   "music",                    // string
                "valueName" :   "on",                       // string
                "value"     :   alienInvasion.config['musicOn'] // var
            },                                              // done json: audio on
            {                                               // json: gameMusic on
                "groupName" :   "music",                    // string
                "valueName" :   "volume",                   // string
                "value"     :   alienInvasion.config['musicVolume'] // var 
            },                                              // done json: audio on
            {                                               // json: gameMusic on
                "groupName" :   "audioEffects",             // string
                "valueName" :   "on",                       // string
                "value"     :   alienInvasion.config['audioEffectsOn'] // var
            },                                              // done json: audio on
            {                                               // json: gameMusic on
                "groupName" :   "audioEffects",             // string
                "valueName" :   "volume",                   // string
                "value"     :   alienInvasion.config['audioEffectsVolume'] // var
            },                                              // done json: gameMusic on
            {                                               // json: game paused
                "groupName" :   "game",                     // string
                "valueName" :   "paused",                   // string
                "value"     :   false                       // var
            },                                              // done json: game paused
            {                                               // json: gameScreenSize isFullScreen
                "groupName" :   "gameScreenSize",           // string
                "valueName" :   "isFullScreen",             // string
                "value"     :   false                       // var
            },                                              // done json: gameScreenSize isFullScreen
            {                                               // json: game difficulty
                "groupName" :   "game",                     // string
                "valueName" :   "difficulty",               // string
                "value"     :   0                           // var
            },                                              // done json: game difficulty
            {                                               // json: game missionIndex
                "groupName" :   "game",                     // string
                "valueName" :   "missionIndex",             // string
                "value"     :   0                           // var
            },                                              // done json: game missionIndex
            {                                               // json: game levelIndex
                "groupName" :   "game",                     // string
                "valueName" :   "levelIndex",               // string
                "value"     :   0                           // var
            },                                              // done json: game levelIndex
            {                                               // json: game missionData
                "groupName" :   "game",                     // string
                "valueName" :   "missionData",              // string
                "value"     :   null                        // var
            },                                              // done json: game missionData
            {                                               // json: player name
                "groupName" :   "player",                   // string
                "valueName" :   "name",                     // string
                "value"     :   ''                          // var
            },                                              // done json: player name
            {                                               // json: game score
                "groupName" :   "game",                     // string
                "valueName" :   "score",                    // string
                "value"     :   0                           // var
            },                                              // done json: game score
            {                                               // json: game lives
                "groupName" :   "game",                     // string
                "valueName" :   "lives",                    // string
                "value"     :   0                           // var
            },                                              // done json: game lives
            {                                               // json: game scoreModule
                "groupName" :   "game",                     // string
                "valueName" :   "scoreModule",              // string
                "value"     :   null                        // var
            },                                              // done json: game scoreModule
            {                                               // json: game physicsModule
                "groupName" :   "game",                     // string
                "valueName" :   "physicsModule",            // string
                "value"     :   null                        // var
            },                                              // done json: game physicsModule
            {                                               // json: game artefactsModule
                "groupName" :   "game",                     // string
                "valueName" :   "artefactsModule",          // string
                "value"     :   null                        // var
            },                                              // done json: game artefactsModule
            {                                               // json: game shipModule
                "groupName" :   "game",                     // string
                "valueName" :   "shipModule",               // string
                "value"     :   null                        // var
            },                                              // done json: game shipModule
            {                                               // json: game shipBulletsModule
                "groupName" :   "game",                     // string
                "valueName" :   "shipBulletsModule",        // string
                "value"     :   null                        // var
            },                                              // done json: game shipBulletsModule
            {                                               // json: game shipWeaponsModule
                "groupName" :   "game",                     // string
                "valueName" :   "shipWeaponsModule",        // string
                "value"     :   null                        // var
            },                                              // done json: game shipWeaponsModule
            {                                               // json: game shipEnginesModule
                "groupName" :   "game",                     // string
                "valueName" :   "shipEnginesModule",        // string
                "value"     :   null                        // var
            },                                              // done json: game shipEnginesModule
            {                                               // json: game enemyBulletsModule
                "groupName" :   "game",                     // string
                "valueName" :   "enemyBulletsModule",       // string
                "value"     :   null                        // var
            },                                              // done json: game enemyBulletsModule
            {                                               // json: game enemieBombsModule
                "groupName" :   "game",                     // string
                "valueName" :   "enemiesBombsModule",       // string
                "value"     :   null                        // var
            },                                              // done json: game enemieBombsModule
            {                                               // json: game enemieWeaponsModule
                "groupName" :   "game",                     // string
                "valueName" :   "enemiesWeaponsModule",     // string
                "value"     :   null                        // var
            },                                              // done json: game enemieWeaponsModule
            {                                               // json: game enemiesModule
                "groupName" :   "game",                     // string
                "valueName" :   "enemiesModule",            // string
                "value"     :   null                        // var
            },                                              // done json: game enemiesModule
            {                                               // json: game enemyWeaponsModule
                "groupName" :   "game",                     // string
                "valueName" :   "enemyWeaponsModule",       // string
                "value"     :   null                        // var
            },                                              // done json: game enemyWeaponsModule
            {                                               // json: game explosionsModule
                "groupName" :   "game",                     // string
                "valueName" :   "explosionsModule",         // string
                "value"     :   null                        // var
            },                                              // done json: game explosionsModule
            {                                               // json: gameContent width
                "groupName" :   "gameContent",              // string
                "valueName" :   "width",                    // string
                "value"     :   0                           // var
            },                                              // done json: gameContent width
            {                                               // json: gameContent height
                "groupName" :   "gameContent",              // string
                "valueName" :   "height",                   // string
                "value"     :   0                           // var
            },                                              // done json: gameContent height
            {                                               // json: gameContent marginLeft
                "groupName" :   "gameContent",              // string
                "valueName" :   "marginLeft",               // string
                "value"     :   0                           // var
            },                                              // done json: gameContent marginLeft
            {                                               // json: gameContent marginTop
                "groupName" :   "gameContent",              // string
                "valueName" :   "marginTop",                // string
                "value"     :   0                           // var
            },                                              // done json: gameContent marginTop
            {                                               // json: highScores checkScore
                "groupName" :   "highScores",               // string
                "valueName" :   "checkScore",               // string
                "value"     :   false                       // var
            }                                               // done json: highScores checkScore
        ];                                                  // done json[ json, json, json..]: values
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add values
            self.addValues();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addValues = function() {
        // FUNCTION: addValues( void ) void

            // debug info
            self.debug( 'addValues' );
            
            // loop over values
            for( var i = 0; i < self.values.length; i++ ) {
                // add the values for the app to the project
                jsProject.addValue( self.values[i]["valueName"], self.values[i]["groupName"], self.values[i]["value"] );
            }
            // done loop over values
            
        // DONE FUNCTION: addValues( void ) void
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                // call global debug
                jsProject.debug( self.MODULE + ' ' + message );
            }
            // done debug on
            
        // DONE FUNCTION: debug( string: message ) void
        };
        // DONE FUNCTIONS

        // initialize the class 
        self.construct();
        // DONE PRIVATE
        
        // PUBLIC
        return {
        };
        // DONE PUBLIC
    };
    // DONE MODULE: valuesModule( alienInvasion ) void
})( alienInvasion );
// done create module function
