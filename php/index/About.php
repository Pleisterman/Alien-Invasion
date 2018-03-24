<?php
/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \php\index\About.php
 * 
 *  Last Revision:  20-03-2018
 * 
 * 
 * Purpose: reads the about
 * 
 */

namespace PleistermanAlienInvasion\Index;

use PleistermanAlienInvasion\Common\CommonBaseClass;

class About extends CommonBaseClass {
    
    // members
    private $configDir = '/../../config/';
    private $configFileName = 'about.json';
    // members

    // public
    public function __construct( $common )
    {
        
        // call parent constructor
        parent::__construct( $common );
 
        // set config dir
        $this->configDir = dirname( __FILE__ ) .  $this->configDir; 
        
    }
    public function getAbout( ) {

        // get file name
        $dirFileName = $this->configDir . $this->configFileName;
        
        // file exists
        if( is_file( $dirFileName ) ){
            // read config
            return file_get_contents( $dirFileName ); 
        }
        // file exists

        // debug
        $this->log( 'about not found, file: ' . $dirFileName, E_ERROR );
        
        // return empty
        return null;

    }
    // public

    // private
    // private
}