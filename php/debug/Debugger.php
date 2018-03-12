<?php
/* 
 *  Package: Pleisterman\Alien-Invasion
 * 
 *  File: \php\debug\Debugger.php
 * 
 *  Last Revision:  08-03-2018
 * 
 * 
 * Purpose: this class handles debug calls 
 * 
 *          Distinguish info, warning, error critical error per subject
 *          Warnings and info are written in the debug dir and are appended
 *          Errors are written in the error dir and are appended
 *          Directories can set in settings
 *          Debug on can set in settings default is off
 *          phpDebug ( apache server debug ) on / off is set in settings
 *          clear the debug files: call clearLog
 *                      
 */

namespace PleistermanAlienInvaders\Debug;

class Debugger {
    
    // members
    private $fileExtenstion = 'log';
    private $configDir = '/../../config/';
    private $configFileName = 'phpDebug.json';
    private $debugDir = '/../../debug/';
    private $config = array( 
                'on' =>             false,
                'level' =>          E_ALL,
                'phpDebugOn' =>     false,
                'phpLevel' =>       E_ALL,
                'subject' =>        'default' 
            );
    // members

    // public
    public function __construct( $subject = null )
    {
        // set config dir
        $this->configDir = dirname( __FILE__ ) .  $this->configDir; 

        // create sub dir
        $subDir = 'unknown';
        
        // get client ip
        $ip = $this->getClientIp();
        
        // server adress is set
        if( $ip ) {
            // set ip dir
            $subDir = str_replace( ":", "", $ip );
        }
        // server adress is set
        
        // set debug dir
        $this->debugDir = dirname( __FILE__ ) .  $this->debugDir; 
        
        // add subdir
        $this->debugDir = $this->debugDir . '/' . $subDir . '/';
        
        // sub dir ! exists
        if( !is_dir( $this->debugDir ) ) {
            // create dir
            mkdir( $this->debugDir );
        }
        // sub dir ! exists
        
        // read configuration
        $this->readConfig( );

        // init
        $this->init( $subject );
        
    }
    function __destruct( )
    {
        // log end message
        $this->log( "End", E_ERROR );
        
    }
    public function log( $message, $level = E_NOTICE, $subject = null ) {
        
        // debug ! on
        if( !$this->config['on'] ) {
            // done
            return;
        }
        // debug ! on
        
        // set subject
        $subject = $subject ? $subject : $this->config['subject'];
        
        // level > debug level
        if( $level > $this->config['level'] ){
            // done
            return;
        }
        // level > debug level
        
        // open file
        $file = fopen( $this->debugDir . $subject . "." . $this->fileExtenstion, "a" );
        
        // write message
        fwrite( $file, $this->getTimeStamp() . ' - ' . $message . PHP_EOL );
        
        // close the file
        fclose( $file );
        
    }
    public function clearLog( ) {
        
        // get all file names
        $files = glob( $this->debugDir . '*.' . $this->fileExtenstion . '*' );
        
        // loop over file names
        foreach( $files as $file ) { 
            // is file
            if( is_file( $file ) ) {
                // delete file
                unlink( $file ); 
            }
            // is file
        }
        // loop over file names
        
    }
    // public
    
    // private
    private function init( $subject ) {
        
        // set subject
        $this->config['subject'] = $subject ? $subject : $this->config['subject'];
        
        // set error reporting of apache server 
        if( $this->config['phpDebugOn'] ) {
            
            $level = constant( $this->config['phpLevel'] );
            
            // set ini
            ini_set( 'display_errors', $level );
            // set error reporting
            error_reporting( $level );
        }
        else {

            // set ini
            ini_set('display_errors', 0 );
            // set error reporting
            error_reporting( 0 );
        }
        // done set error reporting of apache server 
        
    }
    private function readConfig( ) {
        
        // get file name
        $dirFileName = $this->configDir . $this->configFileName;
        
        // read config
        $config = json_decode( file_get_contents( $dirFileName ), true ); 
        
        // merge arrays
        $this->config = array_merge( $this->config, $config );
        
        // set error level
        $this->config['level'] = constant( $this->config['level'] );
        
    }
    private function getClientIp( ) {

        // get server ip
        $ipAddress = null;

        // server ip exists
        if( isset( $_SERVER['REMOTE_ADDR'] ) ) {
            // set ip
            $ipAddress = $_SERVER['REMOTE_ADDR'];
        }
        // get forwarded for ip
        
        // get forwarded for ip exists
        if ( array_key_exists( 'HTTP_X_FORWARDED_FOR', $_SERVER ) ) {
            // set ip
            $ipAddress = array_pop( explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']));
        }
        // get forwarded for ip exists
        
        // get client ip exists
        if ( array_key_exists( 'HTTP_CLIENT_IP', $_SERVER ) ) {
            // set ip
            $ipAddress = array_pop( explode(',', $_SERVER['HTTP_CLIENT_IP']));
        }
        // get client ip exists
        
        // ip exists
        if( $ipAddress ){
            // debug
            $this->log( 'Ip, ip adres found: ' . $ipAddress, E_NOTICE );
        }
        else {
            // debug
            $this->log( 'Ip, ip adres ! found: ', E_ERROR );
        }
        
        // return ip address
        return $ipAddress;
        
    }
    private function getTimeStamp( ) {
        
        // get miscro time
        list( $uSec, $sec ) = explode( " ", microtime() );
        
        // get date
        $timeStamp = date( "H:i:s", time() );
        // add micro seconds
        $timeStamp .= ':' . $uSec;
                
        // return result
        return $timeStamp;        
        
    }
    // private
}