/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\common\listItemImageModule.js
 * 
 *  Last Revision:  20-03-2018
 *  
 *  Purpose:  
 *      creates an image item for the list
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: listItemImageModule( Phaser.Game, module: audio, json: listOptions, json: itemOptions ) void
    
    alienInvasion.listItemImageModule = function( game, audio, listOptions, itemOptions ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'listItemImageModule';                            // string: module
        self.debugOn = false;                                           // boolean
        self.imageUrl = alienInvasion.config['imageUrl'];               // string
        self.game = game;                                               // Phaser.Game
        self.audio = audio;                                             // module
        self.listOptions = listOptions;                                 // json: listOptions
        self.itemOptions = itemOptions;                                 // json: itemOptions
        self.imageOptions = {                                           // json: imageOptions                        
                "marginTop"         :   10,                             // integer: marginTop
                "marginLeft"        :   60,                             // integer: marginLeft
                "assetId"           :   "",                             // string: assetId
                "type"              :   "image",                        // string: type
                "fileName"          :   "",                             // string: fileName
                "imageWidth"        :   100,                            // integer: imageWidth
                "imageHeight"       :   100,                            // integer: imageHeight
                "phaserObject"      :   null,                           // Phaser.sprite: phaserObject        
        };                                                              // done json: imageOptions
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
            
            // set assetId
            self.imageOptions['assetId'] = self.itemOptions['id'];
            // set fileName
            self.imageOptions['fileName'] = self.imageUrl + self.itemOptions['fileName'];
            
            // width exists
            if( self.itemOptions['width'] !== undefined ){
                // set imageWidth
                self.imageOptions['imageWidth'] = self.itemOptions['width'];
            }
            // done width exists
            
            // height exists
            if( self.itemOptions['height'] !== undefined ){
                // set imageWidth
                self.imageOptions['imageHeight'] = self.itemOptions['height'];
            }
            // done width exists
            
            // load asset
            alienInvasion.loadAsset( self.imageOptions );             
            
        // DONE FUNCTION: preload( void ) void
        };
        self.create = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'create' );
            
            // create sprite
            self.imageOptions['phaserObject'] = self.game.add.sprite( -100, -100, self.imageOptions['assetId'] );   
            // set image width
            self.imageOptions['phaserObject'].width = self.imageOptions['imageWidth'];
            // set image height
            self.imageOptions['phaserObject'].height = self.imageOptions['imageHeight'];
            // add sprite to group
            self.listOptions['contentGroup'].add( self.imageOptions['phaserObject'] );
            
        // DONE FUNCTION: create( void ) void
        };
        self.update = function( mouseLeft, mouseTop ){
        // FUNCTION: update( integer mouseLeft, integer: mouseTop ) void

            // debug info
            //self.debug( 'update mouseLeft: ' + mouseLeft + ' mouseTop: ' +mouseTop );

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
                top += self.imageOptions['marginTop'];
            }
            // done is set marginTop
            
            // set image top
            self.imageOptions['phaserObject'].y = top;

            // create left
            var left = 0;
            
            // align exists and is center
            if( self.itemOptions['align'] !== undefined && self.itemOptions['align'] === 'center' ){
                // set anchor
                self.imageOptions['phaserObject'].anchor.set( 0.5, 0 );
                // calculate left
                left = width / 2;
            }
            else {
                // set anchor
                self.imageOptions['phaserObject'].anchor.set( 0, 0 );
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
            // done is set marginLeft

            // set text left
            self.imageOptions['phaserObject'].x = left;
            
            
        // DONE FUNCTION: layoutChange( integer: width, integer: top ) void
        };
        self.click = function( mouseLeft, mouseTop ){
        // FUNCTION: click( integer mouseLeft, integer: mouseTop ) void


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
                height += self.imageOptions['marginTop'];
            }
            // done is set marginTop

            // add text height
            height += self.imageOptions['phaserObject'].height;
            
            // return height
            return height;
            
        // DONE FUNCTION: getHeight( void ) integer: height
        };
        self.destruct = function(  ){
        // FUNCTION: destruct( void ) void
                    
            // destroy levels image
            alienInvasion.destroyAsset( self.imageOptions ); 

            // destroy phaser object
            self.imageOptions['phaserObject'].destroy(); 
            // unset phaser object
            self.imageOptions['phaserObject'] = null; 
            
            // unset itemOptions
            self.itemOptions = null;
              
            // unset listOptions
            self.listOptions = null;
            
                
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
    // DONE MODULE: listItemImageModule( Phaser.Game, module: audio, json: listOptions, json: itemOptions ) void
})( alienInvasion );
// done create module function
