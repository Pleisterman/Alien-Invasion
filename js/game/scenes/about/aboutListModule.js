/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\about\aboutListModule.js
 * 
 *  Last Revision:  20-03-2018
 *  
 *  Purpose:  
 *      draws the list for the scene about
 * 
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: aboutListModule( Phaser.Game, module: audio ) void
    
    alienInvasion.aboutListModule = function( game, audio ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'aboutListModule';                                // string
        self.debugOn = true;                                           // boolean
        self.imageUrl = alienInvasion.config['imageUrl'];               // string
        self.game = game;                                               // Phaser.Game
        self.audio = audio;                                             // module
        self.listOptions = {                                            // json: listOptions    
            'marginLeft'            :   10,                             // integer: px
            'marginRight'           :   10,                             // integer: px   
            'mobileMarginLeft'      :   10,                             // integer: px
            'mobileMarginRight'     :   10,                             // integer: px   
            'marginTop'             :   130,                            // integer: px
            'marginBottom'          :   80,                             // integer: px  
            'mobileMarginTop'       :   70,                             // integer: px
            'mobileMarginBottom'    :   25,                             // integer: px
            'group'                 :   null,                           // Phaser.Group
            'contentGroup'          :   null,                           // Phaser.Group
            'background'            :   null,                           // Phaser.Graphics
            'backgroundColor'       :   "0x008800",                     // hex color
            'backgroundAlpha'       :   "0.0",                          // float
            'mouseOver'             :   false,                          // boolean
        };                                                              // done json: listOptions
        self.changeOrientationMessage = {                               // json: changeOrientationMessage
            'phaserObject'      :   null,
            'translation'       :   alienInvasion.translations['changeOrientationMessageAbout'],                
            'style'             :   {
                font: alienInvasion.config['fontSize'] + "px " + alienInvasion.config['font'], 
                fill: "#fff", 
                align: "center"
            }
        };
        self.listItems = [];                                            // json[ listItem,..]: listItems
        self.scrollAnimation = null;                                    // json
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
            
            // loop over about
            for( var i = 0; i < alienInvasion.about.length; i++ ){
                
                // type image
                if( alienInvasion.about[i]['type'] === 'image' ){
                    // create image listItem
                    var listItem = new alienInvasion.listItemImageModule( self.game, self.audio, self.listOptions, alienInvasion.about[i] );
                }
                // done type image
                
                // type text
                if( alienInvasion.about[i]['type'] === 'text' ){
                    // create text listItem
                    var listItem = new alienInvasion.listItemTextModule( self.game, self.audio, self.listOptions, alienInvasion.about[i] );
                }
                // done type text
                
                // type link
                if( alienInvasion.about[i]['type'] === 'link' ){
                    // create link list item
                    listItem = new alienInvasion.listItemLinkModule( self.game, self.audio, self.listOptions, alienInvasion.about[i] );
                }
                // done type link
                
                // preload list item
                listItem.preload();
                
                // listItem exists
                if( listItem ){
                    // add listItem to listItems
                    self.listItems.push( listItem );
                }
                // done listItem exists
            }            
            // done loop over about
            
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
            // set position
            self.listOptions['group'].position.set( 0, 0 );
            
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
            // use hand cursor
            self.listOptions['group'].mask.input.useHandCursor = true;      
            // add event handler1
            self.listOptions['group'].mask.events.onInputDown.add( function( sprite, event ){ self.click( sprite, event ); });
            
            // add list items
            self.addListItems();
            
            // add animation
            self.scrollAnimation = new alienInvasion.listScrollAnimationModule( self.listOptions );
            
        // DONE FUNCTION: create( void ) void
        };
        self.addListItems = function( ){
        // FUNCTION: addListItems( void ) void
        
            // loop over listItems
            for( var i = 0; i < self.listItems.length; i++ ){
                // call create
                self.listItems[i].create();
            }
            // done loop over listItems
        
        // DONE FUNCTION: addListItems( void ) void
        };
        self.update = function(  ){
        // FUNCTION: update( void ) void

            // cursor over group mask
            if( self.listOptions['group'].mask.input.pointerOver() ){
                // update items
                self.updateItems();
            }
            // done cursor over group mask
                         
            // scrollAnimation exists
            if( self.scrollAnimation ){
                // update list animation
                self.scrollAnimation.update();
            }
            // done scrollAnimation exists
            
        // DONE FUNCTION: update( void ) void
        };
        self.updateItems = function(  ){
        // FUNCTION: updateItems( void ) void

            // create left
            var left = self.game.input.activePointer.position.x;
            // subtract list marginLeft
            left -= self.listOptions['group'].x;
            // subtract contentGroup marginLeft
            left -= self.listOptions['contentGroup'].x;
            // create top
            var top = self.game.input.activePointer.position.y;
            // subtract list marginTop
            top -= self.listOptions['group'].y;
            // subtract contentgroup y
            top -= self.listOptions['contentGroup'].y;

            // loop over listItems
            for( var i = 0; i < self.listItems.length; i++ ){
                // call update
                self.listItems[i].update( left, top );
            }
            // done loop over listItems
                
        // DONE FUNCTION: updateItems( void ) void
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
            self.listOptions['height'] = self.game.world.height;
            // subtract margin top
            self.listOptions['height'] -= self.listOptions['mobileMarginTop'];
            // subtract margin bottom
            self.listOptions['height'] -= self.listOptions['mobileMarginBottom'];

            // calculate width
            var width = self.game.world.width - ( self.listOptions['mobileMarginLeft'] + self.listOptions['mobileMarginRight'] );
            //  calculate left
            var left = ( self.game.world.width - width ) / 2;

            // calculate top
            var top = self.listOptions['mobileMarginTop'];

            // set group position
            self.listOptions['group'].position.set( left, top );                

            // redraw background
            self.listOptions['background'].clear();    
            self.listOptions['background'].beginFill( self.listOptions['backgroundColor'] );
            self.listOptions['background'].drawRect( 0, 0, width, self.listOptions['height'] );
            self.listOptions['background'].endFill();
            // done redraw background

            // redraw mask
            self.listOptions['group'].mask.clear();    
            self.listOptions['group'].mask.beginFill( 0xfff );
            self.listOptions['group'].mask.drawRect( left, top, width, self.listOptions['height'] );
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
            }
            // done loop over items
            
            // hide orientation change message
            self.changeOrientationMessage['phaserObject'].alpha = 0;
            
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
            self.listOptions['height'] = self.game.world.height;
            // subtract margin top
            self.listOptions['height'] -= self.listOptions['marginTop'];
            // subtract margin bottom
            self.listOptions['height'] -= self.listOptions['marginBottom'];

            // calculate width
            var width = self.game.world.width - ( self.listOptions['marginLeft'] + self.listOptions['marginRight'] );
            //  calculate left
            var left = ( self.game.world.width - width ) / 2;

            // calculate top
            var top = self.listOptions['marginTop'];

            // set group position
            self.listOptions['group'].position.set( left, top );                

            // redraw background
            self.listOptions['background'].clear();    
            self.listOptions['background'].beginFill( self.listOptions['backgroundColor'] );
            self.listOptions['background'].drawRect( 0, 0, width, self.listOptions['height'] );
            self.listOptions['background'].endFill();
            // done redraw background

            // redraw mask
            self.listOptions['group'].mask.clear();    
            self.listOptions['group'].mask.beginFill( 0xfff );
            self.listOptions['group'].mask.drawRect( left, top, width, self.listOptions['height'] );
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
        self.click = function( sprite, event ) {
        // FUNCTION: click( phaser.text: textObject ) void
        
            // create left
            var left = self.game.input.activePointer.position.x;
            // subtract list marginLeft
            left -= self.listOptions['group'].x;
            // subtract contentGroup marginLeft
            left -= self.listOptions['contentGroup'].x;
            // create top
            var top = self.game.input.activePointer.position.y;
            // subtract list marginTop
            top -= self.listOptions['group'].y;
            // subtract contentgroup y
            top -= self.listOptions['contentGroup'].y;

            // loop over listItems
            for( var i = 0; i < self.listItems.length; i++ ){
                // call click
                self.listItems[i].click( left, top );
            }
            // done loop over listItems
            
        // DONE FUNCTION: click( phaser.text: textObject ) void
        };
        self.destruct = function(  ){
        // FUNCTION: destruct( void ) void
                    
            // destruct scrollAnimation
            self.scrollAnimation.destruct();
            // unset scrollAnimation
            self.scrollAnimation = null;
            
            // loop over items
            for( var i = 0; i < self.listItems.length; i++ ){
                
                // destruct item
                self.listItems[i].destruct();
            }
            // done loop over items
        
            // reset listItems
            self.listItems = [];
            
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
            // function destruct( void ) void
            destruct: function( ){
                // call internal
                self.destruct( );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: aboutListModule( Phaser.Game, module: audio ) void
})( alienInvasion );
// done create module function
