<?php
/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \php\index\JsConfig.php
 * 
 *  Last Revision:  08-03-2018
 * 
 * 
 * Purpose: Merges default setttings with settings from json settings file
 *          get setting returns setting
 * 
 */

namespace PleistermanAlienInvaders\Index;

use PleistermanAlienInvaders\Common\CommonBaseClass;

class JsConfig extends CommonBaseClass {
    
    // members
    private $configDir = '/../../config/';
    private $configFileName = 'js-config.json';
    private $debugConfigFileName = 'js-debug.json';
    // members

    // public
    public function __construct( $common )
    {
        
        // call parent constructor
        parent::__construct( $common );
 
        // set config dir
        $this->configDir = dirname( __FILE__ ) .  $this->configDir; 
        
    }
    public function getConfig( ) {
        
        // get file name
        $dirFileName = $this->configDir . $this->configFileName;
        
        // file exists
        if( is_file( $dirFileName ) ){
            // read config
            return file_get_contents( $dirFileName ); 
        }
        // file exists

        // debug
        $this->log( 'js config not found, file: ' . $dirFileName, E_ERROR );
        
        // return empty
        return null;
    }
    public function getDebugConfig( ) {
        
        // get file name
        $dirFileName = $this->configDir . $this->debugConfigFileName;
        
        // file exists
        if( is_file( $dirFileName ) ){
            // read config
            return file_get_contents( $dirFileName ); 
        }
        // file exists

        // debug
        $this->log( 'js debug config not found, file: ' . $dirFileName, E_ERROR );
        
        // return empty
        return null;
    }
    // public

    // private
    // private
}