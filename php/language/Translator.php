<?php
/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: \php\language\Translator.php
 * 
 *  Last Revision:  08-03-2018
 * 
 * 
 * Purpose: reads the translations
 * 
 */

namespace PleistermanAlienInvaders\Language;

use PleistermanAlienInvaders\Common\CommonBaseClass;

class Translator extends CommonBaseClass {
    
    // members
    private $languagesDir = '/../../config/';
    private $languagesFileName = 'languages.json';
    private $translationsDir = '/../../config/translations/';
    // members

    // public
    public function __construct( $common )
    {
        
        // call parent constructor
        parent::__construct( $common );
                
        // set languages dir
        $this->languagesDir = dirname( __FILE__ ) .  $this->languagesDir; 
        
        // set translations dir
        $this->translationsDir = dirname( __FILE__ ) .  $this->translationsDir; 
        
    }
    public function getLanguages( ) {
        
        // get file name
        $dirFileName = $this->languagesDir . $this->languagesFileName;
        
        // file exists
        if( is_file( $dirFileName ) ){
            // read config
            return json_decode( file_get_contents( $dirFileName ), true );
        }
        // file exists

        // debug
        $this->log( 'Translator languages config not found, file: ' . $dirFileName, E_ERROR );
        
        // return empty
        return null;
    }
    public function getTranslations( $language ) {
        
        // get file name
        $dirFileName = $this->translationsDir . $language . '.json';
        
        // file exists
        if( is_file( $dirFileName ) ){
            // read config
            return json_decode( file_get_contents( $dirFileName ), true );
        }
        // file exists

        // debug
        $this->log( 'Translator translations not found, file: ' . $dirFileName, E_ERROR );
        
        // return empty
        return null;

    }
    // public

    // private
    // private
}