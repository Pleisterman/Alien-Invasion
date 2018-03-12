/* 
 *  Package: Pleisterman\Alien-Invasion 
 *  
 *  File: /js/game/assetsLoaderModule.js
 * 
 *  Last Revision:  09-03-2018
 * 
 *  Purpose:  
 *      handles loading and destroying Phaser assets; images, spritesheets, sounds, etc...
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: assetsLoaderModule( Phaser.game: game ) void
    
    alienInvasion.assetsLoaderModule = function( game ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object: self
        self.MODULE = 'assetsLoaderModule';                             // string: module
        self.debugOn = false;                                            // boolean: debugOn
        self.game = game;                                               // Phaser.game: game
        self.assets = [];                                               // json: assets    
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add the extensions to alienInvasion
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void
            
            // add loadAsset function to application
            alienInvasion.loadAsset = self.loadAsset;
            // add destroyAsset function to application
            alienInvasion.destroyAsset = self.destroyAsset;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.loadAsset = function( options ){
        // FUNCTION: loadAsset( json: options ) void

            // asset ! valid
            if( !self.assetIsValid( options ) ){
                // done with error
                return;
            }
            // done asset ! valid
            
            // switch: type
            switch( options['type'] ){
                // case: spritesheet
                case 'spritesheet' :  {
                    // load spritesheet
                    self.loadSpritesheet( options );
                    // done
                    break;   
                }
                // case: image
                case 'image' :  {
                    // load image
                    self.loadImage( options );
                    // done
                    break;   
                }
                // case: default
                default : {
                    // debug info    
                    self.debug( 'unknown asset type, assetId: ' + options['assetId'] + ' type: ' + options['type'] );
                }
            }
            // done switch: type
            
        // DONE FUNCTION: loadAsset( json: options ) void
        };
        self.assetIsValid = function( options ){
        // FUNCTION: assetIsValid( json: options ) void
            
            // loop over assets
            for( var i = 0; i < self.assets.length; i++ ){
                // same id
                if( self.assets[i]['assetId'] === options['assetId'] &&
                    self.assets[i]['type'] === options['type'] ){
                    // debug info
                    self.debug( 'loading asset id exists id: ' + options['assetId'] + ' type: ' + options['type'] );
                    // done with error
                    return false;                    
                }
                // same id
            }
            // done loop over assets

            // done
            return true;
            
        // DONE FUNCTION: assetIsValid( json: options ) void
        };
        self.destroyAsset = function( options ){
        // FUNCTION: destroyAsset( json: options ) void

            // asset found
            var assetFound = false;
            
            // loop over assets
            for( var i = 0; i < self.assets.length && !assetFound; i++ ){
                // same id and type
                if( self.assets[i]['assetId'] === options['assetId'] &&
                    self.assets[i]['type'] === options['type'] ){
                    // remember asset found
                    assetFound = true;
                    // remove asset from cache  
                    self.removeAssetFromCache( options['assetId'], options['type'] );
                    // remove entry from assets
                    self.assets.splice( i, 1 );
                    // debug info
                    self.debug( 'destroyed asset id: ' + options['assetId'] + ' type: ' + options['type'] );
                }
                // same id and type
            }
            // done loop over assets

            // !assetFound
            if( !assetFound ){
                // debug info
                self.debug( 'destroying asset id does not exists id: ' + options['assetId'] + ' type: ' + options['type'] );
                // done with error
                return false;                    
            }
            // done !assetFound
            
        // DONE FUNCTION: destroyAsset( json: options ) void
        };
        self.removeAssetFromCache = function( assetId, type ){
        // FUNCTION: removeAssetFromCache( string: assetId, string: type ) void

            // switch: type
            switch( type ){
                // case: spritesheet
                case 'spritesheet' :  {
                    // remove spritesheet
                    self.game.cache.removeImage( assetId );
                    // done
                    break;   
                }
                // case: image
                case 'image' :  {
                    // remove image
                    self.game.cache.removeImage( assetId );
                    // done
                    break;   
                }
                // case: default
                default : {
                    // debug info    
                    self.debug( 'removeAssetFromCache unknown asset type, assetId: ' + assetId + ' type: ' + type );
                }
            }
            // done switch: type
            

        // DONE FUNCTION: removeAssetFromCache( string: assetId, string: type ) void
        };
        self.loadSpritesheet = function( options ){
        // FUNCTION: loadSpritesheet( json: options ) void
            
            // debug info
            self.debug( 'loadSpritesheet: ' + options['assetId'] );
            
            // load sprite sheet
            self.game.load.spritesheet( options['assetId'], 
                                        options['fileName'], 
                                        options['imageWidth'], 
                                        options['imageHeight'] );
            
            // remember loaded asset
            self.assets.push( options );
            
        // DONE FUNCTION: loadSpritesheet( json: options ) void
        };
        self.loadImage = function( options ){
        // FUNCTION: loadImage( json: options ) void
            
            // debug info
            self.debug( 'loadImage: ' + options['assetId'] );
            
            // load image
            self.game.load.image( options['assetId'], 
                                  options['fileName'] );
            
            // remember loaded asset
            self.assets.push( options );
            
        // DONE FUNCTION: loadImage( json: options ) void
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
    // DONE MODULE: assetsLoaderModule( Phaser.game: game ) void
})( alienInvasion );
// done create module function
