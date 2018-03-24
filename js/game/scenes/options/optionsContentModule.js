/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\options\optionsContentModule.js
 * 
 *  Last Revision:  17-03-2018
 *  
 *  Purpose:  
 *      creates the content for the scene options
 * 
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: optionsContentModule( Phaser.game: game, module: audio ) void
    
    alienInvasion.optionsContentModule = function( game, audio ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'optionsContentModule';                           // string
        self.debugOn = false;                                           // boolean
        self.imageUrl = alienInvasion.config['imageUrl'];               // url
        self.game = game;                                               // Phaser.Game
        self.audio = audio;                                             // module
        self.contentOptions = {                                         // json: contentOptions    
            'marginLeft'            :   50,                             // integer: px
            'marginRight'           :   50,                             // integer: px   
            'marginTop'             :   130,                            // integer: px
            'marginBottom'          :   80,                             // integer: px
            'mobileMarginLeft'      :   20,                             // integer: px
            'mobileMarginRight'     :   20,                             // integer: px   
            'mobileMarginTop'       :   70,                             // integer: px
            'mobileMarginBottom'    :   25,                             // integer: px
            'height'                :   0,                              // integer: height     
            'group'                 :   null,                           // Phaser.Group
            'contentGroup'          :   null,                           // Phaser.Group
            'background'            :   null,                           // Phaser.Graphics
            'backgroundColor'       :   "0x008800",                     // hex color
            'backgroundAlpha'       :   "0.0",                          // float
            'mouseOver'             :   false                           // boolean
        };                                                              // done json: contentOptions
        self.items = [                                                  // json: items
            {                                                           
                'id'            :   'optionsAudioPanel',                // string
                'module'        :   alienInvasion.optionsAudioPanel,    // module
                'moduleObject'  :   null                                // module
            }                                                            
        ];                                                              // done json: items    
        self.changeOrientationMessage = {                               // json: changeOrientationMessage
            'phaserObject'      :   null,
            'translation'       :   alienInvasion.translations['changeOrientationMessageOptions'],                
            'style'             :   {
                font: alienInvasion.config['fontSize'] + "px " + alienInvasion.config['font'], 
                fill: "#fff", 
                align: "center"
            }
        };
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // create item modules
            self.createItemModules();
           
        // DONE FUNCTION: construct( void ) void
        };
        self.createItemModules = function( ){
        // FUNCTION: createItems( void ) void
        
            // loop for items
            for( var i = 0; i < self.items.length; i++ ){
                
                // create module
                self.items[i]['moduleObject'] = new self.items[i]['module']( self.game, self.audio );
                
            }
            // loop for items
            
        // DONE FUNCTION: createItemModules( void ) void
        };
        self.addEventSubscriptions = function(){
        // FUNCTION: addEventSubscriptions( void ) void
            
            // subscribe to game layoutChange
            jsProject.subscribeToEvent( 'gameLayoutChange', self.layoutChange );

            // subscribe to mouseWheel
            //jsProject.subscribeToEvent( 'mouseWheel', self.mouseWheel );
            
            // subscribe to keyboardArrow
            //jsProject.subscribeToEvent( 'keyboardArrow', self.keyboardArrow );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.removeEventSubscriptions = function(){
        // FUNCTION: removeEventSubscriptions( void ) void
            
            // remove game layoutChange
            jsProject.unSubscribeFromEvent( 'gameLayoutChange', self.layoutChange );
            
            // remove mouseWheel
            //jsProject.unSubscribeFromEvent( 'mouseWheel', self.mouseWheel );
            
            // remove keyboardArrow
            //jsProject.unSubscribeFromEvent( 'keyboardArrow', self.keyboardArrow );
            
        // DONE FUNCTION: removeEventSubscriptions( void ) void
        };
        self.preload = function() {
        // FUNCTION: preload( void ) void

            // loop for items
            for( var i = 0; i < self.items.length; i++ ){
                
                // preload module
                self.items[i]['moduleObject'].preload();
                
            }
            // loop for items
            
        // DONE FUNCTION: preload( void ) void
        };
        self.create = function(  ){
        // FUNCTION: create( void ) void
            
            // debug info
            self.debug( 'create' );
            
            
            // is mobile
            if( alienInvasion.isMobile ){
                // create change orientation message
                self.changeOrientationMessage['phaserObject'] = self.game.add.text( 200, 
                                                                                    200, 
                                                                                    self.changeOrientationMessage['translation'], 
                                                                                    self.changeOrientationMessage['style'] );
                // create change orientation message
                
                // set anchor
                self.changeOrientationMessage['phaserObject'].anchor.set( 0.5, 0.5 );
                
            }            
            // is mobile
            
            // create group
            self.contentOptions['group'] = self.game.add.group( );
            // create background graphics
            self.contentOptions['background'] = self.game.add.graphics( 0, 0, self.contentOptions['group'] );
            // set background aplha
            self.contentOptions['background'].alpha = self.contentOptions['backgroundAlpha'];

            // create contentGroup
            self.contentOptions['contentGroup'] = self.game.add.group( self.contentOptions['group'] );
            // set position
            self.contentOptions['contentGroup'].position.set( 0, 0 );

            // create mask graphics
            self.contentOptions['group'].mask = self.game.add.graphics( 0, 0 );

            // loop for items
            for( var i = 0; i < self.items.length; i++ ){
                
                // preload module
                self.items[i]['moduleObject'].create( self.contentOptions['contentGroup'] );
                
            }
            // loop for items
            
            // adjust layout
            self.layoutChange();

            // event subscription
            self.addEventSubscriptions();
            
        // DONE FUNCTION: create( void ) void
        };
        self.update = function(  ){
        // FUNCTION: update( void ) void

            // loop for items
            for( var i = 0; i < self.items.length; i++ ){
                
                // preload module
                self.items[i]['moduleObject'].update( );
                
            }
            // loop for items
                                       
        // DONE FUNCTION: update( void ) void
        };
        self.layoutChange = function( ) {
        // FUNCTION: layoutChange( void ) void

            // hide content
            self.contentOptions['group'].alpha = 0;
                
            // is landscape and mobile / else
            if( window.innerWidth > window.innerHeight && alienInvasion.isMobile ){
                // show change orientation message
                self.showChangeOrientationMessage();
            }
            else {

                // is mobile
                if( alienInvasion.isMobile ){
                    // show mobile
                    self.showMobile();
                }
                else {
                    // show
                    self.show();
                }
                // is mobile

            }
            // is landscape and mobile/ else
                        
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.showMobile = function( ){
        // FUNCTION: showMobile( void ) void

            // calculate content height
            self.contentOptions['height'] = self.game.world.height;
            // subtract margin top
            self.contentOptions['height'] -= self.contentOptions['mobileMarginTop'];
            // subtract margin bottom
            self.contentOptions['height'] -= self.contentOptions['mobileMarginBottom'];

            // calculate width
            var width = self.game.world.width - ( self.contentOptions['mobileMarginLeft'] + self.contentOptions['mobileMarginRight'] );

            // calculate top
            var top = self.contentOptions['marginTop'];

            // set group position
            self.contentOptions['group'].position.set( self.contentOptions['mobileMarginLeft'], top );                

            // redraw background
            self.contentOptions['background'].clear();    
            self.contentOptions['background'].beginFill( self.contentOptions['backgroundColor'] );
            self.contentOptions['background'].drawRect( 0, 0, width, self.contentOptions['height'] );
            self.contentOptions['background'].endFill();
            // done redraw background

            // redraw mask
            self.contentOptions['group'].mask.clear();    
            self.contentOptions['group'].mask.beginFill( 0xfff );
            self.contentOptions['group'].mask.drawRect( self.contentOptions['mobileMarginLeft'], top, width, self.contentOptions['height'] );
            self.contentOptions['group'].mask.endFill();
            // done redraw mask

            // loop for items
            for( var i = 0; i < self.items.length; i++ ){
                
                // preload module
                self.items[i]['moduleObject'].layoutChange( );
                
            }
            // loop for items

            // hide orientation change message
            self.changeOrientationMessage['phaserObject'].alpha = 0.1;
            // add tween
            self.game.add.tween( self.changeOrientationMessage['phaserObject'] ).to( { alpha: 0 }, 
                                 alienInvasion.config['sceneShowTransitionPeriod'], 
                                 Phaser.Easing.Linear.In, 
                                 true );
            
            // add tween
            self.game.add.tween( self.contentOptions['group'] ).to( { alpha: 1 }, 
                                 alienInvasion.config['sceneShowTransitionPeriod'], 
                                 Phaser.Easing.Linear.In, 
                                 true );
            
        // DONE FUNCTION: showMobile( void ) void
        };
        self.show = function( ){
        // FUNCTION: show( void ) void

            // calculate content height
            self.contentOptions['height'] = self.game.world.height;
            // subtract margin top
            self.contentOptions['height'] -= self.contentOptions['marginTop'];
            // subtract margin bottom
            self.contentOptions['height'] -= self.contentOptions['marginBottom'];

            // calculate width
            var width = self.game.world.width - ( self.contentOptions['marginLeft'] + self.contentOptions['marginRight'] );

            // calculate top
            var top = self.contentOptions['marginTop'];

            // set group position
            self.contentOptions['group'].position.set( self.contentOptions['marginLeft'], top );                

            // redraw background
            self.contentOptions['background'].clear();    
            self.contentOptions['background'].beginFill( self.contentOptions['backgroundColor'] );
            self.contentOptions['background'].drawRect( 0, 0, width, self.contentOptions['height'] );
            self.contentOptions['background'].endFill();
            // done redraw background

            // redraw mask
            self.contentOptions['group'].mask.clear();    
            self.contentOptions['group'].mask.beginFill( 0xfff );
            self.contentOptions['group'].mask.drawRect( self.contentOptions['marginLeft'], top, width, self.contentOptions['height'] );
            self.contentOptions['group'].mask.endFill();
            // done redraw mask

            // loop for items
            for( var i = 0; i < self.items.length; i++ ){
                
                // preload module
                self.items[i]['moduleObject'].layoutChange( );
                
            }
            // loop for items
            
            // add tween
            self.game.add.tween( self.contentOptions['group'] ).to( { alpha: 1 }, 
                                 alienInvasion.config['sceneShowTransitionPeriod'], 
                                 Phaser.Easing.Linear.In, 
                                 true );
            
        // DONE FUNCTION: show( void ) void
        };
        self.showChangeOrientationMessage = function( ){
        // FUNCTION: showChangeOrientationMessage( void ) void
        
            // set left
            self.changeOrientationMessage['phaserObject'].x = self.game.world.width / 2;
            // set top
            self.changeOrientationMessage['phaserObject'].y = self.game.world.height / 2;
            
            // set alpha
            self.changeOrientationMessage['phaserObject'].alpha = 0;
            // add tween
            self.game.add.tween( self.changeOrientationMessage['phaserObject'] ).to( { alpha: 1 }, 
                                 alienInvasion.config['sceneShowTransitionPeriod'], 
                                 Phaser.Easing.Linear.In, 
                                 true );
            // add tween
            self.game.add.tween( self.contentOptions['group'] ).to( { alpha: 0 }, 
                                 alienInvasion.config['sceneShowTransitionPeriod'], 
                                 Phaser.Easing.Linear.In, 
                                 true );
                                     
            
        // DONE FUNCTION: showChangeOrientationMessage( void ) void
        };
        self.destruct = function(  ){
        // FUNCTION: destruct( void ) void
            
            // remove event subscriptions
            self.removeEventSubscriptions();
            
            // is mobile
            if( alienInvasion.isMobile ){
                // destroy change orientation message
                self.changeOrientationMessage['phaserObject'].destroy( );
                // unset change orientation message
                self.changeOrientationMessage['phaserObject'] = null;
            }
            // is mobile
            
            // loop for items
            for( var i = 0; i < self.items.length; i++ ){
                
                // preload module
                self.items[i]['moduleObject'].destruct( );
                
            }
            // loop for items
            
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
    // DONE MODULE: optionsContentModule( Phaser.game: game, module: audio ) void
})( alienInvasion );
// done create module function
