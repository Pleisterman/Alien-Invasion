/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\index\main.js
 * 
 *  Last Revision:  08-03-2018
 * 
 *  Purpose:  
 *      this is the main module of the application
 * 
*/

// create module function
( function() {

    // MODULE: alienInvasion( void ) void
    
    // add the alienInvasion object to the window
    window.alienInvasion = new function(){};

    // PRIVATE:
    // MEMBERS:
    var self = window.alienInvasion;                        // object
    self.MODULE = 'alienInvasion';                          // string
    self.modules = {                                        // json: modules
        'values'                : null,                     // module
        'layout'                : null,                     // module
        'header'                : null,                     // module
        'content'               : null                      // module
    };                                                      // done json: modules
    // DONE MEMBERS

    // FUNCTIONS
    self.start = function() {
    // FUNCTION: start( void ) void
        
        // create the jsProject module
        jsProject.construct();
        // add debug functions
        jsProject.debugOn( alienInvasion.debug['on'], alienInvasion.debug );
        
        // add values module
        self.modules['values'] = new alienInvasion.valuesModule( );
        
        // add content
        self.addContent();

        // update the layout
        jsProject.callEvent( 'sceneChange' );
        
        // all is well
        jsProject.debug( self.MODULE + ' ' + 'don\'t panic' );
        
    // DONE FUNCTION: start( void ) void
    };
    self.addContent = function(){
    // FUNCTION: addContent( void ) void
    
        // add layout module
        self.modules['layout'] = new alienInvasion.layoutModule();
        // add header module
        self.modules['header'] = new alienInvasion.headerModule();
        // add content module
        self.modules['content'] = new alienInvasion.contentModule();

    // DONE FUNCTION: addContent( void ) void
    };
    // DONE PRIVATE

    // PUBLIC
    return {
        start : function(){
            // FUNCTION: start( void ) void 
            self.start();
        }
    };
    // DONE PUBLIC
    // DONE MODULE: alienInvasion( void ) void
})();
// done create module function
 
