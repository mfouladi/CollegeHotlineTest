/*jshint strict: true, unused: false */
/* globals angular, app, $scope */
"use strict";

app.controller('profileController', ['$scope', '$resource', 'availibilityTimer',
	function ($scope, $resource, availibilityTimer) {

		availibilityTimer.timer();

	}
]);