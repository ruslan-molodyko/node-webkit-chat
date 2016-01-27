/**
 * Created by rmolodyko on 25.01.2016.
 */

var MessageCtrl = Class.create(function(){

    /**
     * Init data
     * @param $scope
     * @param $routeParams
     */
    this.constructor = function($scope, $routeParams) {
        this.scope = $scope;
        this.routeParams = $routeParams;

        this.messageInstance = Message.getInstance();
        this.socket = new Socket(this);

        this.user = Math.random() * 10;

        this.init();
    };

    this.init = function() {

        // Get message of current user
        this.scope.messages = this.messageInstance.getMessages();

        this.scope.message = '';
        this.scope.sendMessage = this.sendMessage.bind(this);
    };

	$('textarea')
	
    /**
     * When user click on send button
     */
    this.sendMessage = function(type) {

		var key = window.event.keyCode;

		// If the user has pressed enter
		if (type && key !== 13) {
			return;
		}
	
        // Add message
        var message = this.messageInstance.add(this.user, this.scope.message, Parameter.typeMe);

		// Clear textarea
		this.scope.message = '';
        
        this.scrollBottom();

        // Send message to socket server
        this.socket.socket.emit('message', message);
    };

    this.scrollBottom = function() {

        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    };
});

/**
 * Work with message
 * @type {Function|Object}
 */
var Message = Class.create(function() {
    this.constructor = function() {
        this.messages = [];
    };

    /**
     * Add new message
     * @param user
     * @param message
     * @param mode
     * @returns {{user: *, message: *, mode: *}}
     */
    this.add = function(user, message, mode) {

        var data = {
            user: user,
            message: message,
            mode: mode
        };

        this.messages.push(data);

        return data;
    };

    /**
     * Get all messages
     * @returns {*|Array}
     */
    this.getMessages = function() {
        return this.messages;
    };

    /**
     * Get guid
     * @returns {string}
     */
    this.guid = function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
});

/**
 * Class which use socket
 * @type {Function|Object}
 */
var Socket = Class.create(function() {
    this.constructor = function(msgCtrl) {

        // Connect to the socket server
        this.socket = io.connect(Parameter.socketUrl);
        this.msgCtrl = msgCtrl;

        // Wait connect and message
        this.socket.on('connect', function () {
            this.socket.on('message', function (msg) {

                // If message was called not from me then show it
                if (msg.user != this.msgCtrl.user) {

                    var message = Message.getInstance();

                    // Save message
                    message.add(msg.user, msg.message, Parameter.typeHe);

                    // Update view of angular
                    this.msgCtrl.scope.$apply();

                    this.msgCtrl.scrollBottom();
                }
            }.bind(this));
        }.bind(this));
    };
});

/**
 * Save parameters
 * @type {Function|Object}
 */
var Parameter = Class.create(function() {
    this.constructor = function() {};

    this.constructor.socketUrl = 'https://ruslandev.fwd.wf';
    this.constructor.typeMe = 'me';
    this.constructor.typeHe = 'he';
});
