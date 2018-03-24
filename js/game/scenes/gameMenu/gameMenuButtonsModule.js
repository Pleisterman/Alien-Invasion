/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\gameMenu\gameMenuButtonsModule.js
 * 
 *  Last Revision:  10-03-2018
 * 
 *  Purpose:  
 *      handles the buttons for the scene: gameMenu
 *      
*/

// create module function
( function( alienInvasion ){

    // MODULE: gameMenuButtonsModule( Phaser.game: game, module: audio ) void
    
    alienInvasion.gameMenuButtonsModule = function( game, audio ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'gameMenuButtonsModule';                          // string
        self.debugOn = true;                                            // boolean
        self.imageUrl = alienInvasion.config['imageUrl'];               // url
        self.game = game;                                               // Phaser.Game
        self.audio = audio;                                             // module
        self.buttonAssetOptions = {                                     // json: buttonAssetOptions    
            "assetId"           :   "gameMenuButton", 
            "type"              :   "spritesheet",
            "fileName"          :   self.imageUrl + "gameMenuButton.png",
            "imageWidth"        :   400,
            "imageHeight"       :   40
        };
        self.buttonOptions = {                                          // json: buttonOptions    
            'marginTop'             :   80,                             // integer: px                                         
            'marginBottom'          :   30,                             // integer: px                                       
            'marginLeft'            :   80,                             // integer: px                                         
            'marginRight'           :   80,                             // integer: px                                       
            'verticalSpacing'       :   13,                             // integer: px                                               
            'horizontalSpacing'     :   30,                             // integer: px                                               
            'maximumWidth'          :   400,                            // integer: px height
            'height'                :   38,                             // integer: px height
            'group'                 :   null,                           // phaser.Group
            'style'                 :   {
                font: alienInvasion.config['fontSize'] + "px " + alienInvasion.config['font'], 
                fill: "#fff", 
                align: "center"
            }
        };                                                              // done json: buttonOptions
        self.buttons = [                                                // json: buttons
            {
                'id'                :   'options',
                'assetId'           :   'gameMenuButton',
                'phaserObject'      :   null,
                'phaserTextObject'  :   null,
                'translation'       :   alienInvasion.translations['options'],
                'sceneId'           :   'options'
            },
            {
                'id'                :   'highScores',
                'assetId'           :   'gameMenuButton',
                'phaserObject'      :   null,
                'phaserTextObject'  :   null,
                'translation'       :   alienInvasion.translations['highScores'],
                'sceneId'           :   'highScores'
            },
            {
                'id'                :   'about',
                'assetId'           :   'gameMenuButton',
                'phaserObject'      :   null,
                'phaserTextObject'  :   null,
                'translation'       :   alienInvasion.translations['about'],
                'sceneId'           :   'about'
            }
        ];                                                              // done json: buttons                                          
        self.changeOrientationMessage = {                               // json: changeOrientationMessage
            'phaserObject'      :   null,
            'translation'       :   alienInvasion.translations['changeOrientationMessageMenu'],                
            'style'             :   {
                font: alienInvasion.config['fontSize'] + "px " + alienInvasion.config['font'], 
                fill: "#fff", 
                align: "center"
            }
        };
        self.selectedButtonIndex = 0;                                   // integer
        self.mouseOverAudioEffectId = 'menuButtonOver';                 // string
        self.selectAudioEffectId = 'menuButtonSelect';                  // string
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
            
            // subscribe to game layoutChange
            jsProject.subscribeToEvent( 'gameLayoutChange', self.layoutChange );

            // subscribe to keyboardInputChar
            jsProject.subscribeToEvent( 'keyboardInputChar', self.keyboardInputChar );
            
            // subscribe to keyboardArrow
            jsProject.subscribeToEvent( 'keyboardArrow', self.keyboardArrow );
            
        // DONE FUNCTION: addEventSubscriptions( void ) void
        };
        self.removeEventSubscriptions = function(){
        // FUNCTION: removeEventSubscriptions( void ) void
            
            // remove game layoutChange
            jsProject.unSubscribeFromEvent( 'gameLayoutChange', self.layoutChange );

            // remove keyboardInputChar
            jsProject.unSubscribeFromEvent( 'keyboardInputChar', self.keyboardInputChar );

            // remove keyboardArrow
            jsProject.unSubscribeFromEvent( 'keyboardArrow', self.keyboardArrow );
            
        // DONE FUNCTION: removeEventSubscriptions( void ) void
        };
        self.preload = function() {
        // FUNCTION: preload( void ) void

            // load asset
            alienInvasion.loadAsset( self.buttonAssetOptions ); 
                
        // DONE FUNCTION: preload( void ) void
        };
        self.create = function( ){
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
            self.buttonOptions['group'] = self.game.add.group( );            
            
            // loop over buttons
            for( var i = 0; i < self.buttons.length; i++ ){
                // create sprite
                self.buttons[i]['phaserObject'] = self.game.add.sprite( -100, -100, self.buttons[i]['assetId'] );   
                // add sprite to group
                self.buttonOptions['group'].add( self.buttons[i]['phaserObject'] );
                
                // enable events
                self.buttons[i]['phaserObject'].inputEnabled = true;
                // use hand cursor
                self.buttons[i]['phaserObject'].input.useHandCursor = true;      
                
                // selected button
                if( i === self.selectedButtonIndex ){
                    // set frame mouse over
                    self.buttons[i]['phaserObject'].frame = 2;
                }
                // selected button
                
                // set over event
                self.buttons[i]['phaserObject'].events.onInputOver.add( self.inputOver, self );
                // set out event
                self.buttons[i]['phaserObject'].events.onInputOut.add( self.inputOut, self );
                
                // set data
                self.buttons[i]['phaserObject']['data']['index'] = i;  
                // add event handler
                self.buttons[i]['phaserObject'].events.onInputDown.add( function( sprite ){ self.click( sprite ); });
                // set button height
                self.buttons[i]['phaserObject'].height = self.buttonOptions['height'];
                
                // get text
                var text = self.buttons[i]['translation'];
                                
                // add button text
                self.buttons[i]['phaserTextObject'] = self.game.add.text( -100, -100, text, self.buttonOptions['style'] );
                // add text to group
                self.buttonOptions['group'].add( self.buttons[i]['phaserTextObject'] );
                // set anchor
                self.buttons[i]['phaserTextObject'].anchor.set( 0.5, 0.4 );
                
            }
            // done loop over buttons
            
            // adjust layout
            self.layoutChange( );
            
            // event subscription
            self.addEventSubscriptions();

        // DONE FUNCTION: create( void ) void
        };
        self.inputOver = function( button ){
        // FUNCTION: inputOver( phaserObject: button ) void
        
            // debug info
            self.debug( 'over' );
            
            // get index
            var buttonIndex = button.data['index'];
            
            // not selected button
            if( buttonIndex !== self.selectedButtonIndex ){
                // set frame mouse over
                self.buttons[buttonIndex]['phaserObject'].frame = 1;
                // play menu audio effect
                self.audio.playEffect( self.mouseOverAudioEffectId );
            }
            // not selected button
                
        // DONE FUNCTION: inputOver( void ) void
        };
        self.inputOut = function( button ){
        // FUNCTION: inputOut( phaserObject: button ) void
        
            // debug info
            self.debug( 'out' );
            
            // get index
            var buttonIndex = button.data['index'];
            
            // not selected button
            if( buttonIndex !== self.selectedButtonIndex ){
                // set frame mouse out
                self.buttons[buttonIndex]['phaserObject'].frame = 0;
            }
            // not selected button
            
        // DONE FUNCTION: inputOut( void ) void
        };
        self.click = function( sprite ) {
        // FUNCTION: click( phaser.Sprite: sprite ) void
                        
            // debug info
            self.debug( 'click index: ' + sprite.data.index );
            
            // play menu audio effect
            self.audio.playEffect( self.selectAudioEffectId );
            
            // set frame mouse out
            self.buttons[self.selectedButtonIndex]['phaserObject'].frame = 0;
            
            //  remember selection
            self.selectedButtonIndex = sprite.data.index;
            
            // set frame selected
            self.buttons[self.selectedButtonIndex]['phaserObject'].frame = 2;
                
            // start scene
            self.game.state.start( self.buttons[sprite.data.index]['sceneId'] );
            
        // DONE FUNCTION: click( phaser.Sprite: sprite ) void
        };
        self.update = function( ){
        // FUNCTION: update( void ) void
             
        // DONE FUNCTION: update( void ) void
        };
        self.layoutChange = function( ) {
        // FUNCTION: layoutChange( void ) void

            // set alpha
            self.buttonOptions['group'].alpha = 0;
            
            // is landscape and mobile / else
            if( window.innerWidth > window.innerHeight && alienInvasion.isMobile ){
                // show change orientation message
                self.showChangeOrientationMessage();
            }
            else {
                // show 
                self.show();
            }
            // is landscape and mobile/ else
                        
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.show = function( ){
        // FUNCTION: show( void ) void

            // calculate available height
            var availableHeight = self.game.world.height;
            // subtract titel
            availableHeight -= self.buttonOptions['marginTop'];
            // subtract bottom bar
            availableHeight -= self.buttonOptions['marginBottom'];
            
            // calculate total buttons height
            var totalButtonsHeight = self.buttons.length * self.buttonOptions['height'];
            // add vertical spacing
            totalButtonsHeight += self.buttons.length * self.buttonOptions['verticalSpacing'];
            // claculate vertical mergin
            var verticalMargin = ( availableHeight - totalButtonsHeight ) / 2; 
            
            // calculate top
            var buttonTop = self.buttonOptions['marginTop'];
            // add vertical margin
            buttonTop += verticalMargin;

            // calculate maximum width
            var maximumWidth = self.game.world.width;
            // subtract margin left
            maximumWidth -= self.buttonOptions['marginLeft'];
            // subtract margin right
            maximumWidth -= self.buttonOptions['marginRight'];
            // calculate button width
            var buttonWidth = Math.min( maximumWidth, self.buttonOptions['maximumWidth'] );
            
            // calculate button left
            var buttonLeft = ( self.game.world.width - buttonWidth ) / 2;
            // calculate text left
            var textLeft = Math.floor( buttonLeft + ( buttonWidth / 2 ) );
            // calculate text top
            var textTop = Math.floor( buttonTop + ( self.buttonOptions['height'] / 2 ) );
            
            // loop over buttons
            for( var i = 0; i < self.buttons.length; i++ ){
                
                // set button width
                self.buttons[i]['phaserObject'].width = buttonWidth;
                
                // set button left
                self.buttons[i]['phaserObject'].x = buttonLeft;
                // set button top
                self.buttons[i]['phaserObject'].y = buttonTop;
                
                // set text left
                self.buttons[i]['phaserTextObject'].x = textLeft;
                // set text top                
                self.buttons[i]['phaserTextObject'].y = textTop;
                
                // add button height        
                buttonTop += self.buttonOptions['height'];
                // add button spacing        
                buttonTop += self.buttonOptions['verticalSpacing'];
                // add button height        
                textTop += self.buttonOptions['height'];
                // add button spacing        
                textTop += self.buttonOptions['verticalSpacing'];
            }
            // done loop over buttons
            
            // is mobile
            if( alienInvasion.isMobile ){
                // hide orientation change message
                self.changeOrientationMessage['phaserObject'].alpha = 0;
                // add tween
                self.game.add.tween( self.changeOrientationMessage['phaserObject'] ).to( { alpha: 0 }, 
                                     alienInvasion.config['sceneShowTransitionPeriod'], 
                                     Phaser.Easing.Linear.In, 
                                     true );
            }
            // is mobile
            
            // add tween
            self.game.add.tween( self.buttonOptions['group'] ).to( { alpha: 1 }, 
                                 alienInvasion.config['sceneShowTransitionPeriod'], 
                                 Phaser.Easing.Linear.In, 
                                 true );
                                     
        // DONE FUNCTION: show( void ) void
        };
        self.showChangeOrientationMessage = function( ){
        // FUNCTION: showChangeOrientationMessage( void ) void
        
            // hide buttons
            self.buttonOptions['group'].alpha = 0;
            
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
            self.game.add.tween( self.buttonOptions['group'] ).to( { alpha: 0 }, 
                                 alienInvasion.config['sceneShowTransitionPeriod'], 
                                 Phaser.Easing.Linear.In, 
                                 true );
                                     
            
        // DONE FUNCTION: showChangeOrientationMessage( void ) void
        };
        self.keyboardInputChar = function( char ){
        // FUNCTION: keyboardInputChar( char: char ) void
            
            // spacebar pressed
            if( char === ' ' ){
                
                // play menu audio effect
                self.audio.playEffect( self.selectAudioEffectId );
                // start scene
                self.game.state.start( self.buttons[self.selectedButtonIndex]['sceneId'] );
                
            }
            // spacebar pressed
        
        // DONE FUNCTION: keyboardInputChar( char: char ) void
        };
        self.keyboardArrow = function( direction ){
        // FUNCTION: keyboardArrow( string: direction ) void

            // direction is up
            if( direction === 'up' ){
                
                // selection index > 0
                if( self.selectedButtonIndex > 0 ){
                    // set frame mouse out
                    self.buttons[self.selectedButtonIndex]['phaserObject'].frame = 0;
                    // set selection
                    self.selectedButtonIndex--;
                    // set frame selected
                    self.buttons[self.selectedButtonIndex]['phaserObject'].frame = 2;
                    // play menu audio effect
                    self.audio.playEffect( self.selectAudioEffectId );
                }
                // done selection index > 0
                
            }
            // done direction is up
        
            // direction is down
            if( direction === 'down' ){
                
                // selection index > 0
                if( self.selectedButtonIndex < self.buttons.length - 1 ){
                    // set frame mouse out
                    self.buttons[self.selectedButtonIndex]['phaserObject'].frame = 0;
                    // set selection
                    self.selectedButtonIndex++;
                    // set frame selected
                    self.buttons[self.selectedButtonIndex]['phaserObject'].frame = 2;
                    // play menu audio effect
                    self.audio.playEffect( self.selectAudioEffectId );
                }
                // done selection index > 0
                
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

            // destroy sprites
            self.buttonOptions['group'].removeAll( true );
            // destroy group
            self.buttonOptions['group'].destroy();
            // unset group
            self.buttonOptions['group'] = null;
                
            // is mobile
            if( alienInvasion.isMobile ){
                // destroy change orientation message
                self.changeOrientationMessage['phaserObject'].destroy( );
                // unset change orientation message
                self.changeOrientationMessage['phaserObject'] = null;
            }
            // is mobile
            
            // destroy asset
            alienInvasion.destroyAsset( self.buttonAssetOptions ); 
            
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
    // DONE MODULE: gameMenuButtonsModule( Phaser.game: game, module: audio ) void
})( alienInvasion );
// done create module function
