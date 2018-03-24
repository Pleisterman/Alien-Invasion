/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\gameMenu\audioModule.js
 * 
 *  Last Revision:  09-03-2018
 *  
 *  Purpose:  
 *      loads and plays audio
 * 
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: audioModule( Phaser.game: game ) void
    
    alienInvasion.audioModule = function( game ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                        // object
        self.MODULE = 'audioModule';                            // string
        self.debugOn = true;                                    // boolean
        self.game = game;                                       // Phaser.game
        self.audio = {};                                        // json
        self.currentMusic = null;                               // p
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // check audioSupport
            self.checkAudioSupport();
            
            // event subscription
            self.addEventSubscriptions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.checkAudioSupport = function(){
        // FUNCTION: checkAudioSupport( void ) void

            // AudioContext and webkitAudioContext ! exists
            if ( typeof AudioContext === 'undefined' &&
                 typeof webkitAudioContext === 'undefined'   ){
               
                // set global value
                jsProject.setValue( 'supported', 'audio', false );
                // debug info
                self.debug( 'Audio not supported' );
            }
            else {
                // set global value
                jsProject.setValue( 'supported', 'audio', true );
                // debug info
                self.debug( 'Audio supported' );
            }
            // done AudioContext and webkitAudioContext ! exists
        
        // DONE FUNCTION: checkAudioSupport( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // audio ! supported
            if( !jsProject.getValue( 'supported', 'audio' ) ){
                // done 
                return;
            }
            // audio ! supported
            
            // subscribe to loadAudio
            jsProject.subscribeToEvent( 'preloadAudio', self.preloadAudio );
            
            // subscribe to createAudio
            jsProject.subscribeToEvent( 'createAudio', self.createAudio );
            
            // subscribe to playMusic
            jsProject.subscribeToEvent( 'playMusic', self.playMusic );

            // subscribe to playAudioEffect
            jsProject.subscribeToEvent( 'playAudioEffect', self.playAudioEffect );

            // subscribe to musicVolumeChanged
            jsProject.subscribeToEvent( 'musicVolumeChanged', self.musicVolumeChanged );

            // subscribe to freeAudio
            jsProject.subscribeToEvent( 'freeAudio', self.freeAudio );

        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.preloadAudio = function( options ){
        // FUNCTION: preloadAudio( json: options ) void
            
            // debug info
            self.debug( 'loadAudio id: ' + options['id'] );
            
            // id exists
            if( self.audio[options['id']] ){
                // debug
                self.debug( 'load audio id exists:' + options['id'] );
                // done
                return;
            }
            // id exists
            
            // add audio id
            self.audio[options['id']] = true;
            
            // load audio
            self.game.load.audio( options['id'], options['fileNames'] );

        // DONE FUNCTION: preloadAudio( json: options ) void
        };
        self.createAudio = function( options ){
        // FUNCTION: createAudio( json: options ) void

            // id exists
            if( !self.audio[options['id']] ){
                // debug
                self.debug( 'load audio not loaded id:' + options['id'] );
                // done with error
                return;
            }
            // id exists
            
            // add audio
            options['phaserObject'] = self.game.add.audio( options['id'] );

        // DONE FUNCTION: createAudio( json: options ) void
        };
        self.playMusic = function( options ){
        // FUNCTION: playMusic( json: options ) void
            
            // !audio is on
            if( !jsProject.getValue( 'on', 'audio' ) || !jsProject.getValue( 'on', 'music' ) ){
                // done 
                return;
            }
            // audio !sound is on
            
            // ! audio found
            if( !self.audio[options['id']] ){
                // debug info
                self.debug( 'Audio not found id: ' + options['id'] );
                // done with error
                return;
            }
            // done ! audio found

            // play audio object
            options['phaserObject'].volume = ( jsProject.getValue( 'volume', 'music' ) / 100 ) * options['volumePercentage'];
            // debug info
            self.debug( 'playMusic volume: ' + ( jsProject.getValue( 'volume', 'music' ) / 100 ) * options['volumePercentage'] );
            
            // play audio object
            options['phaserObject'].play();
            // set current music
            self.currentMusic = options;
            
        // DONE FUNCTION: playMusic( json: options ) void
        };
        self.musicVolumeChanged = function( ){
        // FUNCTION: musicVolumeChanged( void ) void
             
             // current music exists
             if( self.currentMusic ){
                 // set volume
                 self.currentMusic['phaserObject'].volume = ( jsProject.getValue( 'volume', 'music' ) / 100 ) * self.currentMusic['volumePercentage'];
             }
             // current music exists
             
        // DONE FUNCTION: musicVolumeChanged( void ) void
        };
        self.playAudioEffect = function( options ){
        // FUNCTION: playAudioEffect( json: options ) void
            
            // !audio is on
            if( !jsProject.getValue( 'on', 'audio' ) || !jsProject.getValue( 'on', 'audioEffects' ) ){
                // done 
                return;
            }
            // done !audio is on
            
            // ! audio found
            if( !self.audio[options['id']] ){
                // debug info
                self.debug( 'Audio not found id: ' + options['id'] );
                // done with error
                return;
            }
            // done ! audio found

            // play audio object
            options['phaserObject'].volume = ( jsProject.getValue( 'volume', 'audioEffects' ) / 100 ) * options['volumePercentage'];
            // play audio object
            options['phaserObject'].play();
            
        // DONE FUNCTION: playAudioEffect( json: options ) void
        };
        self.freeAudio = function( options ){
        // FUNCTION: freeAudio( void ) void
            
            // debug info
            self.debug( 'freeAudio id: ' + options['id'] );
            // remove sound from cache
            self.game.cache.removeSound( options['id'] );
            // remove from audio
            self.audio[options['id']] = false;
            
        // DONE FUNCTION: freeAudio( void ) void
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
    // DONE MODULE: audioModule( Phaser.game: game ) void
})( alienInvasion );
// done create module function
