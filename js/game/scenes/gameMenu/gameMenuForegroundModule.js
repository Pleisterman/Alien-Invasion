/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\gameMenu\gameMenuForegroundModule.js
 * 
 *  Last Revision:  08-03-2018
 *  
 *  Purpose:  
 *      draws the background for the game state gameMenu
 * 
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: gameMenuForegroundModule( Phaser.Game, module: audio ) void
    
    alienInvasion.gameMenuForegroundModule = function( game, audio ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'gameMenuForegroundModule';                       // string
        self.debugOn = false;                                           // boolean
        self.imageUrl = alienInvasion.config['imageUrl'];               // string
        self.game = game;                                               // Phaser.Game
        self.audio = audio;                                             // module
        self.sprites = [                                                // json: sprites
            {                                                           // json: topBarOptions                
                'assetId'           :   'topBar',                       // string
                'type'              :   'image',                        // string
                'height'            :   90,                             // integer
                'fileName'          :   self.imageUrl + 'gameMenuTopBar.png', // string
                'phaserObject'      :   null                            // Phaser:sprite
            },                                                          // done json: topBarOptions
            {                                                           // json: leftSideBarOptions
                'assetId'           :   'leftSideBar',                  // string
                'type'              :   'image',                        // string
                'width'             :   40,                            // integer
                'fileName'          :   self.imageUrl + 'gameLeftBar.png', // string
                'phaserObject'      :   null                            // Phaser:sprite
            },                                                          // done json: leftSideBarOptions
            {                                                           // json: rightSideBarOptions
                'assetId'           :   'rightSideBar',                 // string
                'type'              :   'image',                        // string
                'width'             :   40,                            // integer
                'fileName'          :   self.imageUrl + 'gameRightBar.png', // string
                'phaserObject'      :   null                            // Phaser:sprite
            },                                                          // done json: rightSideBarOptions
            {                                                           // json: bottomBarOptions
                'assetId'           :   'bottomBar',                    // string
                'type'              :   'image',                        // string
                'height'            :   52,                             // integer
                'fileName'          :   self.imageUrl + 'gameBottomBar.png', // string
                'phaserObject'      :   null                            // Phaser:sprite
            }                                                           // done json: bottomBarOptions
        ];                                                              // done json: sprites
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
            
            // subscribe to game layoutChange
            jsProject.subscribeToEvent( 'gameLayoutChange', self.layoutChange );

        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.removeEventSubscriptions = function(){
        // FUNCTION: removeEventSubscriptions( void ) void
            
            // remove game layoutChange
            jsProject.unSubscribeFromEvent( 'gameLayoutChange', self.layoutChange );
            
        // DONE FUNCTION: removeEventSubscriptions( void ) void
        };
        self.preload = function() {
        // FUNCTION: preload( void ) void

            // loop over sprites
            for( var i = 0; i < self.sprites.length; i++ ){
                // load sprite image
                alienInvasion.loadAsset( self.sprites[i] ); 
            }
            // done loop over sprites

        // DONE FUNCTION: preload( void ) void
        };
        self.create = function(  ){
        // FUNCTION: create( void ) void
            
            // debug info
            self.debug( 'create' );

            // loop over sprites
            for( var i = 0; i < self.sprites.length; i++ ){
                // create sprite
                self.sprites[i]['phaserObject'] = self.game.add.sprite( 0, 0,  self.sprites[i]['assetId'] ); 
                // set alpha
                self.sprites[i]['phaserObject'].alpha = 0;
                // add tween
                self.game.add.tween( self.sprites[i]['phaserObject'] ).to( { alpha: 1 }, 
                                     alienInvasion.config['sceneShowTransitionPeriod'], 
                                     Phaser.Easing.Linear.In, 
                                     true );
            }
            // done loop over sprites
            
            // adjust layout
            self.layoutChange();
            
            // event subscription
            self.addEventSubscriptions();

        // DONE FUNCTION: create( void ) void
        };
        self.update = function(  ){
        // FUNCTION: update( void ) void

             
        // DONE FUNCTION: update( void ) void
        };
        self.layoutChange = function( ) {
        // FUNCTION: layoutChange( void ) void

            // create vars
            var width = 0, top = 0, left = 0;
            
            // get json object
            var leftSideBar = jsProject.getJsonValue( self.sprites, ['assetId=leftSideBar'] );     
            // set left bar width
            leftSideBar['phaserObject'].width = leftSideBar['width'];
            // set left bar height
            leftSideBar['phaserObject'].height = self.game.world.height;
            
            // get json object
            var rightSideBar = jsProject.getJsonValue( self.sprites, ['assetId=rightSideBar'] );     
            // set right bar width
            rightSideBar['phaserObject'].width = rightSideBar['width'];
            // set left bar height
            rightSideBar['phaserObject'].height = self.game.world.height;
            
            // calculate right side bar left
            left = self.game.world.width;
            // subtract right side bar width
            left -= rightSideBar['width'];
            // set right bar left
            rightSideBar['phaserObject'].x = left;

            // calculate width
            var width = self.game.world.width;
            // subtract left side bar
            width -= leftSideBar['width'];
            // subtract right side bar
            width -= rightSideBar['width'];
            
            // get json object
            var topBar = jsProject.getJsonValue( self.sprites, ['assetId=topBar'] );     
            // set top bar width
            topBar['phaserObject'].width = width;
            // set top bar height
            topBar['phaserObject'].height = topBar['height'];
            // set top bar left
            topBar['phaserObject'].x = leftSideBar['width'];

            // get json object
            var bottomBar = jsProject.getJsonValue( self.sprites, ['assetId=bottomBar'] );     
            // calculate bottom bar top
            top = self.game.world.height;
            // subtract left side bar
            top -= bottomBar['height'];
            
            // set bottom bar width
            bottomBar['phaserObject'].width = width;
            // set bottom bar height
            bottomBar['phaserObject'].height = bottomBar['height'];
            // set bottom bar left
            bottomBar['phaserObject'].x = leftSideBar['width'];
            // set bottom bar top
            bottomBar['phaserObject'].y = top;
                                      
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.destruct = function(  ){
        // FUNCTION: destruct( void ) void

            // debug info
            self.debug( 'destruct' );
            
            // remove event subscriptions
            self.removeEventSubscriptions();
            
            // loop over sprites
            for( var i = 0; i < self.sprites.length; i++ ){
                // destroy sprite image
                alienInvasion.destroyAsset( self.sprites[i] ); 
                // unset phaserobject
                self.sprites[i]['phaserObject'] = null;
            }
            // done loop over sprites
            
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
    // DONE MODULE: gameMenuForegroundModule( Phaser.Game, module: audio ) void
})( alienInvasion );
// done create module function
