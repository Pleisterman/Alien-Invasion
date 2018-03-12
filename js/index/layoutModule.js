/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\index\layoutModule.js
 * 
 *  Last Revision:  28-02-2018
 * 
 *  Purpose:  
 *      creates layout layer
 *      adds document css
 *     
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: layoutModule( alienInvasion ) void
    
    alienInvasion.layoutModule = function( ) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                        // object
        self.MODULE = 'layoutModule';                           // string
        self.debugOn = true;                                    // boolean
        self.layoutOptions = {                                  // json: layoutOptions
            'id'                        :   'layout',           // string: html element id
            'element'                   :   'div',              // string: html element type 
            'position'                  :   'absolute',         // css style position
            'top'                       :   0,                  // px
            'left'                      :   0,                  // px
            'backgroundColor'           :   'white',            // css
            'zIndex'                    :   '1'                 // string
        };                                                      // done json: layoutOptions
        // DONE MEMBERS

        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // create html
            self.addHtml();

            // add window events 
            self.addWindowEvents();
            
            // event subscription
            self.addEventSubscriptions();

        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void

            // debug info
            self.debug( 'addEventSubscriptions' );

            // add scene change
            jsProject.subscribeToEvent( 'sceneChange', self.sceneChange );
            
        // DONE FUNCTION: start( void ) void
        };
        self.addWindowEvents = function(){

            // debug info
            self.debug( 'addWindowEvents' );

            // override window.onresize
            window.onresize = function( ) {
                // scene change
                self.sceneChange();
            };
            // done override window.onresize
        
            // override window.onresize
            $( window ).on( "orientationchange", function( event ) {
                // debug info
                self.debug( 'orientaitionChange' );
                // scene change
                self.sceneChange();
            });
            // done override window.onresize
        
            // override window.onresize
            window.onscroll = function( ) {
                // scene change
                self.sceneScroll();
            };
            // done override window.onresize
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );

            // add layout to document
            $( document.body ).append( jsProject.jsonToElementHtml( self.layoutOptions ) );


        // DONE FUNCTION: addHtml( void ) void
        };
        self.sceneChange = function() {
        // FUNCTION: sceneChange( void ) void
            
            // get width
            var width = $( window ).width();
            // get height
            var height = $( window ).height();
                
            // debug info
            self.debug( 'sceneChange width: ' + width + ' height: ' + height );
            
            // set width
            $( '#' + self.layoutOptions['id'] ).width( width );
            
            // set height
            $( '#' + self.layoutOptions['id'] ).height( height );
            
            // call the global event
            jsProject.callEvent( "layoutChange" );

        // DONE FUNCTION: sceneChange( void ) void
        };
        self.sceneScroll = function() {
        // FUNCTION: sceneScroll( void ) void
        
            // debug on
            if( self.debugOn ) {
                // debug info
                self.debug( 'sceneScroll' );
            }
            // done debug on
            
            // call the global event
            jsProject.callEvent( "sceneScroll" );
            
        // DONE FUNCTION: sceneScroll( void ) void
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
    // DONE MODULE: layoutModule( alienInvasion ) void
})( alienInvasion );
// done create module function
