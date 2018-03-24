/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\highScores\highScoresModule.js
 * 
 *  Last Revision:  24-03-2018
 * 
 *  Purpose:  
 *      handles the scene: highScores
 * 
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: highScoresModule( void ) void
    
    alienInvasion.highScoresModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'highScoresModule';                               // string
        self.debugOn = false;                                           // boolean
        self.imageUrl = alienInvasion.config['imageUrl'];               // string
        self.game = null;                                               // Phaser.Game
        self.sceneId = 'highScores';                                    // string
        self.audio = null;                                              // module
        self.modules = [                                                // json: modules
            {                                                           // json: highScoresBackground
                'id'            :   'highScoresBackground',
                'MODULE'        :   alienInvasion.highScoresBackgroundModule,
                'moduleObject'  :   null
            },                                                          // done json: highScoresBackground
            {                                                           // json: highScoresContent
                'id'            :   'highScoresContent',                  
                'MODULE'        :   alienInvasion.highScoresContentModule,
                'moduleObject'  :   null
            },                                                          // done json: highScoresContent
            {                                                           // json: highScoresForeground
                'id'            :   'highScoresForeground',                  
                'MODULE'        :   alienInvasion.highScoresForegroundModule,
                'moduleObject'  :   null
            },                                                          // done json: highScoresForeground
            {                                                           // json: fullScreenButton
                'id'            :   'fullScreenButton',                  
                'MODULE'        :   alienInvasion.fullScreenButtonModule,
                'moduleObject'  :   null
            },                                                           // done json: fullScreenButton
            {                                                           // json: gameAudioButton
                'id'            :   'gameAudioButton',                  
                'MODULE'        :   alienInvasion.gameAudioButtonModule,
                'moduleObject'  :   null
            },                                                          // done json: gameAudioButton
            {                                                           // json: backToMenuButton
                'id'            :   'backToMenuButton',                  
                'MODULE'        :   alienInvasion.backToMenuButtonModule,
                'moduleObject'  :   null
            }                                                           // done json: backToMenuButton
        ];                                                              // done json: modules
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // event subscription
            self.addEventSubscriptions();

        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // subscribe to add scenes
            jsProject.subscribeToEvent( 'addScenes', self.addScene );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addScene = function( game ){
        // FUNCTION: addScene( Phaser.Game: game ) void
            
            // debug info
            self.debug( 'addScene' );
            
            // remember game
            self.game = game;

            // add state to game
            self.game.state.add( self.sceneId, self );

            // create audio module
            self.audio = new alienInvasion.highScoresAudioModule( self.game );
                
            // loop over modules
            for( var i = 0; i < self.modules.length; i++ ){
                
                // create and add module
                self.modules[i]['moduleObject'] = new self.modules[i]['MODULE']( self.game, self.audio );
                
            }
            // done loop over modules
            
        // DONE FUNCTION: addScene( Phaser.Game: game ) void
        };
        self.preload = function(  ){
        // FUNCTION: preload( void ) void
            
            // debug info
            self.debug( 'preload' );
            
            // preload audio
            self.audio.preload();
            
            // loop over modules
            for( var i = 0; i < self.modules.length; i++ ){
                // call preload
                self.modules[i]['moduleObject'].preload();
            }
            // done loop over modules
            
        // DONE FUNCTION: preload( void ) void
        };
        self.create = function(  ){
        // FUNCTION: create( void ) void
            
            // debug info
            self.debug( 'create' );

            // create audio
            self.audio.create();
            
            // loop over modules
            for( var i = 0; i < self.modules.length; i++ ){
                // call create
                self.modules[i]['moduleObject'].create();
            }
            // done loop over modules
            
        // DONE FUNCTION: create( void ) void
        };
        self.update = function(  ){
        // FUNCTION: update( void ) void

            // update audio
            self.audio.update();
            
            // loop over modules
            for( var i = 0; i < self.modules.length; i++ ){
                // call update
                self.modules[i]['moduleObject'].update();
            }
            // done loop over modules
                          
        // DONE FUNCTION: update( void ) void
        };
        self.shutdown = function(  ){
        // FUNCTION: shutdown( void ) void
        
            // debug info
            self.debug( 'shutdown' );
            
            // destruct audio
            self.audio.destruct();
            
            // loop over modules
            for( var i = 0; i < self.modules.length; i++ ){
                // call destruct
                self.modules[i]['moduleObject'].destruct();
            }
            // done loop over modules
            
        // DONE FUNCTION: shutdown( void ) void
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
    // DONE MODULE: highScoresModule( void ) void
})( alienInvasion );
// done create module function
