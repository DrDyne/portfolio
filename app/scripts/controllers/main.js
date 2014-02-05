'use strict';

angular.module('portfolioApp')
.controller('MainCtrl', [
  '$scope',
function ($scope) {
  $scope.sections = [ {
    id: 'me',
    currentSlide: '',
    slides: [],
  }, {
    id: 'employments',
    slides: [
      'silanis',
      'babel',
      'lg',
      'eurocopter',
    ]
  }, {
    id: 'demo',
    slides: [
      'angular',
      'backbone',
      'jquery-css',
      'tdd',
    ]
  }, {
    id: 'tools',
    slides: [
      'vim',
      'byobu',
      'git',
    ]
  }, {
    id: 'education',
    slides: [
      'master',
      'license',
      'bts',
    ]
  }, {
    id: 'skills',
    slides: [
      'api',
    ]
  }, {
    id: 'languages',
  }, {
    id: 'activities',
    slides: [
      'confoo',
      'workshop-microsoft',
      'workshop-coaching',
      'gamerella',
      'js-montreal',
      'html5-montreal',
      'symphony-montreal',
      'toeic',
    ]
  }, {
    id: 'contact',
  }, {
    id: 'you',
  } ]
}]);
