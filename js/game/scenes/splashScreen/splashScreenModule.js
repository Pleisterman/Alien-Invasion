/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\splashScreenModule.js
 * 
 *  Last Revision:  10-03-2018
 * 
 *  Purpose:  
 *      handles the scene: splashscreen
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: splashScreenModule( void ) void
    
    alienInvasion.splashScreenModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'splashScreenModule';                             // string
        self.debugOn = true;                                            // boolean
        self.game = null;                                               // Phaser.Game
        self.sceneId = 'splashScreen';                                  // string
        self.nextSceneId = 'gameMenu';                                  // string
        self.imageUrl = alienInvasion.config['imageUrl'];               // url
        self.splashScreenOptions = {                                    // json: splashscreenOptions    
            'assetId'           :   'splashScreen',                     // string
            'originalSize'      :   {
                'width'         :   0,
                'height'        :   0
            },
            'maximumWidth'      :   1800,                               // integer
            'padding'           :   40,                                 // integer
            'type'              :   'image',                            // string
            'fileName'          :   self.imageUrl + 'splashScreen.png', // string
            'phaserObject'      :   null                                // Phaser.Sprite
        };                                                              // done json: splashScreenOptions
        self.modules = [                                                // json: modules
            {                                                           // json: splashScreenAudioModule
                'id'            :   'splashScreenAudio',                  
                'MODULE'        :   alienInvasion.splashScreenAudioModule,
                'moduleObject'  :   null
            }                                                           // done json: splashScreenAudioModule
        ];                                                              // done json: modules
        self.started = null;                                            // datetime
        self.closing = false;
        self.closed = false;
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
            
            // subscribe to add scenes
            jsProject.subscribeToEvent( 'addScenes', self.addScene );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.addScene = function( game ){
        // FUNCTION: addScene( Phaser.game: game ) void
            
            // debug info
            self.debug( 'addScene' );
            
            // remember game
            self.game = game;

            // add scene to game
            self.game.state.add( self.sceneId, self );
            
            // loop over modules
            for( var i = 0; i < self.modules.length; i++ ){
                // create and add module
                self.modules[i]['moduleObject'] = new self.modules[i]['MODULE']( self.game );
            }
            // done loop over modules
            
        // DONE FUNCTION: addScene( Phaser.game: game ) void
        };
        self.preload = function(  ){
        // FUNCTION: preload( void ) void

            // ! show splash screen
            if( !alienInvasion.config['splashscreenShow'] ){
                // done 
                return;
            }
            // ! show splash screen
            
            // debug info
            self.debug( 'preload' );
            
            // load splash screen bitmap
            alienInvasion.loadAsset( self.splashScreenOptions ); 
            
            // loop over modules
            for( var i = 0; i < self.modules.length; i++ ){
                // call preload
                self.modules[i]['moduleObject'].preload();
            }
            // done loop over modules
            
        // DONE FUNCTION: preload( void ) void
        };
        self.create = function(  ){
        // FUNCTION: create( void ) void
            
            // debug info
            self.debug( 'create' );
            
            // ! show splash screen
            if( !alienInvasion.config['splashscreenShow'] ){
                // start next scene
                self.game.state.start( self.nextSceneId );
                // done 
                return;
            }
            // ! show splash screen
           
            // add splash screen sprite
            self.splashScreenOptions['phaserObject'] = self.game.add.sprite( 0, 0, self.splashScreenOptions['assetId'] );
            
            // set original width
            self.splashScreenOptions['originalSize']['width'] = self.splashScreenOptions['phaserObject'].width;
            // set original height
            self.splashScreenOptions['originalSize']['height'] = self.splashScreenOptions['phaserObject'].height;

            // set alpha
            self.splashScreenOptions['phaserObject'].alpha = 0;
            
            // show splash screen
            self.game.add.tween( self.splashScreenOptions['phaserObject'] ).to( { alpha: 1 }, 
                                 alienInvasion.config['splashscreenOpenTransitionPeriod'], 
                                 Phaser.Easing.Linear.In, 
                                 true );
            
            // loop over modules
            for( var i = 0; i < self.modules.length; i++ ){
                // call create
                self.modules[i]['moduleObject'].create();
            }
            // done loop over modules
            
            // remember started
            self.started = new Date();
            
            // adjust layout
            self.layoutChange( );
            
            // subscribe to game layoutChange
            jsProject.subscribeToEvent( 'gameLayoutChange', self.layoutChange );
            
        // DONE FUNCTION: create( void ) void
        };
        self.update = function(  ){
        // FUNCTION: update( void ) void

            // ! show splash screen
            if( !alienInvasion.config['splashscreenShow'] ){
                // done
                return;
            }
            // ! show splash screen
            
            // loop over modules
            for( var i = 0; i < self.modules.length; i++ ){
                // call update
                self.modules[i]['moduleObject'].update();
            }
            // done loop over modules
                          
            // get date
            var date = new Date();
             // calculate current delay
            var currentDelay = date - self.started;

            // ! closing
            if( !self.closing ){
                
                // delay > splashScreen delay
                if( currentDelay >= alienInvasion.config['splashscreenShowPeriod'] + 
                                    alienInvasion.config['splashscreenOpenTransitionPeriod'] ){

                    // set closing
                    self.closing = true;
                                
                    // hide splash screen
                    self.game.add.tween( self.splashScreenOptions['phaserObject'] ).to( { alpha: 0 }, 
                                         alienInvasion.config['splashscreenCloseTransitionPeriod'], 
                                         Phaser.Easing.Linear.In, 
                                         true );
                }
                // delay > splashScreen delay
            }
            // ! closing
            
            // closing
            if( self.closing && !self.closed ){

                // delay > splashScreen delay
                if( currentDelay >= alienInvasion.config['splashscreenShowPeriod'] + 
                                    alienInvasion.config['splashscreenOpenTransitionPeriod'] +
                                    alienInvasion.config['splashscreenCloseTransitionPeriod'] ){
                                
                        // set closed
                    self.closed = true;
                    // start next scene
                    self.game.state.start( self.nextSceneId );
                }
                // delay > splashScreen delay

            }
            // closing
            
        // DONE FUNCTION: update( void ) void
        };
        self.layoutChange = function( ) {
        // FUNCTION: layoutChange( void ) void
        
            // debug info
            self.debug( 'layoutChange ' + self.game.world.width + ',' +  self.game.world.height );
            
            // calculate maximum width
            var maximumWidth = self.splashScreenOptions['maximumWidth'] - ( 2 * self.splashScreenOptions['padding'] );
            // calculate maximum world width
            var maximumWorldWidth = self.game.world.width - ( 2 * self.splashScreenOptions['padding'] );
            // get width
            var width = Math.min( maximumWidth, maximumWorldWidth );
            // calculate ratio
            var ratio = self.splashScreenOptions['originalSize']['width'] / self.splashScreenOptions['originalSize']['height'];
            // calculate height
            var height = width / ratio;
            // calculate maximum world height
            var maximumWorldHeight = self.game.world.height - ( 2 * self.splashScreenOptions['padding'] );
            // heigth > world height
            if( height > maximumWorldHeight ){
                
                // set height
                height = maximumWorldHeight;
                // calculate ratio
                var ratio = self.splashScreenOptions['originalSize']['height'] / self.splashScreenOptions['originalSize']['width'];
                // calculate width
                var width = height / ratio;
            
            }
            // heigth > renderer height
            
            // calculate left
            var left = ( self.game.world.width - width ) / 2;
            // calculate top
            var top = ( self.game.world.height - height ) / 2;
                        
            // set width
            self.splashScreenOptions['phaserObject'].width = width;
            // set height
            self.splashScreenOptions['phaserObject'].height = height;
            // set left
            self.splashScreenOptions['phaserObject'].x = left;
            // set top
            self.splashScreenOptions['phaserObject'].y = top;
            
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.shutdown = function(  ){
        // FUNCTION: shutdown( void ) void
        
            // ! show splash screen
            if( !alienInvasion.config['splashscreenShow'] ){
                // done 
                return;
            }
            // ! show splash screen
            
            // debug info
            self.debug( 'shutdown' );
            
            // remove game layoutChange
            jsProject.unSubscribeFromEvent( 'gameLayoutChange', self.layoutChange );
            
             // destroy splash screen sprite
            alienInvasion.destroyAsset( self.splashScreenOptions ); 
            
           // loop over modules
            for( var i = 0; i < self.modules.length; i++ ){
                // call destruct
                self.modules[i]['moduleObject'].destruct();
            }
            // done loop over modules
            
            // phaser object exists
            if( self.splashScreenOptions['phaserObject'] ){
                // destroy phaserObject
                self.splashScreenOptions['phaserObject'].destroy();
                // unset phaserObject
                self.splashScreenOptions['phaserObject'] = null;
                
            }
            // phaser object exists
                
        // DONE FUNCTION: shutdown( void ) void
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
    // DONE MODULE: splashScreenModule( void ) void
})( alienInvasion );
// done create module function
