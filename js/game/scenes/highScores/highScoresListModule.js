/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\highScores\highScoresListModule.js
 * 
 *  Last Revision:  19-03-2018
 * 
 *  Purpose:  
 *      handles the highScores list
 * 
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: highScoresListModule( Phaser.Game, module: audio ) void
    
    alienInvasion.highScoresListModule = function( game, audio ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'highScoresListModule';                           // string
        self.debugOn = false;                                           // boolean
        self.imageUrl = alienInvasion.config['imageUrl'];               // string
        self.game = game;                                               // Phaser.Game
        self.audio = audio;                                             // module
        self.listOptions = {                                            // json: listOptions    
            'marginLeft'            :   10,                             // integer: px
            'marginRight'           :   10,                             // integer: px   
            'marginTop'             :   130,                            // integer: px
            'marginBottom'          :   80,                             // integer: px
            'mobileMarginLeft'      :   10,                             // integer: px
            'mobileMarginRight'     :   10,                             // integer: px   
            'mobileMarginTop'       :   70,                             // integer: px
            'mobileMarginBottom'    :   25,                             // integer: px
            'group'                 :   null,                           // Phaser.Group
            'contentGroup'          :   null,                           // Phaser.Group
            'background'            :   null,                           // Phaser.Graphics
            'backgroundColor'       :   "0x008800",                     // hex color
            'backgroundAlpha'       :   "0.0",                          // float
            'mouseOver'             :   false                           // boolean
        };                                                              // done json: listOptions
        self.difficultyImages = [                                       // json: difficultyImages
            {                                                           //               
                'image'                 :   {                           // json: image
                    'assetId'           :   'difficultyLevel1',         // string
                    'type'              :   'image',                    // string
                    'fileName'          :   self.imageUrl + 'difficultyLevel1.png' // string
                }                                                       // done json: image
            },                                                          //            
            {                                                           //       
                'image'                 :   {                           // json: image
                    'assetId'           :   'difficultyLevel2',         // string
                    'type'              :   'image',                    // string
                    'fileName'          :   self.imageUrl + 'difficultyLevel2.png' // string
                }                                                       // done json: image
            },                                                          //     
            {                                                           //             
                'image'                 :   {                           // json: image
                    'assetId'           :   'difficultyLevel3',         // string
                    'type'              :   'image',                    // string
                    'fileName'          :   self.imageUrl + 'difficultyLevel3.png' // string
                }                                                       // done json: image
            }                                                           //  
        ];                                                              // done json: difficultyImages                
        self.changeOrientationMessage = {                               // json: changeOrientationMessage
            'phaserObject'      :   null,
            'translation'       :   alienInvasion.translations['changeOrientationMessageHighScores'],                
            'style'             :   {
                font: alienInvasion.config['fontSize'] + "px " + alienInvasion.config['font'], 
                fill: "#fff", 
                align: "center"
            }
        };
        self.listItems = [];                                            // json[ listItem,..]
        self.scrollAnimation = null;                                    // module
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

        // DONE FUNCTION: construct( void ) void
        };
        self.preload = function(  ){
        // FUNCTION: preload( void ) void
            
            // debug info
            self.debug( 'preload' );
            
            // loop over levels
            for( var i = 0; i < self.difficultyImages.length; i++ ){
                // load sprite image
                alienInvasion.loadAsset( self.difficultyImages[i]['image'] ); 
            }
            // done loop over levels
            
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
            self.listOptions['group'] = self.game.add.group( );
            
            // create background graphics
            self.listOptions['background'] = self.game.add.graphics( 0, 0, self.listOptions['group'] );
            // set background aplha
            self.listOptions['background'].alpha = self.listOptions['backgroundAlpha'];
            
            // create contentGroup
            self.listOptions['contentGroup'] = self.game.add.group( self.listOptions['group'] );
            // set position
            self.listOptions['contentGroup'].position.set( 0, 0 );

            // create mask graphics
            self.listOptions['group'].mask = self.game.add.graphics( 0, 0 );
            // enable mask events
            self.listOptions['group'].mask.inputEnabled = true;
            
            // add list items
            self.addListItems();
            
            // add animation
            self.scrollAnimation = new alienInvasion.listScrollAnimationModule( self.listOptions );
            
        // DONE FUNCTION: create( void ) void
        };
        self.addListItems = function( ){
        // FUNCTION: addListItems( void ) void
        
            // loop for missions
            for( var i = 0; i < alienInvasion.missions.length; i++ ){
            
                // create listItem
                var listItem = new alienInvasion.highScoresListItemModule( self.game, i, self.listOptions['contentGroup'] );
                
                // add listItem to listItems
                self.listItems.push( listItem );
            }
            // done loop for missions
        
        // DONE FUNCTION: addListItems( void ) void
        };
        self.update = function(  ){
        // FUNCTION: update( void ) void

            // scrollAnimation exists
            if( self.scrollAnimation ){
                // update list animation
                self.scrollAnimation.update();
            }
            // done scrollAnimation exists

        // DONE FUNCTION: update( void ) void
        };
        self.layoutChange = function( ) {
        // FUNCTION: layoutChange( void ) void

            // set alpha
            self.listOptions['group'].alpha = 0;
            
            // ! landscape and mobile / else
            if( window.innerWidth < window.innerHeight && alienInvasion.isMobile ){
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
            // ! landscape and mobile/ else
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.showMobile = function( ) {
        // FUNCTION: showMobile( void ) void
        
            // calculate list height
            self.listOptions['height'] = self.game.world.height - self.listOptions['mobileMarginTop'];
            // subtract margin bottom
            self.listOptions['height'] -= self.listOptions['mobileMarginBottom'];

            // calculate width
            var width = self.game.world.width - ( self.listOptions['mobileMarginLeft'] + self.listOptions['mobileMarginRight'] );

            // calculate top
            var top = self.listOptions['mobileMarginTop'];

            // set group position
            self.listOptions['group'].position.set( self.listOptions['mobileMarginLeft'], top );                

            // redraw background
            self.listOptions['background'].clear();    
            self.listOptions['background'].beginFill( self.listOptions['backgroundColor'] );
            self.listOptions['background'].drawRect( 0, 0, width, self.listOptions['height'] );
            self.listOptions['background'].endFill();
            // done redraw background

            // redraw mask
            self.listOptions['group'].mask.clear();    
            self.listOptions['group'].mask.beginFill( 0xfff );
            self.listOptions['group'].mask.drawRect( self.listOptions['mobileMarginLeft'], top, width, self.listOptions['height'] );
            self.listOptions['group'].mask.endFill();
            // done redraw mask
                        
            // create top
            var top = 0;
            
            // loop over items
            for( var i = 0; i < self.listItems.length; i++ ){
            
                // adjust item
                self.listItems[i].layoutChange( width, top );
                // add height to top
                top += self.listItems[i].getHeight();
                // add vertical spacing to top
                top += self.listItems[i].getVerticalSpacing();
            }
            // done loop over items
            
            // hide orientation change message
            self.changeOrientationMessage['phaserObject'].alpha = 0.1;
            // add tween
            self.game.add.tween( self.changeOrientationMessage['phaserObject'] ).to( { alpha: 0 }, 
                                 alienInvasion.config['sceneShowTransitionPeriod'], 
                                 Phaser.Easing.Linear.In, 
                                 true );
            
            // add tween
            self.game.add.tween( self.listOptions['group'] ).to( { alpha: 1 }, 
                                 alienInvasion.config['sceneShowTransitionPeriod'], 
                                 Phaser.Easing.Linear.In, 
                                 true );
                                 
        // DONE FUNCTION: showMobile( void ) void
        };
        self.show = function( ) {
        // FUNCTION: show( void ) void
        
            // calculate list height
            self.listOptions['height'] = self.game.world.height - self.listOptions['marginTop'];
            // subtract margin bottom
            self.listOptions['height'] -= self.listOptions['marginBottom'];

            // calculate width
            var width = self.game.world.width - ( self.listOptions['marginLeft'] + self.listOptions['marginRight'] );

            // calculate top
            var top = self.listOptions['marginTop'];

            // set group position
            self.listOptions['group'].position.set( self.listOptions['marginLeft'], top );                

            // redraw background
            self.listOptions['background'].clear();    
            self.listOptions['background'].beginFill( self.listOptions['backgroundColor'] );
            self.listOptions['background'].drawRect( 0, 0, width, self.listOptions['height'] );
            self.listOptions['background'].endFill();
            // done redraw background

            // redraw mask
            self.listOptions['group'].mask.clear();    
            self.listOptions['group'].mask.beginFill( 0xfff );
            self.listOptions['group'].mask.drawRect( self.listOptions['marginLeft'], top, width, self.listOptions['height'] );
            self.listOptions['group'].mask.endFill();
            // done redraw mask
                        
            // create top
            var top = 0;
            
            // loop over items
            for( var i = 0; i < self.listItems.length; i++ ){
            
                // adjust item
                self.listItems[i].layoutChange( width, top );
                // add height to top
                top += self.listItems[i].getHeight();
                // add vertical spacing to top
                top += self.listItems[i].getVerticalSpacing();
            }
            // done loop over items
            
            // add tween
            self.game.add.tween( self.listOptions['group'] ).to( { alpha: 1 }, 
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
            self.game.add.tween( self.listOptions['group'] ).to( { alpha: 0 }, 
                                 alienInvasion.config['sceneShowTransitionPeriod'], 
                                 Phaser.Easing.Linear.In, 
                                 true );
                                     
            
        // DONE FUNCTION: showChangeOrientationMessage( void ) void
        };
        self.refresh = function(  ){
        // FUNCTION: refresh( void ) void

            // loop over items
            for( var i = 0; i < self.listItems.length; i++ ){
                
                // destruct item
                self.listItems[i].refresh();
            }
            // done loop over items

        // DONE FUNCTION: refresh( void ) void
        };
        self.destruct = function(  ){
        // FUNCTION: destruct( void ) void
        
            // loop over difficultyImages
            for( var i = 0; i < self.difficultyImages.length; i++ ){
                // destroy difficultyImages image
                alienInvasion.destroyAsset( self.difficultyImages[i]['image'] ); 
            }
            // done loop over difficultyImages
            
            // loop over items
            for( var i = 0; i < self.listItems.length; i++ ){
                
                // destruct item
                self.listItems[i].destruct();
            }
            // done loop over items
        
            // reset listItems
            self.listItems = [];

            // destruct scrollAnimation
            self.scrollAnimation.destruct();
            // unset scrollAnimation
            self.scrollAnimation = null;
            
            // reset mouseOver
            self.listOptions['mouseOver'] = false;
        
            // destroy group
            self.listOptions['group'].destroy();
            // reset group
            self.listOptions['group'] = null;
            // reset background
            self.listOptions['background'] = null;
            // reset contentGroup
            self.listOptions['contentGroup'] = null;
            
            // is mobile
            if( alienInvasion.isMobile ){
                // destroy change orientation message
                self.changeOrientationMessage['phaserObject'].destroy( );
                // unset change orientation message
                self.changeOrientationMessage['phaserObject'] = null;
            }
            // is mobile
            
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
            // function layoutChange( void ) void
            layoutChange: function( ){
                // call internal
                self.layoutChange( );
            },
            // function update( void ) void
            update: function(  ){
                // call internal
                self.update( );
            },
            // function refresh( void ) void
            refresh: function(  ){
                // call internal
                self.refresh( );
            },
            // function destruct( void ) void
            destruct: function( ){
                // call internal
                self.destruct( );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: highScoresListModule( Phaser.Game, module: audio ) void
})( alienInvasion );
// done create module function
