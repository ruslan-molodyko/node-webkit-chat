/**
 * Created by rmolodyko on 21.01.2016.
 */

/**
 * Created by molodyko on 22.12.2015.
 * My realization of class
 */
Class = (function fn() {
    "use strict";
    return fn.o = new (function() {

        this.constructor = function() {};

        /**
         * This is static function of class
         * Which creates some class by function container
         * @param fn
         * @returns {Function}
         */
        this.constructor.create = function(fn, parent) {

            // Get error if first arg is not a function
            if (typeof fn !== 'function') {
                throw new Error('Fn is not a function');
            }

            /**
             * If parent is object then add it to top of prototype inheritance
             * For call parent constructor is it is exists call:
             *     this.parentClass.constructor.call(this, panel);
             */
            if (typeof parent === 'function') {
                fn.prototype = parent.prototype;
                fn.prototype.parentClass = parent.prototype;
            }

            // Create new object by passed function
            var o = new fn();

            // If new class hasn't define constructor then set default
            if (o.constructor === fn) {
                o.constructor = function() {};
            }

            // Set link to constructor and self to get static variables
            o.self = constructor;

            // Set prototype to constructor
            o.constructor.prototype = o;

            // Add get instance method for each class
            o.constructor.getInstance = function() {
                var p = function() {};
                p.prototype = o;
                var p1 = new p();
                if (this.instance == null) {
                    o.constructor.apply(p1, arguments);
                    this.instance = p1;
                }
                return this.instance;
            };

            // Return constructor
            return o.constructor;
        };

    })(), fn.o.constructor.prototype = fn.o, fn.o.constructor;
})();
