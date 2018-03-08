/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds get tofday db datefunction to the
 *          application jsProject
 *          returns a dbDate format form a json date object
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
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
    jsProject.dbDateIsAfterDbDateFunction = function( ) {

        // dbDateIsAfterDbDateFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'dbDateIsAfterDbDateFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add db date after db date function
            jsProject.dbDateIsAfterDbDate = self.dbDateIsAfterDbDate;
        };
        self.dbDateIsAfterDbDate = function( dbDateAfter, dbDateBefore ){
            
            // get after date object
            var afterDateObject = jsProject.dbDateToDateObject( dbDateAfter );
            // get before date object
            var beforeDateObject = jsProject.dbDateToDateObject( dbDateBefore );
            
            // create before date
            var beforeDate = new Date( beforeDateObject['year'], parseInt( beforeDateObject['month'] ) - 1, beforeDateObject['day'] );
            // create after date
            var afterDate = new Date( afterDateObject['year'], parseInt( afterDateObject['month'] ) - 1, afterDateObject['day'] );
            
            // after is after
            if( afterDate > beforeDate ){
                // after
                return true;
            } 
            // after is after
            
            // ! after
            return false;
            
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );