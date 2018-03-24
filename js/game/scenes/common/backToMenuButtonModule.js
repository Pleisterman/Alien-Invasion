/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\common\backToMenuButtonModule.js
 * 
 *  Last Revision:  13-03-2018
 * 
 *  Purpose:  
 *      creates the back to gameMenu button handles the events
 * 
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: backToMenuButtonModule( Phaser.game: game, module: audio ) void
    
    alienInvasion.backToMenuButtonModule = function( game, audio ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'backToMenuButtonModule';                         // string
        self.debugOn = false;                                           // boolean
        self.imageUrl = alienInvasion.config['imageUrl'];               // url
        self.game = game;                                               // Phaser.Game
        self.audio = audio;                                             // module
        self.buttonOptions = {                                          // json: buttonOptions
            'id'                    :   'backToMenuButton',             // string
            'assetId'               :   'backToMenuButton',             // string
            'sceneId'               :   'gameMenu',                     // string
            'phaserObject'          :   null,                           // Phaser.Sprite
            'width'                 :   60,                             // integer: px                                      
            'height'                :   60,                             // integer: px
            'mobileWidth'           :   30,                             // integer: px                                      
            'mobileHeight'          :   30,                             // integer: px
            'marginLeft'            :   25,                             // integer: px
            'marginTop'             :   65,                             // integer: px
            'mobileMarginLeft'      :   5,                              // integer: px
            'mobileMarginTop'       :   45                              // integer: px
        };                                                              // done json: buttonOptions
        self.mouseOverAudioEffectId = 'gameButtonOver';                 // string
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
            
            // subscribe to screenChange
            jsProject.subscribeToEvent( 'screenChange', self.layoutChange );

            // subscribe to keyboardEscape
            jsProject.subscribeToEvent( 'keyboardEscape', self.keyboardEscape );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.removeEventSubscriptions = function(){
        // FUNCTION: removeEventSubscriptions( void ) void
            
            // remove screenChange
            jsProject.unSubscribeFromEvent( 'screenChange', self.layoutChange );
            
            // remove keyboardEscape
            jsProject.unSubscribeFromEvent( 'keyboardEscape', self.keyboardEscape );
            
        // DONE FUNCTION: removeEventSubscriptions( void ) void
        };
        self.preload = function() {
        // FUNCTION: preload( void ) void

        // DONE FUNCTION: preload( void ) void
        };
        self.create = function( ){
        // FUNCTION: create( void ) void
            
            // debug info
            self.debug( 'create' );
            
            // create sprite
            self.buttonOptions['phaserObject'] = self.game.add.sprite( -100, -100, self.buttonOptions['assetId'] );   
            // enable events
            self.buttonOptions['phaserObject'].inputEnabled = true;
            // use hand cursor
            self.buttonOptions['phaserObject'].input.useHandCursor = true;      
 
            // set over event
            self.buttonOptions['phaserObject'].events.onInputOver.add( function( ){ self.inputOver( ); });
            // set out event
            self.buttonOptions['phaserObject'].events.onInputOut.add( function( ){ self.inputOut( ); });
            // add event handler
            self.buttonOptions['phaserObject'].events.onInputDown.add( function( ){ self.click( ); });
            
             // is mobile
            if( alienInvasion.isMobile ){
                
                // set button width
                self.buttonOptions['phaserObject'].width = self.buttonOptions['mobileWidth'];
                // set button height
                self.buttonOptions['phaserObject'].height = self.buttonOptions['mobileHeight'];

            }
            else {
                
                // set button width
                self.buttonOptions['phaserObject'].width = self.buttonOptions['width'];
                // set button height
                self.buttonOptions['phaserObject'].height = self.buttonOptions['height'];

            }
            // is mobile
            
            // set alpha
            self.buttonOptions['phaserObject'].alpha = 0;
            // add tween
            self.game.add.tween( self.buttonOptions['phaserObject'] ).to( { alpha: 1 }, 
                                 alienInvasion.config['sceneShowTransitionPeriod'], 
                                 Phaser.Easing.Linear.In, 
                                 true );

            // adjust layout
            self.layoutChange( );

            // add event subscription
            self.addEventSubscriptions();

        // DONE FUNCTION: create( void ) void
        };
        self.inputOver = function( ){
        // FUNCTION: inputOver( void ) void
            
            // debug info
            self.debug( 'over' );
            
            // set frame mouse over
            self.buttonOptions['phaserObject'].frame = 1;
                
            // play menu audio effect
            self.audio.playEffect( self.mouseOverAudioEffectId );
                
        // DONE FUNCTION: inputOver( void ) void
        };
        self.inputOut = function( ){
        // FUNCTION: inputOut( void ) void
        
            // audio ! supported

            // debug info
            self.debug( 'out' );

            // set frame audio on
            self.buttonOptions['phaserObject'].frame = 0;

            
        // DONE FUNCTION: inputOut( void ) void
        };
        self.click = function( ) {
        // FUNCTION: click( void ) void
                        
            // debug info
            self.debug( 'click' );
            
            // change scene
            self.game.state.start( self.buttonOptions['sceneId'] );
            
        // DONE FUNCTION: click( void ) void
        };
        self.update = function( ){
        // FUNCTION: update( void ) void
                                 
        // DONE FUNCTION: update( void ) void
        };
        self.keyboardEscape = function( ){
        // FUNCTION: keyboardEscape( void ) void
            
            // go to game menu
            self.game.state.start( self.buttonOptions['sceneId'] );
            
        // DONE FUNCTION: keyboardEscape( void ) void
        };
        self.layoutChange = function( ) {
        // FUNCTION: layoutChange( void ) void
           
            // is mobile
            if( alienInvasion.isMobile ){
                // set left
                self.buttonOptions['phaserObject'].x = self.buttonOptions['mobileMarginLeft'];
                // set top
                self.buttonOptions['phaserObject'].y = self.buttonOptions['mobileMarginTop']; 
            }
            else {
                // set left
                self.buttonOptions['phaserObject'].x = self.buttonOptions['marginLeft'];
                // set top
                self.buttonOptions['phaserObject'].y = self.buttonOptions['marginTop']; 
            }
            // is mobile
                        
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.destruct = function(  ){
        // FUNCTION: destruct( void ) void
        
            // debug info
            self.debug( 'destruct' );
            
            // remove event subscriptions
            self.removeEventSubscriptions();

            // destroy button
            self.buttonOptions['phaserObject'].destroy(); 
            // unset graphics
            self.buttonOptions['phaserObject'] = null;
            
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
            update: function(  ){
                // call internal
                self.update( );
            },
            // function layoutChange( void ) void
            layoutChange: function( ){
                // call internal
                self.layoutChange( );
            },
            // function destruct( void ) void
            destruct: function( ){
                // call internal
                self.destruct( );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: backToMenuButtonModule( Phaser.game: game, module: audio ) void
})( alienInvasion );
// done create module function
