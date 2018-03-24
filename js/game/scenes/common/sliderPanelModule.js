/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\common\sliderPanelModule.js
 * 
 *  Last Revision:  10-03-2018
 * 
 *  Purpose:  
 *      creates a slider panel
 *      
*/

// create module function
( function( alienInvasion ){

    // MODULE: sliderPanelModule( Phaser.game: game, module: audio, json: panelOptions ) void
    
    alienInvasion.sliderPanelModule = function( game, audio, panelOptions, sliderOptions ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'sliderPanelModule';                              // string
        self.debugOn = true;                                            // boolean
        self.imageUrl = alienInvasion.config['imageUrl'];               // url
        self.game = game;                                               // Phaser.Game
        self.audio = audio;                                             // module
        self.panelOptions = panelOptions;                               // json
        self.sliderOptions = sliderOptions;                             // json
        self.backgroundImage = {                                        // json: backgroundImage    
            'assetId'               :   'panelBackground',              // string
            'type'                  :   'image',                        // string
            'fileName'              :   self.imageUrl + 'panelBackground.png', // string
            'phaserObject'          :   null                            // Phaser:sprite
        };                                                              // done json: backgroundImage
        self.titleOptions = {                                           // json: titleOptions
            'fontSize' :            parseInt( alienInvasion.config['fontSize'] ) + 8, // integer: px
            'style'                 :   {                               // json: style
                font: parseInt( alienInvasion.config['fontSize'] ) + 8 + "px " + alienInvasion.config['font'], 
                fill: "#000", 
                stroke: "#555500",
                strokeThickness: 2,
                align: "left"
            },                                                          // done json: style
            'phaserObject'          :   null,                           // Phaser.text: phaserObject
        };                                                              // done json: titleOptions    
        self.clickAreaOptions = {                                       // json knobOptions
            'assetId' :             'emptyRect',                        // string
            'height' :              40                                  // integer: px     
        };                                                              // json knobOptions
        self.bottomLineOptions = {                                      // json bottomLineOptions
            'height' :              2,                                  // integer: px     
            'borderRadius' :        1,                                  // integer: px        
            'backgroundColor' :     0x000000                            // hex color
        };                                                              // json bottomLineOptions
        self.topLineOptions = {                                         // json topLineOptions
            'height' :              4,                                  // integer: px   
            'borderRadius' :        2,                                  // integer: px        
            'backgroundColor' :     0x00dd00                            // hex color
        };                                                              // json topLineOptions
        self.knobOptions = {                                            // json knobOptions
            'assetId'           :   'sliderKnob',                       // string
            'diameter' :            25,                                 // integer: px     
            'pointerOffset' :       50                                  // integer: px     
        };                                                              // json knobOptions
        self.assets = [                                                 // json: assets
            {                                                           // json: emptyRect                
                'assetId' :         'emptyRect',                        // string
                "type" :            "spritesheet",                      // string
                'fileName' :        self.imageUrl + 'emptyRect.png',    // string
                "imageWidth" :      10,                                 // integer: px           
                "imageHeight" :     10                                  // integer: px     
            },                                                          // done json: emptyRect
            {                                                           // json: sliderKnob                
                'assetId' :         'sliderKnob',                       // string
                "type" :            "spritesheet",                      // string
                'fileName' :        self.imageUrl + 'sliderKnob.png',   // string
                "imageWidth" :      30,                                 // integer: px           
                "imageHeight" :     30                                  // integer: px     
            }                                                           // done json: sliderKnob
        ];                                                              // done json: assets
        self.sliderTitleOptions = {                                     // json: sliderTitleOptions
            'fontSize' :            parseInt( alienInvasion.config['fontSize'] ) + 4, // integer: px
            'style' :               {                                   // json: style
                font: parseInt( alienInvasion.config['fontSize'] ) + 4 + "px " + alienInvasion.config['font'], 
                fill: "#000",                                           // color
                stroke: "#555500",                                      // color
                strokeThickness: 2,                                     // integer: px
                align: "left"                                           // string
            },                                                          // done json: style
            'overStyle' :            {                                  // json: overStyle
                font: parseInt( alienInvasion.config['fontSize'] ) + 4 + "px " + alienInvasion.config['font'], 
                fill: "#00dd00",                                           // color
                stroke: "#555500",                                      // color
                strokeThickness: 2,                                     // integer: px
                align: "left"                                           // string
            }                                                           // done json: overStyle
        };                                                              // done json: sliderTitleOptions    
        self.sliders = [];                                              // array
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
            
            // subscribe to keyboardArrow
            jsProject.subscribeToEvent( 'keyboardArrow', self.keyboardArrow );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.removeEventSubscriptions = function(){
        // FUNCTION: removeEventSubscriptions( void ) void
            
            // remove keyboardArrow
            jsProject.unSubscribeFromEvent( 'keyboardArrow', self.keyboardArrow );
            
        // DONE FUNCTION: removeEventSubscriptions( void ) void
        };
        self.preload = function() {
        // FUNCTION: preload( void ) void

            // load sprite image
            alienInvasion.loadAsset( self.backgroundImage ); 
            
            // loop over assets
            for( var i = 0; i < self.assets.length; i++ ){
                // load asset
                alienInvasion.loadAsset( self.assets[i] ); 
            }
            // done loop over assets        
            
        // DONE FUNCTION: preload( void ) void
        };
        self.create = function( contentGroup ){
        // FUNCTION: create( Phaser.Group: contentGroup ) void
            
            // debug info
            self.debug( 'create' );

            // create panel
            self.createPanel( contentGroup );
            
            // create title
            self.createTitle( contentGroup );
            
            // create sliders
            self.createSliders( contentGroup );
            
            // event subscription
            self.addEventSubscriptions();

        // DONE FUNCTION: create( Phaser.Group: contentGroup ) void
        };
        self.createPanel = function( contentGroup ){
        // FUNCTION: createPanel( Phaser.Group: contentGroup ) void
      
            // create background image
            self.backgroundImage['phaserObject'] = self.game.add.sprite( 0, 0,  self.backgroundImage['assetId'] ); 
            // set anchor
            self.backgroundImage['phaserObject'].anchor.set( 0, 0 );

            // group exists
            if( contentGroup ){    
                // add to group
                contentGroup.add( self.backgroundImage['phaserObject'] );
            }
            // group exists
                
        // DONE FUNCTION: createPanel( Phaser.Group: contentGroup ) void
        };
        self.createTitle = function( contentGroup ){
        // FUNCTION: createTitle( Phaser.Group: contentGroup ) void
      
            // create title text
            self.titleOptions['phaserObject'] = self.game.add.text( 0, 0, self.panelOptions['title'],  self.titleOptions['style'] );
            // set anchor
            self.titleOptions['phaserObject'].anchor.set( 0.5, 0.5 );
            
            // group exists
            if( contentGroup ){    
                // add to group
                contentGroup.add( self.titleOptions['phaserObject'] );
            }
            // group exists
                
        // DONE FUNCTION: createTitle( Phaser.Group: contentGroup ) void
        };
        self.createSliders = function( contentGroup ){
        // FUNCTION: createSliders( Phaser.Group: contentGroup ) void
      
            // loop over slider options
            for( var i = 0; i < self.sliderOptions.length; i++ ){
                
                // create slider object
                var slider = {
                    'title'  :   {
                        'phaserObject' :    self.game.add.text( 0, 0, self.sliderOptions[i]['title'],  self.sliderTitleOptions['style'] )
                    },
                    'bottomLine'  :   {
                        'phaserObject' :    self.game.add.graphics( 0, 0, contentGroup )
                    },
                    'topLine'  :   {
                        'phaserObject' :    self.game.add.graphics( 0, 0, contentGroup )
                    },
                    'clickArea'  :   {
                        'phaserObject' :    self.game.add.sprite( 0, 0,  self.clickAreaOptions['assetId'] )
                    },
                    'knob'  :   {
                        'phaserObject' :    self.game.add.sprite( 0, 0,  self.knobOptions['assetId'] )
                    }
                };
                // create slider object

                // set title group
                contentGroup.add( slider['title']['phaserObject'] );
                // set title anchor
                slider['title']['phaserObject'].anchor.set( 0, 0 );
                
                // set clickArea group
                contentGroup.add( slider['clickArea']['phaserObject'] );
                // set clickArea anchor
                slider['clickArea']['phaserObject'].anchor.set( 0, 0 );
                // enable events
                slider['clickArea']['phaserObject'].inputEnabled = true;
                // set data
                slider['clickArea']['phaserObject']['data']['index'] = i; 
                // use hand cursor
                slider['clickArea']['phaserObject'].input.useHandCursor = true;      
                // set over event
                slider['clickArea']['phaserObject'].events.onInputOver.add( function( sprite ){ self.clickAreaOver( sprite ); });
                // set out event
                slider['clickArea']['phaserObject'].events.onInputOut.add( function( sprite ){ self.clickAreaOut( sprite ); });
                // set click event
                slider['clickArea']['phaserObject'].events.onInputDown.add( function( sprite ){ self.clickAreaClick( sprite ); });
                
                // set knob group
                contentGroup.add( slider['knob']['phaserObject'] );
                // set knob width
                slider['knob']['phaserObject'].width = self.knobOptions['diameter'];
                // set knob height
                slider['knob']['phaserObject'].height = self.knobOptions['diameter'];
                // set anchor
                slider['knob']['phaserObject'].anchor.set( 0.5, 0.5 );
                // enable events
                slider['knob']['phaserObject'].inputEnabled = true;
                // use hand cursor
                slider['knob']['phaserObject'].input.useHandCursor = true;  
                // enable drag
                slider['knob']['phaserObject'].input.enableDrag();
                // set data
                slider['knob']['phaserObject']['data']['index'] = i; 
                // set over event
                slider['knob']['phaserObject'].events.onInputOver.add( function( sprite ){ self.knobOver( sprite ); });
                // set out event
                slider['knob']['phaserObject'].events.onInputOut.add( function( sprite ){ self.knobOut( sprite ); });
                // set dragUpdate event
                slider['knob']['phaserObject'].events.onDragUpdate.add( function( sprite, pointer){ self.dragUpdate( sprite, pointer ); });
                // set dragStop event
                slider['knob']['phaserObject'].events.onDragStop.add( function( sprite, pointer){ self.dragStop( sprite, pointer ); });
                
                // add to sliders
                self.sliders.push( slider );
                
            }
            // loop over slider options            
                
        // DONE FUNCTION: createSliders( Phaser.Group: contentGroup ) void
        };
        self.clickAreaOver = function( clickArea ){
        // FUNCTION: clickAreaOver( phaserObject: clickArea ) void
        
            // debug info
            self.debug( 'clickAreaOver: ' + clickArea['data']['index'] );
            
            // set title over style
            self.sliders[clickArea['data']['index']]['title']['phaserObject'].setStyle( self.sliderTitleOptions['overStyle'] );
            
            
        // DONE FUNCTION: clickAreaOver( phaserObject: clickArea ) void
        };
        self.clickAreaOut = function( clickArea ){
        // FUNCTION: clickAreaOut( phaserObject: clickArea ) void
        
            // debug info
            self.debug( 'clickAreaOut: ' + clickArea['data']['index'] );
            
            // set title over style
            self.sliders[clickArea['data']['index']]['title']['phaserObject'].setStyle( self.sliderTitleOptions['style'] );
            
        // DONE FUNCTION: clickAreaOut( phaserObject: button ) void
        };
        self.clickAreaClick = function( clickArea ){
        // FUNCTION: clickAreaClick( phaserObject: clickArea ) void
        
            // debug info
            self.debug( 'clickAreaClick: ' + clickArea['data']['index'] );
            
            // get clickArea left
            var clickAreaLeft = self.sliders[clickArea['data']['index']]['clickArea']['phaserObject'].x;
            // get pointer left
            var left = self.game.input.activePointer.position.x;
            // subtract clickArea left
            left -= clickAreaLeft;
            // subtract offset
            left -= self.knobOptions['pointerOffset'];
            // set minimum
            left = Math.max( 0, left );
            // set maximum
            left = Math.min( self.sliders[clickArea['data']['index']]['clickArea']['phaserObject'].width, left );
            // calculate ratio
            var ratio = left / self.sliders[clickArea['data']['index']]['clickArea']['phaserObject'].width;

            self.debug( ratio );
            
            // calculate slider scale
            var sliderScale = self.sliderOptions[clickArea['data']['index']]['maximum'] - self.sliderOptions[clickArea['data']['index']]['minimum'];
            // set value
            self.sliderOptions[clickArea['data']['index']]['value'] = sliderScale * ratio;
            
            // adjust sliders
            self.adjustSliders();
            
            // call callback
            self.sliderOptions[clickArea['data']['index']]['changeCallback']( self.sliderOptions[clickArea['data']['index']]['value'] );
            
        // DONE FUNCTION: clickAreaClick( phaserObject: clickArea ) void
        };
        self.knobOver = function( knob ){
        // FUNCTION: knobOver( phaserObject: knob ) void
        
            // debug info
            self.debug( 'knobOver: ' + knob['data']['index'] );
            
            // set title over style
            self.sliders[knob['data']['index']]['title']['phaserObject'].setStyle( self.sliderTitleOptions['overStyle'] );
            
            
        // DONE FUNCTION: knobOver( phaserObject: knob ) void
        };
        self.knobOut = function( knob ){
        // FUNCTION: clickAreaOut( phaserObject: knob ) void
        
            // debug info
            self.debug( 'knobOut: ' + knob['data']['index'] );
            
            // set title over style
            self.sliders[knob['data']['index']]['title']['phaserObject'].setStyle( self.sliderTitleOptions['style'] );
            
        // DONE FUNCTION: knobOut( phaserObject: knob ) void
        };
        self.dragUpdate = function( knob, pointer ){
        // FUNCTION: dragUpdate( phaserObject: knob, Phaser.Pointer: pointer ) void
        
            // debug info
            self.debug( 'dragUpdate: ' + pointer.x );
            
            // get clickArea left
            var clickAreaLeft = self.sliders[knob['data']['index']]['clickArea']['phaserObject'].x;
            // get pointer left
            var left = pointer.x;
            // subtract clickArea left
            left -= clickAreaLeft;
            // subtract offset
            left -= self.knobOptions['pointerOffset'];
            // set minimum
            left = Math.max( 0, left );
            // set maximum
            left = Math.min( self.sliders[knob['data']['index']]['clickArea']['phaserObject'].width, left );
            // calculate ratio
            var ratio = left / self.sliders[knob['data']['index']]['clickArea']['phaserObject'].width;

            self.debug( ratio );
            
            // calculate slider scale
            var sliderScale = self.sliderOptions[knob['data']['index']]['maximum'] - self.sliderOptions[knob['data']['index']]['minimum'];
            // set value
            self.sliderOptions[knob['data']['index']]['value'] = sliderScale * ratio;
            
            // adjust sliders
            self.adjustSliders();
                        
        // DONE FUNCTION: dragUpdate( phaserObject: knob, Phaser.Pointer: pointer ) void
        };
        self.dragStop = function( knob, pointer ){
        // FUNCTION: dragStop( phaserObject: knob, Phaser.Pointer: pointer ) void
        
            // debug info
            self.debug( 'dragUpdate: ' + pointer.x );
            
            // get clickArea left
            var clickAreaLeft = self.sliders[knob['data']['index']]['clickArea']['phaserObject'].x;
            // get pointer left
            var left = pointer.x;
            // subtract clickArea left
            left -= clickAreaLeft;
            // subtract offset
            left -= self.knobOptions['pointerOffset'];
            // set minimum
            left = Math.max( 0, left );
            // set maximum
            left = Math.min( self.sliders[knob['data']['index']]['clickArea']['phaserObject'].width, left );
            // calculate ratio
            var ratio = left / self.sliders[knob['data']['index']]['clickArea']['phaserObject'].width;

            self.debug( ratio );
            
            // calculate slider scale
            var sliderScale = self.sliderOptions[knob['data']['index']]['maximum'] - self.sliderOptions[knob['data']['index']]['minimum'];
            // set value
            self.sliderOptions[knob['data']['index']]['value'] = sliderScale * ratio;
            
            // adjust sliders
            self.adjustSliders();
            
             // call callback
            self.sliderOptions[knob['data']['index']]['changeCallback']( self.sliderOptions[knob['data']['index']]['value'] );
            
        // DONE FUNCTION: dragStop( phaserObject: knob, Phaser.Pointer: pointer ) void
        };
        self.update = function( ){
        // FUNCTION: update( void ) void
             
        // DONE FUNCTION: update( void ) void
        };
        self.layoutChange = function( ) {
        // FUNCTION: layoutChange( void ) void

            // adjust background
            self.adjustBackground();
            
            // adjust title
            self.adjustTitle();
            
            // adjust sliders
            self.adjustSliders();
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.adjustBackground = function( ) {
        // FUNCTION: adjustBackground( void ) void
        
            // calculate maximum width
            var maximumWidth = self.game.world.width;
            // subtract margin left
            maximumWidth -= self.panelOptions['marginLeft'];
            // subtract margin right
            maximumWidth -= self.panelOptions['marginRight'];

            // calculate panel width
            var panelWidth = Math.min( maximumWidth, self.panelOptions['maximumWidth'] );
            // calculate left
            var left = ( self.game.world.width - panelWidth ) / 2;
            // subtract margin left ( is defined in the group )
            left -= self.panelOptions['marginLeft'];
            // set background left
            self.backgroundImage['phaserObject'].x = left;
            // set background top
            self.backgroundImage['phaserObject'].y = self.panelOptions['marginTop'];
            // set background width
            self.backgroundImage['phaserObject'].width = panelWidth;
            
            // calculate height
            var height = self.panelOptions['titlePaddingTop'];
            // add title height
            height += self.titleOptions['fontSize'];
            // add title padding bottom
            height += self.panelOptions['titlePaddingBottom'];
            
            // add sliders title padding top
            height += self.sliders.length * self.panelOptions['sliderTitlePaddingTop'];
            // add title height
            height += self.sliders.length * self.sliderTitleOptions['fontSize'];
            // add sliders title padding bottom
            height += self.sliders.length * self.panelOptions['sliderTitlePaddingBottom'];
            
            // add sliders padding top
            height += self.sliders.length * self.panelOptions['sliderPaddingTop'];
            // add title height
            height += self.sliders.length * self.clickAreaOptions['height'];
            // add sliders padding bottom
            height += self.sliders.length * self.panelOptions['sliderPaddingBottom'];
            // add panel padding bottom
            height += self.sliders.length * self.panelOptions['paddingBottom'];
            
            // set background height
            self.backgroundImage['phaserObject'].height = height;
            
        // DONE FUNCTION: adjustBackground( void ) void
        };
        self.adjustTitle = function( ) {
        // FUNCTION: adjustTitle( void ) void
        
            // calculate top
            var top = self.panelOptions['marginTop'];
            // add title padding top
            top += self.panelOptions['titlePaddingTop'];
            // set title left
            self.titleOptions['phaserObject'].y = top;
            // calculate left
            var left = self.backgroundImage['phaserObject'].x;
            // add half backhround width
            left += self.backgroundImage['phaserObject'].width / 2;
            
            // set title left
            self.titleOptions['phaserObject'].x = left;
            
        // DONE FUNCTION: adjustTitle( void ) void
        };
        self.adjustSliders = function( ) {
        // FUNCTION: adjustSliders( void ) void
            
            // calculate left
            var left = self.backgroundImage['phaserObject'].x + self.panelOptions['paddingLeft'];
            // calculate width
            var width = self.backgroundImage['phaserObject'].width;
            // subtract padding left
            width -= self.panelOptions['paddingLeft'];
            // subtract padding right
            width -= self.panelOptions['paddingRight'];
            // calculate top
            var top = self.panelOptions['marginTop'];
            // add title padding top
            top += self.panelOptions['titlePaddingTop'];
            // add title height
            top += self.titleOptions['fontSize'];
            // add title padding bottom
            top += self.panelOptions['titlePaddingBottom'];            
            
            // loop over slider 
            for( var i = 0; i < self.sliders.length; i++ ){
            
                // add title padding top
                top += self.panelOptions['sliderTitlePaddingTop'];
                self.sliders[i]['title']['phaserObject'].y = top;
                self.sliders[i]['title']['phaserObject'].x = self.backgroundImage['phaserObject'].x + self.panelOptions['paddingLeft'];
                // add title height
                top += self.sliderTitleOptions['fontSize'];
                // add sliders padding bottom
                top += self.panelOptions['sliderTitlePaddingBottom'];
            
                // add slider padding top
                top += self.panelOptions['sliderPaddingTop'];
             
                // redraw bottom line
                self.sliders[i]['bottomLine']['phaserObject'].clear(); 
                self.sliders[i]['bottomLine']['phaserObject'].lineStyle( 0, 0xffd900 );
                self.sliders[i]['bottomLine']['phaserObject'].beginFill( self.bottomLineOptions['backgroundColor'] );
                self.sliders[i]['bottomLine']['phaserObject'].drawRoundedRect( left, top, width, self.bottomLineOptions['height'], self.bottomLineOptions['borderRadius'] );
                self.sliders[i]['bottomLine']['phaserObject'].endFill();
                // done redraw bottom line
                
                // calculate ratio
                var ratio = ( self.sliderOptions[i]['value'] - self.sliderOptions[i]['minimum'] ) / ( self.sliderOptions[i]['maximum'] - self.sliderOptions[i]['minimum'] );
                
                // redraw top line
                // calculate top
                var topLineTop = top - ( ( self.topLineOptions['height'] - self.bottomLineOptions['height'] ) / 2 );
                // calculate width
                var topLineWidth = ( width * ratio );
                self.sliders[i]['topLine']['phaserObject'].clear(); 
                self.sliders[i]['topLine']['phaserObject'].lineStyle( 0, 0xffd900 );
                self.sliders[i]['topLine']['phaserObject'].beginFill( self.topLineOptions['backgroundColor'] );
                self.sliders[i]['topLine']['phaserObject'].drawRoundedRect( left, topLineTop, topLineWidth, self.topLineOptions['height'], self.topLineOptions['borderRadius'] );
                self.sliders[i]['topLine']['phaserObject'].endFill();
                // done redraw top line
                
                // redraw clickArea
                self.sliders[i]['clickArea']['phaserObject'].y = top - ( ( self.clickAreaOptions['height'] - self.bottomLineOptions['height'] ) / 2 );;
                self.sliders[i]['clickArea']['phaserObject'].x = left;
                self.sliders[i]['clickArea']['phaserObject'].height = self.clickAreaOptions['height'];
                self.sliders[i]['clickArea']['phaserObject'].width = width;
                // done redraw clickArea
                
                // set knob top
                self.sliders[i]['knob']['phaserObject'].y = top + self.bottomLineOptions['height'];
                // set knob left
                self.sliders[i]['knob']['phaserObject'].x = left + ( width * ratio );
                
                // add knob height
                top += self.clickAreaOptions['height'];
                // add vertical spacing
                top += self.panelOptions['sliderPaddingBottom'];
            }            
            // loop over slider 
            
        // DONE FUNCTION: adjustSliders( void ) void
        };
        self.keyboardArrow = function( direction ){
        // FUNCTION: keyboardArrow( string: direction ) void

            // direction is up
            if( direction === 'up' ){
                
                
            }
            // done direction is up
        
            // direction is down
            if( direction === 'down' ){
                
                
            }
            // done direction is down
        
        // DONE FUNCTION: keyboardArrow( string: direction ) void
        };
        self.destruct = function(  ){
        // FUNCTION: destruct( void ) void
        
            // debug info
            self.debug( 'destruct' );

            // remove event subscriptions
            self.removeEventSubscriptions();

            // destroy background 
            self.backgroundImage['phaserObject'].destroy();
            // unset background 
            self.backgroundImage['phaserObject'] = null;

            // destroy title 
            self.titleOptions['phaserObject'].destroy();
            // unset background 
            self.titleOptions['phaserObject'] = null;

            // loop over sliders
            for( var i = 0; i < self.sliders.length; i++ ){
                // destroy title
                self.sliders[i]['title']['phaserObject'].destroy(); 
                // unset title
                self.sliders[i]['title']['phaserObject'] = null;
                // destroy bottom line
                self.sliders[i]['bottomLine']['phaserObject'].destroy(); 
                // unset bottom line
                self.sliders[i]['bottomLine']['phaserObject'] = null;
                // destroy top line
                self.sliders[i]['topLine']['phaserObject'].destroy(); 
                // unset top line
                self.sliders[i]['topLine']['phaserObject'] = null;
                // destroy click area
                self.sliders[i]['clickArea']['phaserObject'].destroy(); 
                // unset click area
                self.sliders[i]['clickArea']['phaserObject'] = null;
                // destroy knob
                self.sliders[i]['knob']['phaserObject'].destroy(); 
                // unset knob
                self.sliders[i]['knob']['phaserObject'] = null;
            }
            // loop over sliders
            
            // reset sliders
            self.sliders = [];
            
            // loop over assets
            for( var i = 0; i < self.assets.length; i++ ){
                // destroy asset
                alienInvasion.destroyAsset( self.assets[i] ); 
            }
            // done loop over assets             
            
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
            layoutChange: function(  ){
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
    // DONE MODULE: sliderPanelModule( Phaser.game: game, module: audio, json: panelOptions ) void
})( alienInvasion );
// done create module function
