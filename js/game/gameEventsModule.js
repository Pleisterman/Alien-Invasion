/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\gameEventsModule.js
 * 
 *  Last Revision:  08-03-2018
 * 
 *  Purpose: 
 *       handles: 
 *           mouseWheel event and calls a jsProject event
 *           keyboard keyDown event and calls:
 *                  jsProject keyboardBackSpace event
 *                  jsProject keyboardInputChar event
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: gameEventsModule( html element id: contentId, html element id: gameContentId ) void
    
    alienInvasion.gameEventsModule = function( contentId, gameContentId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'gameEventsModule';                               // string: module
        self.debugOn = false;                                           // boolean: debugOn
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // bind events
            self.bindEvents();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.bindEvents = function() {
        // FUNCTION: bindEvents( void ) void

            // add mouse wheel events for firefox
            $( document.body ).on( 'DOMMouseScroll', function( event ){ self.mouseWheel( event ); });

            // add mouse wheel events
            $( document.body ).on( 'mousewheel', function( event ){ self.mouseWheel( event ); });

            // add key down
            $( document.body ).keydown( function( event ){ self.keyDown( event ); });

            // add key up
            $( document.body ).keyup( function( event ){ self.keyUp( event ); });

        // DONE FUNCTION: bindEvents( void ) void
        };
        self.mouseWheel = function( event ) {
        // FUNCTION: mouseWheel( event: event ) void

            // prevent default
            event.preventDefault();
            // stop propagation
            event.stopPropagation();

            // debug info
            self.debug( 'mouseWheel' );

            var delta = parseInt( event.originalEvent.wheelDelta || -event.originalEvent.detail );
            
            // call global event
            jsProject.callEvent( 'mouseWheel', delta );


        // DONE FUNCTION: mouseWheel( event: event ) void
        };
        self.keyDown = function( event ) {
        // FUNCTION: keyDown( event: event ) void

            // prevent default
            event.preventDefault();
            // stop propagation
            event.stopPropagation();

            // debug info
            self.debug( 'keyDown: ' + event.keyCode );

            // is backspace
            if( event.keyCode === alienInvasion.config['keyCodes']['backSpace'] ){
                // debug info
                self.debug( 'keyboardBackSpace' );
                // call global event
                jsProject.callEvent( 'keyboardBackSpace' );
            }
            // done is backspace

            // is arrow key up
            if( event.keyCode === alienInvasion.config['keyCodes']['arrowUp'] ){
                // debug info
                self.debug( 'keyboardArrowUp' );
                // call global event
                jsProject.callEvent( 'keyboardArrow', 'up' );
            }
            // done is arrow key up

            // is arrow key down
            if( event.keyCode === alienInvasion.config['keyCodes']['arrowDown'] ){
                // debug info
                self.debug( 'keyboardArrowDown' );
                // call global event
                jsProject.callEvent( 'keyboardArrow', 'down' );
            }
            // done is arrow key up

            // is arrow key left
            if( event.keyCode === alienInvasion.config['keyCodes']['arrowLeft'] ){
                // debug info
                self.debug( 'keyboardArrowLeft' );
                // call global event
                jsProject.callEvent( 'keyboardArrow', 'left' );
            }
            // done is arrow key left
            
            // is arrow key right
            if( event.keyCode === alienInvasion.config['keyCodes']['arrowRight'] ){
                // debug info
                self.debug( 'keyboardArrowRight' );
                // call global event
                jsProject.callEvent( 'keyboardArrow', 'right' );
            }
            // done is arrow key right

            // is escape key
            if( event.keyCode === alienInvasion.config['keyCodes']['escape'] ){
                // debug info
                self.debug( 'keyboardEscape' );
                // call global event
                jsProject.callEvent( 'keyboardEscape' );
            }
            // done is arrow key right


            // is char
            if( alienInvasion.config['inputChars'][event.which] !== undefined ){
                // get char
                var char = alienInvasion.config['inputChars'][event.which];
                // debug info
                self.debug( char );
                // call global event
                jsProject.callEvent( 'keyboardInputChar', char );
            }
            // done is letter
            
        // DONE FUNCTION: keyDown( event: event ) void
        };
        self.keyUp = function( event ) {
        // FUNCTION: keyUp( event: event ) void

            // prevent default
            event.preventDefault();
            // stop propagation
            event.stopPropagation();

            // debug info
            self.debug( 'keyUp ' );

            // is arrow key up
            if( event.keyCode === alienInvasion.config['keyCodes']['arrowUp'] ){
                // debug info
                self.debug( 'keyboardArrowUp' );
                // call global event
                jsProject.callEvent( 'keyboardArrowUp', 'up' );
            }
            // done is arrow key up

            // is arrow key down
            if( event.keyCode === alienInvasion.config['keyCodes']['arrowDown'] ){
                // debug info
                self.debug( 'keyboardArrowDown' );
                // call global event
                jsProject.callEvent( 'keyboardArrowUp', 'down' );
            }
            // done is arrow key up

            // is arrow key left
            if( event.keyCode === alienInvasion.config['keyCodes']['arrowLeft'] ){
                // debug info
                self.debug( 'keyboardArrowLeft' );
                // call global event
                jsProject.callEvent( 'keyboardArrowUp', 'left' );
            }
            // done is arrow key left
            
            // is arrow key right
            if( event.keyCode === alienInvasion.config['keyCodes']['arrowRight'] ){
                // debug info
                self.debug( 'keyboardArrowRight' );
                // call global event
                jsProject.callEvent( 'keyboardArrowUp', 'right' );
            }
            // done is arrow key right
            
            // is char
            if( alienInvasion.config['inputChars'][event.which] !== undefined ){
                // get char
                var char = alienInvasion.config['inputChars'][event.which];
                // debug info
                self.debug( char );
                // call global event
                jsProject.callEvent( 'keyboardInputCharUp', char );
            }
            // done is char
            
        // DONE FUNCTION: keyUp( event: event ) void
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
    // DONE MODULE: gameEventsModule( html element id: contentId, html element id: gameContentId ) void
})( alienInvasion );
// done create module function
