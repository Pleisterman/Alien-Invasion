<?php
/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \php\index\Missions.php
 * 
 *  Last Revision:  08-03-2018
 * 
 * 
 * Purpose: reads the missions and highscores
 * 
 */

namespace PleistermanAlienInvasion\Index;

use PleistermanAlienInvasion\Common\CommonBaseClass;

class Missions extends CommonBaseClass {
    
    // members
    private $missionsDir = '/../../missions/';
    private $missionsFileName = 'mission.json';
    private $highScoresFileName = 'highScores.json';
    // members

    // public
    public function __construct( $common )
    {
        
        // call parent constructor
        parent::__construct( $common );
 
        // set config dir
        $this->missionsDir = dirname( __FILE__ ) .  $this->missionsDir; 
        
    }
    public function getMissions( ) {

        // get missions list
        $missionsDirList = $this->getMissionsDirList();
        
        // create missions
        return $this->createMissions( $missionsDirList );

    }
    // public

    // private
    private function getMissionsDirList( ) {
        
        // get list from dir
        $dirFileList = scandir( $this->missionsDir );

        // create missions array
        $missionsDirList = [];

        // loop over fileList
        for( $i = 0; $i < count( $dirFileList ); $i++ ){
            // ! dir
            if( is_dir( $this->missionsDir . $dirFileList[$i] ) &&
                $dirFileList[$i] !== '.' &&
                $dirFileList[$i] !== '..' &&
                $dirFileList[$i] !== 'assets' ){
                // add dir
                array_push( $missionsDirList, $dirFileList[$i] );
            }
            // done ! dir
        }
        // done loop over fileList
        
        // return dir list
        return $missionsDirList;
        
    }
    private function createMissions( $missionsDirList ) {
        
        // create missions
        $missions = '[';
        
        // loop over missions
        for( $i = 0; $i < count( $missionsDirList ); $i++ ){
            
            // create mission
            $missions .= $this->createMission( $missionsDirList[$i] );

            // not last mission
            if( $i < count( $missionsDirList ) - 1 ){
                // add separator
                $missions .= ',' . PHP_EOL;
            }
        }
        // done loop over missions
        
        // close missions
        $missions .= PHP_EOL . '];' . PHP_EOL . PHP_EOL; 
                    
        // return missions
        return $missions;
            
    }
    private function createMission( $missionDir ) {
     
        // get mission json
        $missionJson = json_decode( file_get_contents( $this->missionsDir . $missionDir . '/' . $this->missionsFileName ), true );        
            
        // open json
        $mission = '{' . PHP_EOL;
        
            // open mission
            $mission .= '"mission"   :   { ' . PHP_EOL;

                // add mission id    
                $mission .= '"id" : "' . $missionJson['id'] . '",' . PHP_EOL;    
                // add mission title    
                $mission .= '"title" : "' . $missionJson['title'] . '",' . PHP_EOL;    
                // add mission subTitle    
                $mission .= '"subTitle" : "' . $missionJson['subTitle'] . '"' . PHP_EOL;    

            // close mission    
            $mission .= '}';
            
            // add seperator    
            $mission .= ',' . PHP_EOL;
            
                // add mission lives    
                $mission .= '"lives" : ' . $missionJson['lives'];    

            // add seperator    
            $mission .= ',' . PHP_EOL;
            
                // add levels
                $mission .= $this->createLevels( $missionDir );
            
            // add seperator    
            $mission .= ',' . PHP_EOL;
            
                // add highScores
                $mission .= '"highScores"    :   ';
            
                // add high scores
                $mission .= file_get_contents( $this->missionsDir . $missionDir . '/' . $this->highScoresFileName ); 

            // close json
            $mission .= PHP_EOL . '}';
            
            // return mission
            return $mission;
    }
    private function createLevels( $missionDir ) {

        // get level files
        $levelFiles = $this->getLevelsFileList( $missionDir );
                
        // create levels
        $levels = '"levels"    :   [' . PHP_EOL;
        
            // loop over level files
            for( $i = 0; $i < count( $levelFiles ); $i++ ){

                // open json
                $levelJson = json_decode( file_get_contents( $this->missionsDir . $missionDir . '/levels/' . $levelFiles[$i] ), true ); 

                // add levelId    
                $levels .= '"' . $levelJson['id'] . '"';    

                // not last level
                if( $i < count( $levelFiles ) - 1 ){
                    // add separator
                    $levels .= ',' . PHP_EOL;
                }
                // not last level

            }
            // loop over level files
        
        $levels .= PHP_EOL . ']';
        // done add levels
        
        // return levels
        return $levels;
        
    }
    private function getLevelsFileList( $missionDir ) {
        
        // get file list from dir
        $dirFileList = scandir( $this->missionsDir . '/' . $missionDir . '/levels' );

        // create levels file list
        $levelsFileList = [];

        // loop over fileList
        for( $i = 0; $i < count( $dirFileList ); $i++ ){
            // ! dir
            if( !is_dir( $this->missionsDir . $dirFileList[$i] ) ){
                // add level file
                array_push( $levelsFileList, $dirFileList[$i] );
            }
            // done ! dir
        }
        // done loop over fileList
        
        // return levels file list
        return $levelsFileList;
        
    }
    // private
}