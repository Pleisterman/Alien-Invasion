/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\gameMenu\splashScreenAudioModule.js
 * 
 *  Last Revision:  10-03-2018
 *  
 *  Purpose:  
 *      creates the audio for the game state splashScreen
 * 
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: splashScreenAudioModule( Phaser.Game ) void
    
    alienInvasion.splashScreenAudioModule = function( game ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'splashScreenAudioModule';                        // string
        self.debugOn = true;                                            // boolean
        self.game = game;                                               // Phaser.Game
        self.audioUrl = alienInvasion.config['audioUrl'];               // string
        self.music = [                                                  // json: music
            {                                                           
                'id' :                  'splashScreenBackground01',
                'fileNames'     :   [
                                        self.audioUrl + 'background01.ogg',
                                        self.audioUrl + 'background01.mp3'
                ],
                'volumePercentage' :    80,
                'phaserObject' :        null     
            },                                                          
            {                                                           
                'id' :                  'splashScreenBackground02',
                'fileNames'     :   [
                                        self.audioUrl + 'background02.ogg',
                                        self.audioUrl + 'background02.mp3'
                ],
                'volumePercentage' :    40,
                'phaserObject' :        null     
            }                                                           
        ];                                                              // done json: music    
        self.currentMusic = null;
        
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
           
        // DONE FUNCTION: construct( void ) void
        };
        self.preload = function() {
        // FUNCTION: preload( void ) void

            // create random selection
            var randomSelection = parseInt( Math.random() * self.music.length );
            // select random music
            self.currentMusic = self.music[randomSelection];
            
            // preload audio
            jsProject.callEvent( 'preloadAudio', self.currentMusic );

        // DONE FUNCTION: preload( void ) void
        };
        self.create = function(  ){
        // FUNCTION: create( void ) void
            
            // debug info
            self.debug( 'create' );

            // add background audio
            jsProject.callEvent( 'createAudio', self.currentMusic );
            
            // debug info
            self.debug( 'play music: ' + self.currentMusic['id'] );
            
            // remove on complete
            self.currentMusic['phaserObject'].onStop.add( self.musicStopped, self );

            // play random music
            jsProject.callEvent( 'playMusic', self.currentMusic );
            
        // DONE FUNCTION: create( void ) void
        };
        self.musicStopped = function(  ){
        // FUNCTION: musicStopped( void ) void

            // debug info
            self.debug( 'musicStopped' );

            // play music
            jsProject.callEvent( 'playMusic', self.currentMusic );

        // DONE FUNCTION: musicStopped( void ) void
        };
        self.update = function(  ){
        // FUNCTION: update( void ) void

        // DONE FUNCTION: update( void ) void
        };
        self.destruct = function(  ){
        // FUNCTION: destruct( void ) void
            
            // music is playing
            if( self.currentMusic && self.currentMusic['phaserObject'] ){
                // stop random music
                self.currentMusic['phaserObject'].stop();
            }
            // music is playing

            // remove audio
            jsProject.callEvent( 'freeAudio', self.currentMusic );
                
            // phaser object exists
            if( self.currentMusic['phaserObject'] ){

                // destroy phaser Object
                self.currentMusic['phaserObject'].destroy();
                // reset phaser Object
                self.currentMusic['phaserObject'] = null;
                // unset current music
                self.currentMusic = null;
            }          
            // phaser object exists
                        
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
    // DONE MODULE: splashScreenAudioModule( Phaser.Game ) void
})( alienInvasion );
// done create module function
