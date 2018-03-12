/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\gameModule.js
 * 
 *  Last Revision:  08-03-2018
 * 
 *  Purpose:  
 *      creates the phaser game
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: gameModule( html element id: gameContentId ) void
    
    alienInvasion.gameModule = function( gameContentId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'gameModule';                                     // string
        self.debugOn = true;                                            // boolean
        self.gameContentId = gameContentId;                             // string
        self.game = null;                                               // Phaser.game
        self.players = null;                                            // module
        self.gameEvents = null;                                         // module
        self.audio = null;                                              // module
        self.assetsLoader = null;                                       // module
        self.commonAssets = null;                                       // module
        self.modules = [                                                // json: modules
            {                                                           // json: splashScreen
                'id'            :   'splashScreen',
                'MODULE'        :   alienInvasion.splashScreenModule,
                'moduleObject'  :   null
            },                                                           // done json: splashScreen
            {                                                           // json: menu
                'id'            :   'menu',
                'MODULE'        :   alienInvasion.gameMenuModule,
                'moduleObject'  :   null
            }                                                           // done json: menu
        ];                                                              // done json: modules
        self.visible = false;                                           // boolean: visible                                                            
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // create game events module
            self.gameEvents = new alienInvasion.gameEventsModule();

            // create game modules
            self.createGameModules();

            // create game
            self.createGame();

            // event subscription
            self.addEventSubscriptions();

        // DONE FUNCTION: construct( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // subscribe to layoutChange
            jsProject.subscribeToEvent( 'layoutChange', self.layoutChange );

        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.createGameModules = function() {
        // FUNCTION: createGameModules( void ) void

            // loop over modules
            for( var i = 0; i < self.modules.length; i++ ){
                // create and add module
                self.modules[i]['moduleObject'] = new self.modules[i]['MODULE']();
            }
            // done loop over modules

        // DONE FUNCTION: createGameModules( void ) void
        };
        self.createGame = function() {
        // FUNCTION: createGame( void ) void
            
            // create phaser game
            self.game = new Phaser.Game( $( '#' + self.gameContentId ).width(),
                                         $( '#' + self.gameContentId ).height(), 
                                         Phaser.AUTO, 
                                         self.gameContentId, 
                                         { 
                                             preload    : self.preload, 
                                             create     : self.create,
                                             update     : self.update   
                                         });
                                         
                                         
            // create audio module
            self.audio = new alienInvasion.audioModule( self.game );

            // create assets loader module
            self.assetsLoader = new alienInvasion.assetsLoaderModule( self.game );
            // create common assets module
            self.commonAssets = new alienInvasion.commonAssetsModule( self.game );

        // DONE FUNCTION: createGame( void ) void
        };
        self.preload = function(  ){
        // FUNCTION: preload( void ) void
            
            // debug info
            self.debug( 'preload' );
            
            // preload common assets
            self.commonAssets.preload();            
            
        // DONE FUNCTION: preload( void ) void
        };
        self.create = function(  ){
        // FUNCTION: create( void ) void
            
            // debug info
            self.debug( 'create' );
            
            // set visibility
            self.visible = true;

            // add states
            jsProject.callEvent( 'addGameStates', self.game );
            // start the splash screen
            self.game.state.start( 'splashScreen' );
            
            
        // DONE FUNCTION: create( void ) void
        };
        self.layoutChange = function(  ){
        // FUNCTION: layoutChange( void ) void
            
            // debug info
            self.debug( 'layoutChange' );
            
            // visible
            if( self.visible ){
                
                // set game size
                self.game.scale.setGameSize( $( '#' + self.gameContentId ).width(), $( '#' + self.gameContentId ).height() );
                
                // call game layoutChange
                jsProject.callEvent( 'gameLayoutChange' );
            }
            // done visible            
            
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
    // DONE MODULE: gameModule( html element id: gameContentId ) void
})( alienInvasion );
// done create module function
