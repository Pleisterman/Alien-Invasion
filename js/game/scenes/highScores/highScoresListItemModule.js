/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \js\game\scenes\highScores\highScoresListItemModule.js
 * 
 *  Last Revision:  20-03-2018
 * 
 *  Purpose:  
 *      creates the items of the highScores list
 * 
 * 
*/

// create module function
( function( alienInvasion ){

    // MODULE: highScoresListItemModule( Phaser.game: game, integer: missionIndex, phaser.group: contentGroup ) void
    
    alienInvasion.highScoresListItemModule = function( game, missionIndex, contentGroup ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'highScoresListItemModule';                       // string
        self.debugOn = false;                                           // boolean
        self.imageUrl = alienInvasion.config['imageUrl'];               // url
        self.game = game;                                               // Phaser.Game
        self.missionIndex = missionIndex;                               // integer
        self.contentGroup = contentGroup;                               // phaser.Group
        self.itemOptions = {                                            // json: itemOptions
            'missionTitle'      :   {                                   // json: missionTitle
                'phaserObject'  :   null,                               // Phaser.Text
                'marginTop'     :   10,                                 // integer: px
                'marginBottom'  :   40,                                 // integer: px
                'marginLeft'    :   40,                                 // integer: px
                'marginRight'   :   40,                                 // integer: px
                'style'         :   {                                   // json: style
                    font: parseInt( alienInvasion.config['fontSize'] ) + 6 + "px " + alienInvasion.config['font'], 
                    fill: "#aaaa00", 
                    strokeThickness: 1.4,
                    stroke: "#000000",
                    align: "center"
                }                                                       // done json: style
            },                                                          // done json: missionTitle
            'scores'      :     {                                       // json: scores
                'name'          :   {                                   // json: name
                    'phaserObjects' :   [],                             // json [phaser.Text,..]
                    'marginLeft'    :   30,                             // float: percentage of list width
                    'style'         :   {                               // json: style
                        font: parseInt( alienInvasion.config['fontSize'] ) + 2 + "px " + alienInvasion.config['font'], 
                        fill: "#00dddd", 
                        strokeThickness: 1,
                        stroke: "#000000",
                        align: "left"
                    }
                },                                                      // done json: style
                'difficulty'          :   {                             // json: difficulty
                    'phaserObjects' :   [],                             // json [phaser.Sprite,..]
                    'marginLeft'    :   35,                             // float: percentage of list width
                },                                                      // done json: difficulty
                'level'          :   {                                  // json: level
                    'phaserObjects' :   [],                             // json [phaser.Sprite,..]
                    'marginLeft'    :   47,                             // float: percentage of list width
                    'style'         :   {                               // json: style
                        font: parseInt( alienInvasion.config['fontSize'] ) + 2 + "px " + alienInvasion.config['font'], 
                        fill: "#00dddd", 
                        strokeThickness: 1,
                        stroke: "#000000",
                        align: "left"
                    }                                                   // done json: style
                },                                                      // done json: difficulty
                'score'          :   {                                  // json: score
                    'phaserObjects' :   [],                             // json [phaser.text,..]: phaserObjects
                    'padLength'     :   7,                              // integer padLength
                    'marginLeft'    :   65,                             // float: percentage of list width
                    'style'         :   {                               // json: style
                        font: parseInt( alienInvasion.config['fontSize'] ) + 2 + "px " + alienInvasion.config['font'], 
                        fill: "#aaaa00", 
                        strokeThickness: 1,
                        stroke: "#000000",
                        align: "left"
                    }                                                   // done json: style
                },                                                      // done json: score
                'marginTop'     :   30,                                 // integer: px
            },                                                          // done json: scores
            'verticalSpacing'       :   80,                             // integer: px
        };                                                              // done json: itemOptions
        self.difficultyImages = [                                       // json: difficultyImages
            {                                                           //          
                'assetId'           :   'difficultyLevel1'              // string
            },                                                          //               
            {                                                           //              
                'assetId'           :   'difficultyLevel2'              // string
            },                                                          //              
            {                                                           //        
                'assetId'           :   'difficultyLevel3'              // string
            }                                                           //   
        ];                                                              // done json: difficultyImages                
        // DONE MEMBERS
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add mission title
            self.addMissionTitle();

            // add score names
            self.addScoreNames();

            // add score difficulties
            self.addScoreDifficulties();
            
            // add score levels
            self.addScoreLevels();
            
            // add score scores
            self.addScoreScores();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addMissionTitle = function() {
        // FUNCTION: addMissionTitle( void ) void
            
            // create text
            var text = alienInvasion.translations['mission'];
            // add separator
            text += ':  ';
            // add mission title
            text += alienInvasion.missions[self.missionIndex]['mission']['title'];
            
            // create text
            self.itemOptions['missionTitle']['phaserObject'] = self.game.add.text( 0, 0, text, self.itemOptions['missionTitle']['style'], self.contentGroup );
            // set anchor
            self.itemOptions['missionTitle']['phaserObject'].anchor.set( 0.5, 0 );
            
        // DONE FUNCTION: addMissionTitle( void ) void
        };
        self.addScoreNames = function() {
        // FUNCTION: addScoreNames( void ) void
            
            // get scores
            var highScores = alienInvasion.missions[self.missionIndex]['highScores'];
            
            // loop over scores
            for( var i = 0; i < highScores.length; i++ ){
                // create text
                var text = highScores[i]['name'];
                
                // create score
                var name = self.game.add.text( 0, 0, text, self.itemOptions['scores']['name']['style'], self.contentGroup );
                // add score to scores
                self.itemOptions['scores']['name']['phaserObjects'].push( name );
            }
            // done loop over scores
            
        // DONE FUNCTION: addScoreNames( void ) void
        };
        self.addScoreDifficulties = function() {
        // FUNCTION: addScoreDifficulties( void ) void
            
            // get scores
            var highScores = alienInvasion.missions[self.missionIndex]['highScores'];
            
            // loop over scores
            for( var i = 0; i < highScores.length; i++ ){
                
                var difficultyAssetId = self.difficultyImages[highScores[i]['difficulty']]['assetId'];
                // create difficulty
                var difficulty = self.game.add.sprite( 0, 0, difficultyAssetId ); 
                // add sprite to group
                self.contentGroup.add( difficulty );
                // add score to scores
                self.itemOptions['scores']['difficulty']['phaserObjects'].push( difficulty );
            }
            // done loop over scores
            
        // DONE FUNCTION: addScoreDifficulties( void ) void
        };
        self.addScoreLevels = function() {
        // FUNCTION: addScoreNames( void ) void
            
            // get scores
            var highScores = alienInvasion.missions[self.missionIndex]['highScores'];
            
            // loop over scores
            for( var i = 0; i < highScores.length; i++ ){
                // create text
                var text = alienInvasion.translations['level'] + ':  ' + highScores[i]['level'];
                
                // create level text
                var level = self.game.add.text( 0, 0, text, self.itemOptions['scores']['level']['style'], self.contentGroup );
                // add text to score levels
                self.itemOptions['scores']['level']['phaserObjects'].push( level );
            }
            // done loop over scores
            
        // DONE FUNCTION: addScoreNames( void ) void
        };
        self.addScoreScores = function() {
        // FUNCTION: addScoreScores( void ) void
            
            // get scores
            var highScores = alienInvasion.missions[self.missionIndex]['highScores'];
            
            // loop over scores
            for( var i = 0; i < highScores.length; i++ ){
                // create text
                var text = jsProject.pad( highScores[i]['score'], '0', self.itemOptions['scores']['score']['padLength'] );
                
                // create score
                var score = self.game.add.text( 0, 0, text, self.itemOptions['scores']['score']['style'], self.contentGroup );
                // add score to scores
                self.itemOptions['scores']['score']['phaserObjects'].push( score );
            }
            // done loop over scores
            
        // DONE FUNCTION: addScoreScores( void ) void
        };
        self.update = function( ){
        // FUNCTION: update( void ) void
                        
        // DONE FUNCTION: update( void ) void
        };
        self.layoutChange = function( width, top ) {
        // FUNCTION: layoutChange( integer: width, integer: top ) void
        
            // adjust mission title
            top = self.adjustMissionTitle( width, top );

            // adjust mission score names
            self.adjustMissionScoreNames( width, top );

            // adjust mission score difficulties
            self.adjustMissionScoreDifficulties( width, top );

            // adjust mission score levels
            self.adjustMissionScoreLevels( width, top );
            
            // adjust mission score scores
            self.adjustMissionScoreScores( width, top );
            
        // DONE FUNCTION: layoutChange( integer: width, integer: top ) void
        };
        self.adjustMissionTitle = function( width, top ){
        // FUNCTION: adjustMissionTitle( integer: width, integer: top ) integer
            
            // set text top
            self.itemOptions['missionTitle']['phaserObject'].y = top + self.itemOptions['missionTitle']['marginTop'];

            var textWidth = width;
            // subtract marginLeft
            textWidth -= self.itemOptions['missionTitle']['marginLeft'];
            // subtract marginRight
            textWidth -= self.itemOptions['missionTitle']['marginRight'];
            
            // set text left
            self.itemOptions['missionTitle']['phaserObject'].x = textWidth / 2;
            
            // add height to top
            top += self.itemOptions['missionTitle']['phaserObject'].height;
                        
            // add margin bottom
            top += self.itemOptions['missionTitle']['marginBottom'];
            
            // return top
            return top;
            
        // DONE FUNCTION: adjustMissionTitle( integer: width, integer: top ) integer
        };
        self.adjustMissionScoreNames = function( width, top ){
        // FUNCTION: adjustMissionScoreNames( integer: width, integer: top ) void
            
            var maximumItemWidth = 0;
            // loop over scores
            for( var i = 0; i < self.itemOptions['scores']['name']['phaserObjects'].length; i++ ){
            
                maximumItemWidth = Math.max( self.itemOptions['scores']['name']['phaserObjects'][i].width, maximumItemWidth );
            }
            // done loop over scores

            // loop over scores
            for( var i = 0; i < self.itemOptions['scores']['name']['phaserObjects'].length; i++ ){
                
                // add marginTop to top
                top += self.itemOptions['scores']['marginTop'];
                // set text top
                self.itemOptions['scores']['name']['phaserObjects'][i].y = top;
                // add height to top
                top += self.itemOptions['scores']['name']['phaserObjects'][i].height;
                
                // calculate left
                var left = ( width / 100 ) * self.itemOptions['scores']['name']['marginLeft'];
                // subtract maximum ItemWidth
                left -= maximumItemWidth;
                
                // set text left
                self.itemOptions['scores']['name']['phaserObjects'][i].x = left;
                
            }
            // done loop over scores
            
        // DONE FUNCTION: adjustMissionScoreNames( integer: width, integer: top ) void
        };
        self.adjustMissionScoreDifficulties = function( width, top ){
        // FUNCTION: adjustMissionScoreDifficulties( integer: width, integer: top ) void
            
            // loop over score difficulties
            for( var i = 0; i < self.itemOptions['scores']['difficulty']['phaserObjects'].length; i++ ){
                
                // add marginTop to top
                top += self.itemOptions['scores']['marginTop'];
                // set text top
                self.itemOptions['scores']['difficulty']['phaserObjects'][i].y = top;
                
                // calculate width factor
                var factor = self.itemOptions['scores']['difficulty']['phaserObjects'][i].width / self.itemOptions['scores']['difficulty']['phaserObjects'][i].height;
                var imageWidth = self.itemOptions['scores']['name']['phaserObjects'][i].height * factor;
                
                // set height
                self.itemOptions['scores']['difficulty']['phaserObjects'][i].height = self.itemOptions['scores']['name']['phaserObjects'][i].height;
                
                self.itemOptions['scores']['difficulty']['phaserObjects'][i].width = imageWidth;
                                
                // calculate left
                var left = ( width / 100 ) * self.itemOptions['scores']['difficulty']['marginLeft'];
                
                // set text left
                self.itemOptions['scores']['difficulty']['phaserObjects'][i].x = left;
                
                // add height to top
                top += self.itemOptions['scores']['name']['phaserObjects'][i].height;                
                
            }
            // done loop over scores
            
        // DONE FUNCTION: adjustMissionScoreDifficulties( integer: width, integer: top ) void
        };
        self.adjustMissionScoreLevels = function( width, top ){
        // FUNCTION: adjustMissionScoreLevels( integer: width, integer: top ) void
            
            // loop over levels
            for( var i = 0; i < self.itemOptions['scores']['level']['phaserObjects'].length; i++ ){
                
                // add marginTop to top
                top += self.itemOptions['scores']['marginTop'];
                // set text top
                self.itemOptions['scores']['level']['phaserObjects'][i].y = top;
                // add height to top
                top += self.itemOptions['scores']['level']['phaserObjects'][i].height;
                
                // calculate left
                var left = ( width / 100 ) * self.itemOptions['scores']['level']['marginLeft'];
                
                // set text left
                self.itemOptions['scores']['level']['phaserObjects'][i].x = left;
                
            }
            // done loop over scores
            
        // DONE FUNCTION: adjustMissionScoreNames( integer: width, integer: top ) void
        };
        self.adjustMissionScoreScores = function( width, top ){
        // FUNCTION: adjustMissionScoreScores( integer: width, integer: top ) void
            
            // loop over scores
            for( var i = 0; i < self.itemOptions['scores']['score']['phaserObjects'].length; i++ ){
                
                // add marginTop to top
                top += self.itemOptions['scores']['marginTop'];
                // set text top
                self.itemOptions['scores']['score']['phaserObjects'][i].y = top;
                // add height to top
                top += self.itemOptions['scores']['score']['phaserObjects'][i].height;
                
                // calculate left
                var left = ( width / 100 ) * self.itemOptions['scores']['score']['marginLeft'];
                // set text left
                self.itemOptions['scores']['score']['phaserObjects'][i].x = left;
                
            }
            // done loop over scores
            
        // DONE FUNCTION: adjustMissionScoreScores( integer: width, integer: top ) void
        };
        self.getHeight = function( ){
        // FUNCTION: getHeight( void ) integer: height
        
            // calculate height
            var height = self.itemOptions['missionTitle']['marginTop'];
            // add title height
            height += self.itemOptions['missionTitle']['phaserObject'].height;  
            // add title marginBottom
            height += self.itemOptions['missionTitle']['marginBottom'];  
            
            // loop over scores
            for( var i = 0; i < self.itemOptions['scores']['name']['phaserObjects'].length; i++ ){
                // add marginTop to top
                height += self.itemOptions['scores']['marginTop'];
                // add height to top
                height += self.itemOptions['scores']['name']['phaserObjects'][i].height;
            }
            // done loop over scores
            
            // return height
            return height;
            
        // DONE FUNCTION: getHeight( void ) integer: height
        };
        self.getVerticalSpacing = function( ){
        // FUNCTION: getVerticalSpacing( void ) integer: height
        
            // return vertical spacing
            return self.itemOptions['verticalSpacing'];
            
        // DONE FUNCTION: getVerticalSpacing( void ) integer: height
        };
        self.refresh = function(  ){
        // FUNCTION: refresh( void ) void
        
            // get scores
            var highScores = alienInvasion.missions[self.missionIndex]['highScores'];
            
            // loop over scores
            for( var i = 0; i < highScores.length; i++ ){
                // create text
                var text = highScores[i]['name'];
                // set name
                self.itemOptions['scores']['name']['phaserObjects'][i].text = text;
                // destroy difficulty image
                self.itemOptions['scores']['difficulty']['phaserObjects'][i].destroy();
                // get asset
                var difficultyAssetId = self.difficultyImages[highScores[i]['difficulty']]['assetId'];
                // create difficulty image
                self.itemOptions['scores']['difficulty']['phaserObjects'][i] = self.game.add.sprite( 0, 0, difficultyAssetId );
                // add sprite to group
                self.contentGroup.add( self.itemOptions['scores']['difficulty']['phaserObjects'][i] );
                // create levelText
                var levelText = alienInvasion.translations['level'] + ':  ' + highScores[i]['level'];
                // set level text
                self.itemOptions['scores']['level']['phaserObjects'][i].text = levelText;
                // create text
                var scoreText = jsProject.pad( highScores[i]['score'], '0', self.itemOptions['scores']['score']['padLength'] );
                // set score
                self.itemOptions['scores']['score']['phaserObjects'][i].text = scoreText;
            }
            // done loop over scores

        // DONE FUNCTION: refresh( void ) void
        };
        self.destruct = function(  ){
        // FUNCTION: destruct( void ) void
        
            // debug info
            self.debug( 'destruct' );

            // destroy mission title object
            self.itemOptions['missionTitle']['phaserObject'].destroy();
            // unset mission title object
            self.itemOptions['missionTitle']['phaserObject'] = null;
                            
            // loop over scores
            for( var i = 0; i < self.itemOptions['scores']['name']['phaserObjects'].length; i++ ){
                // destroy scores name object
                self.itemOptions['scores']['name']['phaserObjects'][i].destroy();
                // unset scores name object
                self.itemOptions['scores']['name']['phaserObjects'][i] = null;
                // destroy scores difficulty object
                self.itemOptions['scores']['difficulty']['phaserObjects'][i].destroy();
                // unset scores difficulty object
                self.itemOptions['scores']['difficulty']['phaserObjects'][i] = null;
                // destroy scores level object
                self.itemOptions['scores']['level']['phaserObjects'][i].destroy();
                // unset scores level object
                self.itemOptions['scores']['level']['phaserObjects'][i] = null;
                // destroy scores score object
                self.itemOptions['scores']['score']['phaserObjects'][i].destroy();
                // unset scores score object
                self.itemOptions['scores']['score']['phaserObjects'][i] = null;
            }
            // done loop over scores
                            
            // unset contentGroup
            self.contentGroup = null;

            // unset game
            self.game = null;
            
            // unset options
            self.options = null;

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
            // function mouseOver( void ) void
            mouseOver: function( ){
                // call internal
                self.mouseOver( );
            },
            // function mouseOut( void ) void
            mouseOut: function( ){
                // call internal
                self.mouseOut( );
            },
            // function select( boolean: select ) void
            select: function( select ){
                // call internal
                self.select( select );
            },
            // function isSelected( void ) boolean 
            isSelected: function( ){
                // return is selected
                return self.itemOptions['isSelected'];
            },
            // function layoutChange( integer: width, integer: top ) void
            layoutChange: function( width, top ){
                // call internal
                self.layoutChange( width, top );
            },
            // function getHeight( void ) integer: height
            getHeight: function( ){
                // call internal
                return self.getHeight( );
            },
            // function getVerticalSpacing( void ) integer: verticalSpacing
            getVerticalSpacing: function( ){
                // call internal
                return self.getVerticalSpacing( );
            },
            // function update( void ) void
            update: function( ){
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
    // DONE MODULE: highScoresListItemModule( Phaser.game: game, integer: missionIndex, phaser.group: contentGroup ) void
})( alienInvasion );
// done create module function
