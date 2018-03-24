/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\gameMenu\optionsAudioPanel.js
 * 
 *  Last Revision:  10-03-2018
 * 
 *  Purpose:  
 *      handles the buttons for the scene: gameMenu
 *      
*/

// create module function
( function( alienInvasion ){

    // MODULE: optionsAudioPanel( Phaser.game: game, module: audio ) void
    
    alienInvasion.optionsAudioPanel = function( game, audio ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'optionsAudioPanel';                              // string
        self.debugOn = true;                                            // boolean
        self.imageUrl = alienInvasion.config['imageUrl'];               // url
        self.game = game;                                               // Phaser.Game
        self.audio = audio;                                             // module
        self.panelOptions = {                                           // json: panelOptions    
            'title' :                       alienInvasion.translations['volume'], // string 
            'marginTop' :                   10,                         // integer: px                                         
            'mobileMarginTop' :             10,                         // integer: px                                         
            'paddingBottom' :               30,                         // integer: px                                       
            'marginLeft' :                  50,                         // integer: px                                       
            'marginRight' :                 50,                         // integer: px                                       
            'mobileMarginLeft' :            20,                         // integer: px                                       
            'mobileMarginRight' :           20,                         // integer: px                                       
            'titlePaddingTop' :             50,                         // integer: px                                         
            'titlePaddingBottom' :          20,                         // integer: px                                         
            'paddingLeft' :                 50,                         // integer: px                                         
            'paddingRight' :                50,                         // integer: px                                         
            'sliderTitlePaddingTop' :       10,                         // integer: px                                         
            'sliderTitlePaddingBottom' :    10,                         // integer: px                                         
            'sliderPaddingTop' :            10,                         // integer: px                                         
            'sliderPaddingBottom' :         10,                         // integer: px                                         
            'maximumWidth' :                800,                        // integer: px height
        };                                                              // done json: panelOptions
        self.sliderOptions = [
            {
                'title' :           alienInvasion.translations['music'], // string 
                'id' :              "musicVolume",                      // string      
                'value' :           0.0,                                // integer / float
                'minimum' :         0.001,                              // integer / float
                'maximum' :         0.4,                                // integer / float
                'changeCallback' :  null                                // function
            },
            {
                'title' :           alienInvasion.translations['effects'], // string 
                'id' :              "effectsVolume",                    // string      
                'value' :           0.9,                                // integer / float
                'minimum' :         0,                                  // integer / float
                'maximum' :         1,                                  // integer / float
                'changeCallback' :  null                                // function
            }
        ];
        self.sliderPanel = null;                                        // module
        self.changeEffectId = 'gameButtonSelect';                       // string
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // set values
            self.setValues();
            
            // set margins
            self.setMargins();
            
            // add callbacks
            self.addCallbacks();

            // create slider panel
            self.sliderPanel = new alienInvasion.sliderPanelModule( self.game, self.audio, self.panelOptions, self.sliderOptions );

        // DONE FUNCTION: construct( void ) void
        };
        self.setValues = function() {
        // FUNCTION: setValues( void ) void

            // loop over sliderOptions
            for( var i = 0; i < self.sliderOptions.length; i++ ){
                
                // is music volume
                if( self.sliderOptions[i]['id'] === 'musicVolume' ){
                    // set change callback
                    self.sliderOptions[i]['changeCallback'] = self.changeMusicVolume;
                }
                // is music volume

                // is effects volume
                if( self.sliderOptions[i]['id'] === 'effectsVolume' ){
                    // set change callback
                    self.sliderOptions[i]['changeCallback'] = self.changeEffectsVolume;
                }
                // is effects volume

            }
            // loop over sliderOptions

        // DONE FUNCTION: setValues( void ) void
        };
        self.setMargins = function() {
        // FUNCTION: setMargins( void ) void

            // is mobile
            if( alienInvasion.isMobile ){
                // set margin top
                self.panelOptions['marginTop'] = self.panelOptions['mobileMarginTop'];
                // set margin left
                self.panelOptions['marginLeft'] = self.panelOptions['mobileMarginLeft'];
                // set margin right
                self.panelOptions['marginRight'] = self.panelOptions['mobileMarginRight'];
            }
            // is mobile

        // DONE FUNCTION: setMargins( void ) void
        };
        self.addCallbacks = function() {
        // FUNCTION: addCallbacks( void ) void

            // loop over sliderOptions
            for( var i = 0; i < self.sliderOptions.length; i++ ){

                // is music volume
                if( self.sliderOptions[i]['id'] === 'musicVolume' ){
                    // set change callback
                    self.sliderOptions[i]['value'] = jsProject.getValue( 'volume', 'music' );
                }
                // is music volume

                // is effects volume
                if( self.sliderOptions[i]['id'] === 'effectsVolume' ){
                    // set change callback
                    self.sliderOptions[i]['value'] = jsProject.getValue( 'volume', 'audioEffects' );
                }
                // is effects volume
                
            }
            // loop over sliderOptions

        // DONE FUNCTION: addCallbacks( void ) void
        };
        self.preload = function() {
        // FUNCTION: preload( void ) void

            // preload slider panel
            self.sliderPanel.preload( );

        // DONE FUNCTION: preload( void ) void
        };
        self.create = function( contentGroup ){
        // FUNCTION: create( Phaser.Group: contentGroup ) void
            
            // debug info
            self.debug( 'create' );

            // create panel
            self.sliderPanel.create( contentGroup );
            
        // DONE FUNCTION: create( Phaser.Group: contentGroup ) void
        };
        self.changeMusicVolume = function( value ){
        // FUNCTION: changeMusicVolume( float: value ) void
             
            // debug info
            self.debug( 'changeMusicVolume: ' + value );
            
            // set jsProject value
            jsProject.setValue( 'volume', 'music', value );
            
            // call event
            jsProject.callEvent( 'musicVolumeChanged' );
            
        // DONE FUNCTION: changeMusicVolume( float: value ) void
        };
        self.changeEffectsVolume = function( value ){
        // FUNCTION: changeEffectsVolume( float: value ) void
             
            // debug info
            self.debug( 'changeEffectsVolume: ' + value );
            
            // set jsProject value
            jsProject.setValue( 'volume', 'audioEffects', value );
            
            // play menu audio effect
            self.audio.playEffect( self.changeEffectId );
            
        // DONE FUNCTION: changeEffectsVolume( float: value ) void
        };
        self.update = function( ){
        // FUNCTION: update( void ) void
             
            // update slider panel
            self.sliderPanel.update( );
            
        // DONE FUNCTION: update( void ) void
        };
        self.layoutChange = function( ) {
        // FUNCTION: layoutChange( void ) void

            // adjust slider panel
            self.sliderPanel.layoutChange( );

            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.destruct = function(  ){
        // FUNCTION: destruct( void ) void
        
            // debug info
            self.debug( 'destruct' );

            // destruct slider panel
            self.sliderPanel.destruct( );


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
            // function create( Phaser.Group: contentGroup ) void
            create: function( contentGroup ){
                // call internal
                self.create( contentGroup );
            },
            // function update( void ) void
            update: function(  ){
                // call internal
                self.update( );
            },
            // function layoutChange( void ) void
            layoutChange: function( ){
                // call internal
                self.layoutChange( );
            },
            // function destruct( void ) void
            destruct: function( ){
                // call internal
                self.destruct( );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: optionsAudioPanel( Phaser.game: game, module: audio ) void
})( alienInvasion );
// done create module function
