/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\index\headerModule.js
 * 
 *  Last Revision:  02-03-2018
 * 
 *  Purpose:  
 *      creates main header
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: headerModule( void ) void
    
    alienInvasion.headerModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'headerModule';                                   // string
        self.debugOn = false;                                           // boolean
        self.imageUrl = alienInvasion.config['imageurl'];           // string
        self.headerContainerOptions = {                                 // json: headerOptions
            'id'                    :   'headerContainer',              // string
            'element'               :   'div',                          // string
            'display'               :   'none',                         // css
            'styleHeight'           :   '100px',                        // integer
            'styleWidth'            :   '100%',                         // css
            'minimumWidth'          :   '1020px',                       // css
            'backgroundColor'       :   'transparent',                  // css
            'position'              :   'fixed',                        // css
            'top'                   :   '0px',                          // css
            'zIndex'                :   '1000'                          // string
        };                                                              // done json: headerOptions        
        self.headerOptions = {                                          // json: headerOptions
            'id'                    :   'header',                       // string
            'element'               :   'div',                          // string
            'margin'                :   '0 auto',                       // css
            'styleHeight'           :   '100px',                        // integer
            'maximumWidth'          :   '1020px',                       // css
            'backgroundColor'       :   'transparentS',                 // css
        };                                                              // done json: headerOptions        
        self.logoOptions = {                                            // json: title Options
            'id'                            :   self.headerOptions['id'] + 'Logo', // string
            'element'                       :   'a',                    // string
            'display'                       :   'inline-block',         // css
            'verticalAlign'                 :   'top',                  // css
            'text'                          :   '&nbsp;',               // string
            'color'                         :   'transparent',          // css
            'marginTop'                     :   '14px',                 // css
            'marginLeft'                    :   '42px',                 // css
            'styleWidth'                    :   '200px',                // width
            'styleHeight'                   :   '60px',                 // height
            'backgroundSize'                :   '200px 60px',           // css
            'backgroundPosition'            :   'center top',           // css
            'backgroundRepeat'              :   'no-repeat',            // css
        };                                                              // done json: title Options
        self.titleOptions = {                                           // json: title Options
            'id'                            :   self.headerOptions['id'] + 'Title', // string
            'element'                       :   'a',                    // string
            'display'                       :   'inline-block',         // css
            'target'                        :   '_self',                // string
            'defaultHref'                   :   'index.php',            // string
            'fontSize'                      :   '2.0em',                // css
            'padding'                       :   '8px',                  // css
            'marginTop'                     :   '38px',                 // css 
            'marginLeft'                    :   '42px',                 // css
            'color'                         :   'transparent',          // css
        };                                                              // done json: title Options
        self.languageSelection = null;                                  // module: languageSelection
         // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add header container to layout
            // $( '#layout' ).append( jsProject.jsonToElementHtml( self.headerContainerOptions ) );
            // add header to header container
            // $( '#' +  self.headerContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.headerOptions ) );
            // add logo
            //self.addLogo();
            // add title
            //self.addTitle();
            // add language selection
            //self.languageSelection = new alienInvasion.languageSelectionModule( self.headerOptions['id'] );

        // DONE FUNCTION: construct( void ) void
        };
        self.addLogo = function() {
        // FUNCTION: addLogo( void ) void
        
            // language not empty
            if( alienInvasion.language !== alienInvasion.defaultLanguage ){
                // add language to href
                self.logoOptions['href'] += '/' + alienInvasion.language + '/';
            }
            // done language not empty
        
            // add logo to header
            $( '#' + self.headerOptions['id'] ).append( jsProject.jsonToElementHtml( self.logoOptions ) );

        // DONE FUNCTION: addLogo( void ) void
        };
        self.addTitle = function() {
        // FUNCTION: addTitle( void ) void
                

            self.titleOptions['href'] = self.titleOptions['defaultHref'];
            // language not default language
            if( alienInvasion.language !== alienInvasion.defaultLanguage ){
                // add language to reference
                self.titleOptions['href'] += '?language=' + alienInvasion.language;
            }
            // done language not default language
            
            // add logo to header
            $( '#' + self.headerOptions['id'] ).append( jsProject.jsonToElementHtml( self.titleOptions ) );

        // DONE FUNCTION: addTitle( void ) void
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
    // DONE MODULE: headerModule( void ) void
})( alienInvasion );
// done create module function
