/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\highScores\highScoresBackgroundModule.js
 * 
 *  Last Revision:  19-03-2018
 * 
 *  Purpose:  
 *      draws the background for the game scene highScores
 * 
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: highScoresBackgroundModule( Phaser.Game, module: audio ) void
    
    alienInvasion.highScoresBackgroundModule = function( game, audio ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'highScoresBackgroundModule';                     // string
        self.debugOn = true;                                            // boolean
        self.imageUrl = alienInvasion.config['imageUrl'];               // string
        self.game = game;                                               // Phaser.Game
        self.audio = audio;                                             // module
        self.backgroundImage = {                                        // json: backgroundImage
            'assetId'           :   'mainBackground',                   // string
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
            
            // debug info
            self.debug( 'create' );

            // create background image
            self.backgroundImage['phaserObject'] = self.game.add.sprite( 0, 0,  self.backgroundImage['assetId'] ); 
            // set alpha
            self.backgroundImage['phaserObject'].alpha = 0;
            // add tween
            self.game.add.tween( self.backgroundImage['phaserObject'] ).to( { alpha: 0.4 }, 
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

            // destroy sprite image
            alienInvasion.destroyAsset( self.backgroundImage ); 
            // destroy phaserobject
            self.backgroundImage['phaserObject'].destroy();
            // unset phaserobject
            self.backgroundImage['phaserObject'] = null;

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
    // DONE MODULE: highScoresBackgroundModule( Phaser.Game, module: audio ) void
})( alienInvasion );
// done create module function
