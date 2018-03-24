/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\highScores\highScoresContentModule.js
 * 
 *  Last Revision:  19-03-2018
 *  
 *  Purpose:  
 *      creates the content for the scene highScores
 * 
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: highScoresContentModule( Phaser.Game, module: audio ) void
    
    alienInvasion.highScoresContentModule = function( game, audio ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'highScoresContentModule';                        // string
        self.debugOn = false;                                           // boolean
        self.imageUrl = alienInvasion.config['imageUrl'];               // string
        self.game = game;                                               // Phaser.Game
        self.audio = audio;                                             // module
        self.highScoresList = null;                                     // module
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // create list
            self.highScoresList = new alienInvasion.highScoresListModule( self.game );
           
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void

            // subscribe to game layoutChange
            jsProject.subscribeToEvent( 'gameLayoutChange', self.layoutChange );

            // subscribe to refreshHighScores
            jsProject.subscribeToEvent( 'refreshHighScores', self.refresh );

        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.removeEventSubscriptions = function(){
        // FUNCTION: removeEventSubscriptions( void ) void
            
            // remove game layoutChange
            jsProject.unSubscribeFromEvent( 'gameLayoutChange', self.layoutChange );
            
            // remove refreshHighScores
            jsProject.unSubscribeFromEvent( 'refreshHighScores', self.refresh );
                        
        // DONE FUNCTION: removeEventSubscriptions( void ) void
        };
        self.preload = function() {
        // FUNCTION: preload( void ) void

            // call list preload
            self.highScoresList.preload();

        // DONE FUNCTION: preload( void ) void
        };
        self.create = function(  ){
        // FUNCTION: create( void ) void
            
            // debug info
            self.debug( 'create' );

            // call list create
            self.highScoresList.create();
            
            // adjust layout
            self.layoutChange();
            
            // event subscription
            self.addEventSubscriptions();
            
        // DONE FUNCTION: create( void ) void
        };
        self.update = function(  ){
        // FUNCTION: update( void ) void
                                       
            // call list create
            self.highScoresList.update();
            
        // DONE FUNCTION: update( void ) void
        };
        self.layoutChange = function( ) {
        // FUNCTION: layoutChange( void ) void
        
            // adjust list
            self.highScoresList.layoutChange( );
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.refresh = function( ) {
        // FUNCTION: refresh( void ) void
            
            // refresh list
            self.highScoresList.refresh( );
            
            // adjust layout
            self.layoutChange();
            
        // DONE FUNCTION: refresh( void ) void
        };
        self.destruct = function(  ){
        // FUNCTION: destruct( void ) void

            // remove event subscriptions
            self.removeEventSubscriptions();
            
            // destruct select list
            self.highScoresList.destruct();
                        
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
    // DONE MODULE: highScoresContentModule( Phaser.Game, module: audio ) void
})( alienInvasion );
// done create module function
