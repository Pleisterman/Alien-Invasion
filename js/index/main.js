/* 
 *  Package: alienInvasion 
 * 
 *  File: \js\index\main.js
 * 
 *  Last Revision:  08-03-2018
 * 
 *  Purpose:  
 *      his is the main module of the application
 * 
*/

// create module function
( function() {

    // MODULE: alienInvasion( void ) void
    
    // add the alienInvasion object to the window
    window.alienInvasion = new function(){};

    // PRIVATE:
    // MEMBERS:
    var self = window.alienInvasion;                            // object: self
    self.MODULE = 'alienInvasion';                              // string: module
    // DONE MEMBERS

    // FUNCTIONS
    self.start = function() {
    // FUNCTION: start( void ) void
        
        // create the jsProject module
        jsProject.construct();
        // add debug functions
        jsProject.debugOn( alienInvasion.debug['on'], alienInvasion.debug );
        
        // all is well
        jsProject.debug( self.MODULE + ' ' + 'don\'t panic' );
        
    // DONE FUNCTION: start( void ) void
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
 
