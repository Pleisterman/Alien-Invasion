/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\gameMenu\gameMenuModule.js
 * 
 *  Last Revision:  24-03-2018
 * 
 * 
 *  Purpose:  
 *      handles the scene: gameMenu
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: gameMenuModule( void ) void
    
    alienInvasion.gameMenuModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'gameMenuModule';                                 // string
        self.debugOn = true;                                            // boolean
        self.game = null;                                               // Phaser.Game
        self.sceneId = 'gameMenu';                                      // string
        self.audio = null;                                              // module
        self.modules = [                                                // json: modules
            {                                                           // json: gameMenuBackground
                'id'            :   'gameMenuBackground',
                'MODULE'        :   alienInvasion.gameMenuBackgroundModule,
                'moduleObject'  :   null
            },                                                          // done json: gameMenuBackground
            {                                                           // json: gameMenuContent
                'id'            :   'gameMenuContent',                  
                'MODULE'        :   alienInvasion.gameMenuContentModule,
                'moduleObject'  :   null
            },                                                          // done json: gameMenuContent
            {                                                           // json: gameMenuForeground
                'id'            :   'gameMenuForeground',                  
                'MODULE'        :   alienInvasion.gameMenuForegroundModule,
                'moduleObject'  :   null
            },                                                          // done json: gameMenuForeground
            {                                                           // json: fullScreenButton
                'id'            :   'fullScreenButton',                  
                'MODULE'        :   alienInvasion.fullScreenButtonModule,
                'moduleObject'  :   null
            },                                                           // done json: fullScreenButton
            {                                                           // json: gameAudioButton
                'id'            :   'gameAudioButton',                  
                'MODULE'        :   alienInvasion.gameAudioButtonModule,
                'moduleObject'  :   null
            }                                                           // done json: gameAudioButton
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
        // FUNCTION: addScene( Phaser.game: game ) void
            
            // debug info
            self.debug( 'addScene' );
            
            // remember game
            self.game = game;

            // add scene to game
            self.game.state.add( self.sceneId, self );
            
            // create audio module
            self.audio = new alienInvasion.gameMenuAudioModule( self.game );
                
            // loop over modules
            for( var i = 0; i < self.modules.length; i++ ){
                
                // create and add module
                self.modules[i]['moduleObject'] = new self.modules[i]['MODULE']( self.game, self.audio );
                
            }
            // done loop over modules
                        
            
        // DONE FUNCTION: addScene( Phaser.game: game ) void
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
    // DONE MODULE: gameMenuModule( void ) void
})( alienInvasion );
// done create module function
