/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\commonAssetsModule.js
 * 
 *  Last Revision:  08-03-2018
 * 
 *  Purpose:  
 *      loads common assets
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: commonAssetsModule( Phaser.game: game  ) void
    
    alienInvasion.commonAssetsModule = function( game ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'commonAssetsModule';                             // string: module
        self.debugOn = false;                                           // boolean: debugOn
        self.game = game;                                               // Phaser.game: game
        self.imageUrl = alienInvasion.config['imageUrl'];               // string: image dir
        self.commonAssets = [                                           // json: commonAssets                                       
            {                                                           // json: gameAudioButton
                "assetId"           :   "gameAudioButton", 
                "type"              :   "spritesheet",
                "fileName"          :   self.imageUrl + "gameAudioButton.png",
                "imageWidth"        :   80,
                "imageHeight"       :   80
            }                                                           // done json: gameAudioButton
        ];                                                              // done json: commonAssets                    
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.preload = function(  ){
        // FUNCTION: preload( void ) void
            
            // debug info
            self.debug( 'preload' );
            
            // load common assets
            for( var i = 0; i < self.commonAssets.length; i++ ){
                // load asset
                alienInvasion.loadAsset( self.commonAssets[i] ); 
            }
            // done load common assets 
            
        // DONE FUNCTION: preload( void ) void
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
            // function preload( void ) void
            preload: function( ){
                // call internal
                self.preload( );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: commonAssetsModule( Phaser.game: game ) void
})( alienInvasion );
// done create module function
