<?php
/* 
 *  Package: Pleisterman\Alien-Invasion 
 * 
 *  File: index.php
 * 
 *  Last Revision:  08-03-2018
 * 
 *  Purpose:  
 *      contains the basic html code for the alienInvasion phaser project
 *      loads the javascript files
 *      starts the main js script
 * 
 *  Author: Pleisterman
 *  Web: www.pleisterman.nl 
 *  Mail: info@pleisterman.nl 
 *  GitHub: https://github.com/Pleisterman 
 * 
 *  Copyright (C) 2018 Pleisterman 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
*/

// autoloader exists
if ( file_exists( dirname( __FILE__ ) . '/vendor/autoload.php' ) ) {
    // add autoloader
    require_once dirname( __FILE__ ) . '/vendor/autoload.php';
}
// autoloader exists

use PleistermanAlienInvaders\Common\Common;
use PleistermanAlienInvaders\Common\DeviceDetector;
use PleistermanAlienInvaders\Index\JsConfig;
use PleistermanAlienInvaders\Language\Translator;

// css files
$cssFiles = array(
    'common.css'
);
// css files
        
// jsProject files
$jsProjectFiles = array(
    './js/jsProject/jsProject.js',
    './js/jsProject/eventsModule.js',
    './js/jsProject/debugModule.js',
    './js/jsProject/ajaxModule.js',
    './js/jsProject/browserModule.js',
    './js/jsProject/storageModule.js',
    './js/jsProject/assetsModule.js',
    './js/jsProject/valuesModule.js',
    './js/jsProject/jsonToElementHtmlModule.js',
    './js/jsProject/functions/functionsModule.js',
    './js/jsProject/functions/getJsonValueFunction.js',
    './js/jsProject/functions/getLinearGradientPrefixFunction.js',
    './js/jsProject/functions/elementIsVisibleFunction.js',
    './js/jsProject/functions/scrollElementFunction.js',
    './js/jsProject/functions/getElementPositionFunction.js',
    './js/jsProject/functions/padFunction.js',
    './js/jsProject/functions/checkEmailSyntaxFunction.js',
    './js/jsProject/functions/xorStringFunction.js',
    './js/jsProject/functions/orderArrayFunction.js',
    './js/jsProject/functions/dateObjectToDbDateFunction.js',
    './js/jsProject/functions/dateObjectToTextFunction.js',
    './js/jsProject/functions/dbDateToDateObjectFunction.js',
    './js/jsProject/functions/getNextDayFunction.js',
    './js/jsProject/functions/getPreviousDayFunction.js',
    './js/jsProject/functions/getTodayDbDateFunction.js',
    './js/jsProject/functions/dbDateIsAfterDbDateFunction.js',
    './js/jsProject/functions/getTodayTextFunction.js',
    './js/jsProject/functions/getWeekFunction.js',
    './js/jsProject/functions/textToDateObjectFunction.js',
    './js/jsProject/functions/hexStringToRgbFunction.js',
    './js/jsProject/functions/hsvToRgbFunction.js',
    './js/jsProject/functions/rgbIsRgbFunction.js',
    './js/jsProject/functions/rgbToHsvFunction.js',
    './js/jsProject/functions/rgbToHexStringFunction.js',
    './js/jsProject/functions/rgbToStringFunction.js',
    './js/jsProject/functions/stringToRgbFunction.js'
);
// jsProject files
        
// application files
$applicationFiles = array(
    './js/index/main.js',
);
// application files

// create version
$version = '001';

// create common
$common = new Common( 'index' );

// clear log
$common->clearLog( );

// log
$common->log( 'Start', E_ERROR );

// create device detector
$deviceDetector = new DeviceDetector( $common );

// create js config
$jsConfig = new JsConfig( $common );

// create session
$translator = new Translator( $common );
// get languages
$languages = $translator->getLanguages();
// get defaut language
$defaultLanguage = $common->getSetting( 'default-language' );
// get transaltions
$translations = $translator->getTranslations( $defaultLanguage );

?>

<!DOCTYPE html>

<html>

    <head>
        <?php // set title ?>
        <title><?php echo $translations['document-title'];?></title>
        
        <?php // set charset ?>
        <meta charset="UTF-8">
        
        <?php // set desciption ?>
        <meta name="description" content="<?php echo $translations['document-description'];?>">
        
        <?php // set keywords ?>
        <meta name="keywords" content="<?php echo $translations['document-keywords'];?>">
        
        <?php // set viewport ?>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <?php // set edge compatible?>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <?php // add font ?>
        <link href="https://fonts.googleapis.com/css?family=<?php echo $common->getSetting( 'font' )?>" media="screen" rel="stylesheet" type="text/css">

        <?php // add logo ?>
        <link href="./assets/images/logo.ico" rel="shortcut icon" type="image/vnd.microsoft.icon">

        <?php 
        // add css 
        
            // loop over cssfiles
            foreach( $cssFiles as $file ){
                // start link
                echo '<link rel="stylesheet" href="./css/';
                // file name
                echo $file;
                // end link        
                echo '" type="text/css" media="all">';        
            }
            // loop over cssfiles
            
        // add css 
        ?>

        <?php // add jquery ?>
        <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>   
        
        <?php // add phaser ?>
        <script type="text/javascript" src="./js/phaser.min.js?version=<?php echo $version; ?>" ></script>
            
        <?php // add proTracker ?>
        <script type="text/javascript" src="./js/proTracker.js?version=<?php echo $version; ?>" ></script>


        <?php 
        // add jsProject files 
        
            // loop over jsProject files
            foreach( $jsProjectFiles as $file ){
                // start link
                echo '<script type="text/javascript" src="';
                // file name
                echo $file;
                // add version        
                echo '?version=' . $version;
                // end link        
                echo '"></script>';
            }
            // loop over jsProject files
            
        // add jsProject files 
        ?>

        <?php 
        // add application files 
        
            // loop over application files
            foreach( $applicationFiles as $file ){
                // start link
                echo '<script type="text/javascript" src="';
                // file name
                echo $file;
                // add version        
                echo '?version=' . $version;
                // end link        
                echo '"></script>';
            }
            // loop over application files
            
        // add application files 
        ?>
        
        
    </head>

    <body>
    
<?php

    // open no script tag
    echo '<noscript>';

            // add js not activatited response
            echo $translations['document-no-js'];
            
    // close no script tag
    echo '</noscript>';

?>

        <script>
<?php
        
// add js config
echo 'alienInvasion.config=' . $jsConfig->getConfig() . ';' . PHP_EOL; 

// add js debug
echo 'alienInvasion.debug=' . $jsConfig->getDebugConfig() . ';' . PHP_EOL; 

// add languages 
echo 'alienInvasion.languages=' . json_encode( $languages ) . ';' . PHP_EOL; 

// add language
echo 'alienInvasion.language="' . $defaultLanguage . '";'; 

?>
    
// add onload event    
window.onload = function(){
    // start the application
    alienInvasion.start();
};
// done add onload event    

        </script>
    </body>
</html>        
        

