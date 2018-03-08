<?php
/* 
 *  Package: Pleisterman\Alien-Invasion
 * 
 *  File: \php\common\CommonClass.php
 * 
 *  Last Revision:  08-03-2018
 * 
 * 
 * Purpose: implements common class and creates common functions
 * 
 */

namespace PleistermanAlienInvaders\Common;

use PleistermanAlienInvaders\Common\Common;

class CommonBaseClass {
    
    // members
    protected $common = null;
    // members
        
    // public
    public function __construct( Common $common ){
        
        // set common
        $this->common = $common;

    }
    // public

    // protected
    protected function log( $message, $level = null, $subject = null ) {
    
        // call common
        $this->common->log( $message, $level, $subject );
                
    }
    protected function getSetting( $settingId ) {
    
        // call common
        $this->common->getSetting( $settingId );
                
    }
    // protected
}
