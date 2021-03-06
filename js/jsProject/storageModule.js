/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
*   // this module is part of jsProject
*   
* Purpose:  this module controls acces to client storage for the application 
*           the module decides can store values in a cookie and local storage
*           
*           
* Last revision: 24-11-2015
* 
* NOTICE OF LICENSE
*
* Copyright (C) 2015  Pleisterman
* 
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.
* 
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

( function( jsProject ){
    jsProject.storageModule = function( ) {
        /*
        *  module storageModule 
        * Purpose:  this module controls the cookies for the application 
        *           the module can be used to store values that persist over 
        *           different sessions of the application.
        *           
        *   functions: 
        *       private:
        *           construct:      parameters: ( void ) return: void 
        *                           called by the module for initialization
        *           getValue:       parameters: ( string id ) return: string / null
        *                           call to get a value associated with the id  
        *           setValue:       parameters: ( string id, string  value ) return: true / false 
        *                           call to set a value associated with the id  
        *           deleteValue:    parameters: ( string id ) return:  true / false 
        *                           call to delete a value associated with the id  
        *           debug:          parameters: ( string string ) return: void
        *                           calls the jsProject.debug( string ) when self.debugOn
        *           *       
        *  public: 
        *  The module will add the function setCookieValue to the application    
        *  The module will add the function getCookieValue to the application    
        *  The module will add the function deleteCookieValue to the application    
        */
    
        // private
        var self = this;
        self.MODULE = 'storageModule';
        self.debugOn = false;

        // functions
        self.construct = function() {
            self.debug( 'construct' );
 
            // add functions to application 
            jsProject.setCookieValue = self.setValue;
            jsProject.getCookieValue = self.getValue;
            jsProject.deleteCookieValue = self.deleteValue;
            
        };
        self.getValue = function ( id ) {
            // get the value associated with the id from the cookie
            var encodedId = encodeURIComponent( id ).replace( /[\-\.\+\*]/g, "\\$&" );
            var regularExpression = new RegExp( "(?:(?:^|.*;)\\s*" + encodedId + "\\s*\\=\\s*([^;]*).*$)|^.*$" );
            return decodeURIComponent( document.cookie.replace( regularExpression, "$1" ) ) || null;
        };        
        self.setValue = function ( id, domain, path, value, lifeTime ) {

            var sExpires = "";
            var date = new Date();
            date.setTime( date.getTime() + ( lifeTime * 1000 ) );
            sExpires = date.toUTCString();

            var cookieValue = '';
            cookieValue = encodeURIComponent( id )+ "=" + encodeURIComponent( value ) + ";";
            cookieValue += "Expires=" + sExpires; + ';';
            if( domain !== null ){
                cookieValue += "domain=" + domain  + ';';
            }
            if( path !== null ){
                cookieValue += "path=" + path  + ';';
            }
            cookieValue += "secure;";
            document.cookie = cookieValue;

        }
        self.deleteValue = function ( id ) {
            // check if the cookie was authorized.
            if( self.getValue( 'authorized' ) || id === 'authorized' ) {
                var sExpires = "";
                var date = new Date();
                // set the date to now - 1 to delete the cookie
                date.setTime( date.getTime() - 1 );
                sExpires = date.toUTCString();
                self.debug( sExpires );


                var cookieValue = '';
                cookieValue = encodeURIComponent( id )+ "=" + encodeURIComponent( ' ' ) + ";";
                cookieValue += "expires=" + sExpires;
                cookieValue += "domain=" + jsProject.getValue( 'cookieDomain', 'jsProject' );
                cookieValue +=  ";path=" + jsProject.getValue( 'cookiePath', 'jsProject' );
                if( jsProject.getValue( 'cookieSecure', 'jsProject' ) ){
                    cookieValue += ";secure";
                }
                document.cookie = cookieValue;
                return true;
            }
            else {
                self.debug( 'trying to delete cookie while not authorized cookie:' + id );
            }
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };
        
        // initialize the class if required 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );