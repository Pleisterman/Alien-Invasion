<?php
/* 
 *  Package: Pleisterman\Alien-Invasion
 * 
 *  File: \php\common\Common.php
 * 
 *  Last Revision:  08-03-2018
 * 
 * 
 * Purpose: contains common functions
 * 
 */

namespace PleistermanAlienInvaders\Common;

use PleistermanAlienInvaders\Debug\Debugger;
use PleistermanAlienInvaders\Database\MySqlDataController;

class Common {
    
    // members
    private $debugger = null; 
    private $configFileName = 'config.json';
    private $configDir = '/../../config/';
    private $config = array( );
    private $dataController = null;
    // members
    
    
    // public
    public function __construct( $subject ){

        // set config dir
        $this->configDir = dirname( __FILE__ ) .  $this->configDir; 
        
        // create debugger
        $this->debugger = new Debugger( $subject );
        
        // read configuration
        $this->readConfig( );
        
    }
    public function log( $message, $level = null, $subject = null ) {
        
        // call debugger
        $this->debugger->log( $message, $level, $subject );
        
    }	
    public function handleCriticalError(){
        
        // go to error location
        header( "Location: 500.php" );
        
        // end execution
        die();
        
    }
    public function clearLog( ) {
        
        // call debugger
        $this->debugger->clearLog( );
        
    }
    public function getDebugger( ) {
        
        // return debugger
        return $this->debugger;
        
    }
    public function getDataController( ) {
                
        // data controller ! exists
        if( !$this->dataController ){
            
            // create data controller
            $this->dataController = new MySqlDataController( $this );
            
        }
        // data controller ! exists
        
        // return data controller
        return $this->dataController;
        
    }
    public function getSetting( $settingId ){
        
        // setting exists
        if( isset( $this->config[$settingId] ) ){
            // return setting
            return $this->config[$settingId];
        }
        // setting exists
        
        // debug
        $this->log( 'Common setting not found, settingId: ' . $settingId, E_ERROR );
        
        // return empty
        return null;
    }	
    public function getTimeStamp( ) {
        
        // get miscro time
        list( $uSec, $sec ) = explode( " ", microtime() );
        
        // get date
        $timeStamp = date( "H:i:s", time() );
        // add micro seconds
        $timeStamp .= ':' . $uSec;
                
        // return result
        return $timeStamp;        
        
    }
    // public
    
    // private
    private function readConfig( ) {
        
        // get file name
        $dirFileName = $this->configDir . $this->configFileName;
        
        // read config
        $config = json_decode( file_get_contents( $dirFileName ), true ); 
        
        // merge arrays
        $this->config = array_merge( $this->config, $config );
        
    }
    //  private
    
}
