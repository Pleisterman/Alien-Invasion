/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\options\optionsBackgroundModule.js
 * 
 *  Last Revision:  24-03-2018
 * 
 *  Purpose:  
 *      draws the background for the scene options
 * 
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: optionsBackgroundModule( Phaser.Game, module: audio ) void
    
    alienInvasion.optionsBackgroundModule = function( game, audio ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'optionsBackgroundModule';                        // string
        self.debugOn = true;                                            // boolean
        self.imageUrl = alienInvasion.config['imageUrl'];                       // string
        self.game = game;                                               // Phaser.Game
        self.audio = audio;                                             // module
        self.backgroundImage = {                                        // json: backgroundImage
            'assetId'           :   'optionsBackground',                // string
            'originalSize'      :   {
                'width'         :   0,
                'height'        :   0
            },
            'maximumWidth'      :   1400,                               // integer
            'type'              :   'image',                            // string
            'fileName'          :   self.imageUrl + 'background.png',   // string
            'phaserObject'      :   null                                // Phaser:sprite
        };                                                              // done json: backgroundImage
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // subscribe to game layoutChange
            jsProject.subscribeToEvent( 'gameLayoutChange', self.layoutChange );

        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.removeEventSubscriptions = function(){
        // FUNCTION: removeEventSubscriptions( void ) void
            
            // remove game layoutChange
            jsProject.unSubscribeFromEvent( 'gameLayoutChange', self.layoutChange );
            
        // DONE FUNCTION: removeEventSubscriptions( void ) void
        };
        self.preload = function() {
        // FUNCTION: preload( void ) void
            
            // load sprite image
            alienInvasion.loadAsset( self.backgroundImage ); 
            
        // DONE FUNCTION: preload( void ) void
        };
        self.create = function(  ){
        // FUNCTION: create( void ) void
            
            // create background image
            self.backgroundImage['phaserObject'] = self.game.add.sprite( 0, 0,  self.backgroundImage['assetId'] ); 
            // set alpha
            self.backgroundImage['phaserObject'].alpha = 0;
            // add tween
            self.game.add.tween( self.backgroundImage['phaserObject'] ).to( { alpha: 1 }, 
                                 alienInvasion.config['sceneShowTransitionPeriod'], 
                                 Phaser.Easing.Linear.In, 
                                 true );
            
            // adjust layout
            self.layoutChange();
            
            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: create( void ) void
        };
        self.update = function(  ){
        // FUNCTION: update( void ) void

             
        // DONE FUNCTION: update( void ) void
        };
        self.layoutChange = function( ) {
        // FUNCTION: layoutChange( void ) void
        
            // set background width
            self.backgroundImage['phaserObject'].width = self.game.world.width;
            // set background height
            self.backgroundImage['phaserObject'].height = self.game.world.height;
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.destruct = function(  ){
        // FUNCTION: destruct( void ) void
            
            // remove event subscriptions
            self.removeEventSubscriptions();
            
            // destroy phaserobject
            self.backgroundImage['phaserObject'].destroy();
            // unset phaserobject
            self.backgroundImage['phaserObject'] = null;
            
            // destroy sprite image
            alienInvasion.destroyAsset( self.backgroundImage ); 
            
        // DONE FUNCTION: destruct( void ) void
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
            },
            // function create( void ) void
            create: function( ){
                // call internal
                self.create( );
            },
            // function update( void ) void
            update: function( ){
                // call internal
                self.update( );
            },
            // function destruct( void ) void
            destruct: function( ){
                // call internal
                self.destruct( );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: optionsBackgroundModule( Phaser.Game, module: audio ) void
})( alienInvasion );
// done create module function
