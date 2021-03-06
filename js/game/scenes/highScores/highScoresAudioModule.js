/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\about\highScoresAudioModule.js
 * 
 *  Last Revision:  19-03-2018
 *  
 *  Purpose:  
 *      handles the audio for the game state highScores
 * 
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: highScoresAudioModule( Phaser.Game ) void
    
    alienInvasion.highScoresAudioModule = function( game ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'highScoresAudioModule';                          // string
        self.debugOn = true;                                            // boolean
        self.game = game;                                               // Phaser.Game
        self.audioUrl = alienInvasion.config['audioUrl'];               // string
        self.music = [                                                  // json: music
            {                                                           
                'id' :                  'mainBackground01',
                'fileNames'     :   [
                                        self.audioUrl + 'background01.ogg',
                                        self.audioUrl + 'background01.mp3'
                ],
                'volumePercentage' :    5,
                'phaserObject' :        null     
            },                                                          
            {                                                           
                'id' :                  'mainBackground02',
                'fileNames'     :   [
                                        self.audioUrl + 'background02.ogg',
                                        self.audioUrl + 'background02.mp3'
                ],
                'volumePercentage' :    5,
                'phaserObject' :        null     
            },                                                          
            {                                                           
                'id' :                  'mainBackground03',
                'fileNames'     :   [
                                        self.audioUrl + 'background03.ogg',
                                        self.audioUrl + 'background03.mp3'
                ],
                'volumePercentage' :    5,
                'phaserObject' :        null     
            }                                                           
        ];                                                              // done json: music    
        self.effects = [                                                // json: effects
            {                                                           
                'id' :                  'gameButtonOver',
                'fileNames'     :   [
                                        self.audioUrl + 'gameButtonOver.ogg',
                                        self.audioUrl + 'gameButtonOver.mp3'
                ],
                'volumePercentage' :    10,
                'phaserObject' :        null     
            },    
            {                                                           
                'id' :                  'gameButtonSelect',
                'fileNames'     :   [
                                        self.audioUrl + 'menuButtonOver.ogg',
                                        self.audioUrl + 'menuButtonOver.mp3'
                ],
                'volumePercentage' :    20,
                'phaserObject' :        null     
            }
        ];                                                              // done json: effects    
        self.currentMusic = null;
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
            
            // subscribe to audioChanged
            jsProject.subscribeToEvent( 'audioChanged', self.audioChanged );

        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.removeEventSubscriptions = function(){
        // FUNCTION: removeEventSubscriptions( void ) void
            
            // remove game audioChanged
            jsProject.unSubscribeFromEvent( 'audioChanged', self.audioChanged );
            
        // DONE FUNCTION: removeEventSubscriptions( void ) void
        };
        self.preload = function() {
        // FUNCTION: preload( void ) void

            // loop over music
            for( var i = 0; i < self.music.length; i++ ){
                
                // preload audio
                jsProject.callEvent( 'preloadAudio', self.music[i] );
                
            }
            // done loop over music
            
            // loop over effects
            for( var i = 0; i < self.effects.length; i++ ){
                
                // preload effects
                jsProject.callEvent( 'preloadAudio', self.effects[i] );
                
            }
            // done loop over effects
            
        // DONE FUNCTION: preload( void ) void
        };
        self.create = function(  ){
        // FUNCTION: create( void ) void
            
            // debug info
            self.debug( 'create' );

            // loop over music
            for( var i = 0; i < self.music.length; i++ ){
                
                // add background audio
                jsProject.callEvent( 'createAudio', self.music[i] );
                
            }
            // done loop over music
            
            // create random selection
            var randomSelection = parseInt( Math.random() * self.music.length );
            // select random music
            self.currentMusic = self.music[randomSelection];
            // debug info
            self.debug( 'play music: ' + self.music[randomSelection]['id'] );
            
            // add on complete
            self.currentMusic['phaserObject'].onStop.add( self.musicStopped, self );
            
            // play random music
            jsProject.callEvent( 'playMusic', self.currentMusic );
            
            // loop over effects
            for( var i = 0; i < self.effects.length; i++ ){
                
                // preload effects
                jsProject.callEvent( 'createAudio', self.effects[i] );
                
            }
            // done loop over effects
            
            // add event subscriptions
            self.addEventSubscriptions();
            
        // DONE FUNCTION: create( void ) void
        };
        self.musicStopped = function(  ){
        // FUNCTION: musicStopped( void ) void
            
            // debug info
            self.debug( 'musicStopped' );
            
            // music is playing
            if( self.currentMusic && self.currentMusic['phaserObject'] ){
                // remove on complete
                self.currentMusic['phaserObject'].onStop.remove( self.musicStopped, self );
                // unset current music
                self.currentMusic = null;
            }
            // music is playing
            
            // create random selection
            var randomSelection = parseInt( Math.random() * self.music.length );
            // select random music
            self.currentMusic = self.music[randomSelection];
            // debug info
            self.debug( 'play music: ' + self.music[randomSelection]['id'] );

            // add on complete
            self.currentMusic['phaserObject'].onStop.add( self.musicStopped, self );
            
            // play random music
            jsProject.callEvent( 'playMusic', self.currentMusic );
           
        // DONE FUNCTION: musicStopped( void ) void
        };
        self.playEffect = function( effectId ) {
        // FUNCTION: playEffect( string: effectId ) void

            // get effect
            var effect = jsProject.getJsonValue( self.effects, ['id=' + effectId] );     
            
            // effect found / else
            if( effect ){
                
                // play effect
                jsProject.callEvent( 'playAudioEffect', effect );
                
            }
            else {
                
                // debug
                self.debug( 'mainAudio effect not found: ' + effectId );
                
            }
            // effect found / else            
            
        // DONE FUNCTION: playEffect( string: effectId ) void
        };
        self.audioChanged = function(  ){
        // FUNCTION: audioChanged( void ) void

            // audio is on / else   
            if( jsProject.getValue( 'on', 'audio' ) ){
                // call music stopped to restart
                self.musicStopped();
            }
            else {
                // music is playing
                if( self.currentMusic && self.currentMusic['phaserObject'] ){
                    // remove on complete
                    self.currentMusic['phaserObject'].onStop.remove( self.musicStopped, self );
                    // stop random music
                    self.currentMusic['phaserObject'].stop();
                    // unset current music
                    self.currentMusic = null;
                }
                // music is playing
            }
            // audio is on / else   
                
        // DONE FUNCTION: audioChanged( void ) void
        };
        self.update = function(  ){
        // FUNCTION: update( void ) void

        // DONE FUNCTION: update( void ) void
        };
        self.destruct = function(  ){
        // FUNCTION: destruct( void ) void
            
            // remove event subscriptions
            self.removeEventSubscriptions();

            // music is playing
            if( self.currentMusic && self.currentMusic['phaserObject'] ){
                // remove on complete
                self.currentMusic['phaserObject'].onStop.remove( self.musicStopped, self );
                // stop random music
                self.currentMusic['phaserObject'].stop();
                // unset current music
                self.currentMusic = null;
            }
            // music is playing

            // loop over music
            for( var i = 0; i < self.music.length; i++ ){
                
                // remove audio
                jsProject.callEvent( 'freeAudio', self.music[i] );
                
                // phaser object exists
                if( self.music[i]['phaserObject'] ){
                
                    // destroy phaser Object
                    self.music[i]['phaserObject'].destroy();
                    // reset phaser Object
                    self.music[i]['phaserObject'] = null;
                }          
                // phaser object exists
                
            }
            // done loop over music
                                
            // loop over effects
            for( var i = 0; i < self.effects.length; i++ ){
                
                // phaser object exists
                if( self.effects[i]['phaserObject'] ){
                
                    // destroy phaser Object
                    self.effects[i]['phaserObject'].destroy();
                    // reset phaser Object
                    self.effects[i]['phaserObject'] = null;
                }          
                // phaser object exists
                
                // preload effects
                jsProject.callEvent( 'freeAudio', self.effects[i] );
                
            }
            // done loop over effects
            
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
            // function playEffect( string: effectId ) void
            playEffect: function( effectId ){
                // call internal
                self.playEffect( effectId );
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
    // DONE MODULE: highScoresAudioModule( Phaser.Game ) void
})( alienInvasion );
// done create module function
