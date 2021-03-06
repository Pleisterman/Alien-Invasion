/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\common\listItemLinkModule.js
 * 
 *  Last Revision:  20-03-2018
 *  
 *  Purpose:  
 *      creates a link item for the list
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: listItemLinkModule( Phaser.Game, module: audio, json: listOptions, json: itemOptions ) void
    
    alienInvasion.listItemLinkModule = function( game, audio, listOptions, itemOptions ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'listItemLinkModule';                             // string
        self.debugOn = false;                                           // boolean
        self.game = game;                                               // Phaser.Game
        self.audio = audio;                                             // module
        self.listOptions = listOptions;                                 // json
        self.itemOptions = itemOptions;                                 // json
        self.textOptions = {                                            // json: textOptions    
            'style'             :   {                                   // json: style
                font: alienInvasion.config['fontSize'] + "px " + alienInvasion.config['font'],           
                fill: "#00dddd", 
                strokeThickness: 1,
                stroke: "#000000",
                align: "left"
            },                                                          // done json: style    
            'overStyle'             :   {                               // json: overStyle
                font: alienInvasion.config['fontSize'] + "px " + alienInvasion.config['font'], 
                fill: "#dddd00", 
                strokeThickness: 1,
                stroke: "#000000",
                align: "left"
            },                                                          // done json: overStyle
            "link"              :   "",                                 // url
            "marginLeft"        :   60,                                 // integer: px
            "marginRight"       :   60,                                 // integer: px
            "phaserObject"      :   null,                               // Phaser.Text
            "mouseIsOver"       :   false,                              // boolean
        };                                                              // done json: textOptions
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
            
            // debug info
            self.debug( 'preload' );
            
        // DONE FUNCTION: preload( void ) void
        };
        self.create = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'create' );

            // create text
            var text = '';

            // text for current language is defined
            if( self.itemOptions['text'][alienInvasion.language] !== undefined ){
                // set text
                text = self.itemOptions['text'][alienInvasion.language];
            }
            else if( self.itemOptions['text'][alienInvasion.defaultLanguage] ){
                // set text
                text = self.itemOptions['text'][alienInvasion.defaultLanguage];
            }
            // text for current language is defined
            
            // create link
            var link = '';
            
            // link for current language is defined
            if( self.itemOptions['link'][alienInvasion.language] !== undefined ){
                // set link
                self.textOptions['link'] = self.itemOptions['link'][alienInvasion.language];
            }
            else if( self.itemOptions['link'][alienInvasion.defaultLanguage] ){
                // set link
                self.textOptions['link'] = self.itemOptions['link'][alienInvasion.defaultLanguage];
            }
            // link for current language is defined
                        
            // style exists
            if( self.itemOptions['style'] !== undefined ){
                // set style
                self.textOptions['style'] = self.itemOptions['style'];
            }
            // done style exists
            
            // color exists
            if( self.itemOptions['color'] !== undefined ){
                // set style color
                self.textOptions['style']['fill'] = self.itemOptions['color'];
            }
            // done color exists
            
            // selectedColor exists
            if( self.itemOptions['selectedColor'] !== undefined ){
                // set overStyle color
                self.textOptions['style']['fill'] = self.itemOptions['selectedColor'];
            }
            // done selectedColor exists
            
            // align exists and is center
            if( self.itemOptions['align'] !== undefined && self.itemOptions['align'] === 'center' ){
                // set style align
                self.textOptions['style']['align'] = 'center';
            }
            // done align exists and is center
                
            // create text
            self.textOptions['phaserObject'] = self.game.add.text( 0, 0, text, self.textOptions['style'], self.listOptions['contentGroup'] );
            
            // align exists and is center
            if( self.itemOptions['align'] !== undefined && self.itemOptions['align'] === 'center' ){
                // set anchor
                self.textOptions['phaserObject'].anchor.set( 0.5, 0 );
            }
            else {
                // set anchor
                self.textOptions['phaserObject'].anchor.set( 0, 0 );
            }
            // done align exists and is center
            
        // DONE FUNCTION: create( void ) void
        };
        self.update = function( mouseLeft, mouseTop ){
        // FUNCTION: update( integer mouseLeft, integer: mouseTop ) void

            // mouse is over item
            if( mouseLeft > self.textOptions['phaserObject'].x &&
                mouseLeft < self.textOptions['phaserObject'].x + self.textOptions['phaserObject'].width &&
                mouseTop > self.textOptions['phaserObject'].y && 
                mouseTop < self.textOptions['phaserObject'].y + self.textOptions['phaserObject'].height ){

                // ! mouseIsOver
                if( !self.textOptions['mouseIsOver'] ){
                    // set style
                    self.textOptions['phaserObject'].setStyle( self.textOptions['overStyle'] );
                    // remember mouseIsOver
                    self.textOptions['mouseIsOver'] = true;
                }
                // done ! mouseIsOver
                
            }
            else { 

                // ! mouseIsOver
                if( self.textOptions['mouseIsOver'] ){
                    // set style
                    self.textOptions['phaserObject'].setStyle( self.textOptions['style'] );
                    // remember mouseIsOver
                    self.textOptions['mouseIsOver'] = false;
                }
                // done ! mouseIsOver
                
            }
            // done mouse is over item

        // DONE FUNCTION: update( integer mouseLeft, integer: mouseTop ) void
        };
        self.layoutChange = function( width, top ) {
        // FUNCTION: layoutChange( integer: width, integer: top ) void
        
        
            // is set marginTop
            if( self.itemOptions['marginTop'] !== undefined ){
                // add marginTop to top
                top += self.itemOptions['marginTop'];
            }
            else {
                // add marginTop to top
                top += self.textOptions['marginTop'];
            }
            // done is set marginTop

            // set text top
            self.textOptions['phaserObject'].y = top;
            
            // create left
            var left = 0;
            
            // align exists and is center
            if( self.itemOptions['align'] !== undefined && self.itemOptions['align'] === 'center' ){
                // calculate left
                left = width / 2;
            }
            else {
                // is set marginLeft
                if( self.itemOptions['marginLeft'] !== undefined ){
                    // add marginLeft to left
                    left += self.itemOptions['marginLeft'];
                }
                else {
                    // add marginLeft to left
                    left += self.textOptions['marginLeft'];
                }
                // done is set marginLeft
            }
                
            // set text left
            self.textOptions['phaserObject'].x = left;

            // create wordwrap
            var wordwrap = true;
            
            // wordwrap exists && ! wordwrap
            if( self.itemOptions['wordwrap'] !== undefined && self.itemOptions['wordwrap'] === false ){
                // set wordwrap
                self.textOptions['phaserObject'].wordWrap = false;
                // set wordwrap
                wordwrap = false;
            }
            // done wordwrap exists && ! wordwrap

            // wordwrap
            if( wordwrap ){
                // set wordwrap
                self.textOptions['phaserObject'].wordWrap = true;
                
                // calculate wordWrap width
                var wordWrapWidth = width;
                // subtract left
                wordWrapWidth -= left;
                // subtract marginRight
                wordWrapWidth -= self.textOptions['marginRight'];
                // set text wordwrap width
                self.textOptions['phaserObject'].wordWrapWidth = wordWrapWidth;
            }
            // done wordwrap 
            
        // DONE FUNCTION: layoutChange( integer: width, integer: top ) void
        };
        self.click = function( mouseLeft, mouseTop ){
        // FUNCTION: click( integer mouseLeft, integer: mouseTop ) void

            // mouse is over item
            if( mouseLeft > self.textOptions['phaserObject'].x &&
                mouseLeft < self.textOptions['phaserObject'].x + self.textOptions['phaserObject'].width &&
                mouseTop > self.textOptions['phaserObject'].y && 
                mouseTop < self.textOptions['phaserObject'].y + self.textOptions['phaserObject'].height ){

                self.debug( 'link' + self.itemOptions['link'] );
                // link exists
                if( self.itemOptions['link'] !== undefined ){
                    // open link
                    window.open( self.textOptions['link'], '_blank' );
                }
                // done link exists
            }
            // done mouse is over item

        // DONE FUNCTION: click( integer mouseLeft, integer: mouseTop ) void
        };
        self.getHeight = function( ){
        // FUNCTION: getHeight( void ) integer: height
        
            // calculate height
            var height = 0;
            // is set marginTop
            if( self.itemOptions['marginTop'] !== undefined ){
                // add marginTop to height
                height += self.itemOptions['marginTop'];
            }
            else {
                // add marginTop to height
                height += self.textOptions['marginTop'];
            }
            // done is set marginTop

            // add text height
            height += self.textOptions['phaserObject'].height;
            
            // return height
            return height;
            
        // DONE FUNCTION: getHeight( void ) integer: height
        };
        self.destruct = function(  ){
        // FUNCTION: destruct( void ) void

            // destroy phaser object
            self.textOptions['phaserObject'].destroy(); 
            // unset phaser object
            self.textOptions['phaserObject'] = null; 
            
            // unset game
            self.game = null;
            
            // unset listOptions
            self.listOptions = null;
            
            // unset itemOptions
            self.itemOptions = null;
              
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
            // function update( integer mouseLeft, integer: mouseTop ) void
            update: function( mouseLeft, mouseTop ){
                // call internal
                self.update( mouseLeft, mouseTop );
            },
            // function layoutChange( integer: width, integer: top ) void
            layoutChange: function( width, top ){
                // call internal
                self.layoutChange( width, top );
            },
            // function click( integer mouseLeft, integer: mouseTop ) void
            click: function( mouseLeft, mouseTop ){
                // call internal
                self.click( mouseLeft, mouseTop );
            },
            // function getHeight( void ) integer: height
            getHeight: function( ){
                // call internal
                return self.getHeight( );
            },
            // function destruct( void ) void
            destruct: function( ){
                // call internal
                self.destruct( );
            }
        };
        // DONE PUBLIC
    };
    // DONE MODULE: listItemLinkModule( Phaser.Game, module: audio, Phaser.group: contentGroup, json: itemOptions ) void
})( alienInvasion );
// done create module function
