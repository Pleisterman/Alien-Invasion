/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\index\contentModule.js
 * 
 *  Last Revision:  02-03-2018
 * 
 *  Purpose:  
 *      creates main content
 *      creates game
*/

// create module function
( function( alienInvasion ){

    // MODULE: contentModule( void ) void
    
    alienInvasion.contentModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'contentModule';                                  // string
        self.debugOn = true;                                            // boolean
        self.imageUrl = alienInvasion.config['imageurl'];           // string
        self.contentOptions = {                                         // json: content Options
            'id'                            :   self.MODULE + 'Content', // string
            'element'                       :   'div',                  // string: 
            'backgroundColor'               :   'white',                // css
            'zIndex'                        :   1                       // string
        };                                                              // done json: content Options
       self.gameModule = null;                                         // module                                                              
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add html
            self.addHtml();

            // update layout
            self.layoutChange();

            // event subscription
            self.addEventSubscriptions();

            // create game
            self.game = new alienInvasion.gameModule( self.contentOptions['id'] );

        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // subscribe to layoutChange
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );

        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // add the content container
            $( '#layout' ).append( jsProject.jsonToElementHtml( self.contentOptions ) );

        // DONE FUNCTION: addHtml( void ) void
        };
        self.layoutChange = function(){
        // FUNCTION: layoutChange( void ) void

            // debug info
            self.debug( 'layoutChange  ' );

            // get width
            var width = $( window ).width();
            // get height
            var height = $( window ).height();

            // set content width
            $( '#' + self.contentOptions['id'] ).width( width );

            // set content height
            $( '#' + self.contentOptions['id'] ).height( height );
        
        // DONE FUNCTION: layoutChange( void ) void
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
    // DONE MODULE: contentModule( void ) void
})( alienInvasion );
// done create module function
