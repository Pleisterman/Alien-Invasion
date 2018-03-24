<?php
/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \php\common\DeviceDetector.php
 * 
 *  Last Revision:  25-02-2018
 * 
 * 
 * Purpose: detects device the user is using to browse
 * 
 */

namespace PleistermanAlienInvasion\Common;

use PleistermanAlienInvasion\Common\CommonBaseClass;
use PleistermanAlienInvasion\Common\MobileDetect;

class DeviceDetector extends CommonBaseClass {

    // members
    private $detector = null;
    // members
    
    // public
    public function __construct( $common )
    {
        
        // call parent constructor
        parent::__construct( $common );
        
        // create the detector class
        $this->detector = new MobileDetect();
        
        // log message
        $this->log( 'deviceDetector constructed.' );
 
    }
    public function isMobile(){

       // get is mobile 
       if( $this->detector->isMobile() ) {
            // log message
            $this->log( "device detector is-mobile = true" );
            //return result
            return true;
        }
        else {
            // log message
            $this->log( "device detector is-mobile = false" );
            //return result
            return false;
        }
       // get is mobile 
        
    }
    // public
    
    // private
    // private
}