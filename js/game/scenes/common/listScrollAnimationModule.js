/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\common\listScrollAnimationModule.js
 * 
 *  Last Revision:  20-03-2018
 * 
 *  Purpose:  
 *      handles the scroll animation for lists
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: listScrollAnimationModule( json: listOptions ) void
    
    alienInvasion.listScrollAnimationModule = function( listOptions ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'listScrollAnimationModule';                      // string
        self.debugOn = false;                                           // boolean
        self.listOptions = listOptions;                                 // json
        self.animationOptions = {                                       // json: animationOptions
            'started'               :   false,                          // boolean
            'startDelay'            :   1500,                           // integer: milisec
            'speed'                 :   alienInvasion.config['listScrollAnimationSpeed'], // float
            'lastAnimationDate'     :   null                            // date
        };                                                              // done json: animationOptions
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // event subscription
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // subscribe to mouseWheel
            jsProject.subscribeToEvent( 'mouseWheel', self.mouseWheel );
            
            // subscribe to keyboardArrow
            jsProject.subscribeToEvent( 'keyboardArrow', self.keyboardArrow );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.removeEventSubscriptions = function(){
        // FUNCTION: removeEventSubscriptions( void ) void
            
            // remove mouseWheel
            jsProject.unSubscribeFromEvent( 'mouseWheel', self.mouseWheel );
            
            // remove keyboardArrow
            jsProject.unSubscribeFromEvent( 'keyboardArrow', self.keyboardArrow );
            
        // DONE FUNCTION: removeEventSubscriptions( void ) void
        };
        self.mouseWheel = function( delta ){
        // FUNCTION: mouseWheel( delta: delta ) void
            
            // !mouse is over
            if( !self.listOptions['mouseOver'] ){
                // done 
                return;
            }
            // done !mouse is over

            // delta > 0    
            if( delta > 0 )
            {
                // content group y >= 0
                if( self.listOptions['contentGroup'].y >= 0 ){
                    // done top reached
                    return;
                }
                // done content group y >= 0

                // unset last animation date
                self.animationOptions['lastAnimationDate'] = null;
                // scroll down
                self.listOptions['contentGroup'].y += alienInvasion.config['verticalScrollDistance'];
            }
            else
            {
                // content group y < groupheigt + margins
                if( self.listOptions['contentGroup'].y <= -self.listOptions['contentGroup'].height + ( self.listOptions['marginBottom'] + self.listOptions['marginTop'] ) ){
                    // done bottom reached
                    return;
                }
                // content group y < groupheigt + margins
                
                // unset last animation date
                self.animationOptions['lastAnimationDate'] = null;
                // scroll up
                self.listOptions['contentGroup'].y -= alienInvasion.config['verticalScrollDistance'];
            }
            // done delta > 0    
                        
        // DONE FUNCTION: mouseWheel( delta: delta ) void
        };
        self.update = function(  ){
        // FUNCTION: update( void ) void

            // update list animation
            self.listAnimationUpdate();

            // pointer over button
            if( self.listOptions['group'].mask.input.pointerOver() ){
                // remember mouse over
                self.listOptions['mouseOver'] = true;
            }
            else {
                // reset mouse over
                self.listOptions['mouseOver'] = false;
            }
            // done pointer over button
             
        // DONE FUNCTION: update( void ) void
        };
        self.listAnimationUpdate = function( ) {
        // FUNCTION: listAnimationUpdate( void ) void
             
            // ! last animation date
            if( !self.animationOptions['lastAnimationDate'] ){
                // initialize last animation date
                self.animationOptions['lastAnimationDate'] = new Date();
                // done 
                return;
            }
            // done ! last animation date
            
            // create date
            var date = new Date();
            // calculate current delay
            var currentDelay = date - self.animationOptions['lastAnimationDate']; 
            // currentDelay < delay
            if( currentDelay < self.animationOptions['startDelay'] ){
                // done delay longer
                return;
            }
            // done currentDelay < delay
            
            // add speed to content group top
            self.listOptions['contentGroup'].y += self.animationOptions['speed'];
            
            // top > hcontentgroup height
            if( -self.listOptions['contentGroup'].y > self.listOptions['contentGroup'].height ){
                // unset last animation date
                self.animationOptions['lastAnimationDate'] = null;
                // set contentgroup top
                self.listOptions['contentGroup'].y = self.listOptions['background'].height;
            }
            // done top > hcontentgroup height
            
        // DONE FUNCTION: listAnimationUpdate( void ) void
        };
        self.keyboardArrow = function( direction ){
        // FUNCTION: keyboardArrow( string: direction ) void

            // direction is up
            if( direction === 'up' ){
                
                // content group y >= 0
                if( self.listOptions['contentGroup'].y >= 0 ){
                    // done top reached
                    return;
                }
                // done content group y >= 0

                // scroll down
                self.listOptions['contentGroup'].y += alienInvasion.settings['verticalScrollDistance'];
            }
            // done direction is up
        
            // direction is down
            if( direction === 'down' ){

                // content group y < groupheigt + margins
                if( self.listOptions['contentGroup'].y <= - self.listOptions['contentGroup'].height + self.listOptions['marginBottom'] ){
                    // done bottom reached
                    return;
                }
                // content group y < groupheigt + margins
                
                // scroll up
                self.listOptions['contentGroup'].y -= alienInvasion.settings['verticalScrollDistance'];
                
            }
            // done direction is down
        
        // DONE FUNCTION: keyboardArrow( string: direction ) void
        };
        self.destruct = function(  ){
        // FUNCTION: destruct( void ) void
                    
            // remove event subscriptions
            self.removeEventSubscriptions();
            
            // unset listOptions
            self.listOptions = null;
              
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
            // function update( void ) void
            update: function(  ){
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
    // DONE MODULE: listScrollAnimationModule( json: listOptions ) void
})( alienInvasion );
// done create module function
