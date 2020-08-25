"use strict";

var contactsPage = document.querySelector('.map-block');

if (contactsPage) {
  if (document.querySelector('#contacts-map')) {
    var init = function init() {
      mapContacts = new ymaps.Map('contacts-map', {
        center: [59.948585, 30.345685],
        zoom: 16,
        controls: ['zoomControl'] // Отключаем все элементы управления

      });
      var objectsMapContacts = new ymaps.ObjectManager();
      objectsMapContacts.objects.options.set('iconLayout', 'default#image');
      objectsMapContacts.objects.options.set('iconImageHref', 'images/balloon.png');
      objectsMapContacts.objects.options.set('iconImageSize', [36, 36]);
      objectsMapContacts.objects.options.set('iconImageOffset', [-18, -18]);
      mapContacts.geoObjects.add(objectsMapContacts);
      objectsMapContacts.add(listObjectsMapContacts);
      mapContacts.behaviors.disable('scrollZoom'); //запрет прокрутки по скроллу        
    };

    var mapContacts;
    ymaps.ready(init);
    var listObjectsMapContacts = {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "id": 0,
        "geometry": {
          "type": "Point",
          "coordinates": [59.948585, 30.345685]
        },
        "properties": {}
      }]
    };
  }

  if (document.querySelector('#example-map')) {
    var _init = function _init() {
      mapExample = new ymaps.Map('example-map', {
        center: [55.740387, 37.628716],
        zoom: 16,
        controls: ['zoomControl'] // Отключаем все элементы управления

      });
      var objectsMapExample = new ymaps.ObjectManager();
      objectsMapExample.objects.options.set('iconLayout', 'default#image');
      objectsMapExample.objects.options.set('iconImageHref', 'images/balloon.png');
      objectsMapExample.objects.options.set('iconImageSize', [36, 36]);
      objectsMapExample.objects.options.set('iconImageOffset', [-18, -18]);
      mapExample.geoObjects.add(objectsMapExample);
      objectsMapExample.add(listObjectsMapExample);
      mapExample.behaviors.disable('scrollZoom'); //запрет прокрутки по скроллу        
    };

    var mapExample;
    ymaps.ready(_init);
    var listObjectsMapExample = {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "id": 0,
        "geometry": {
          "type": "Point",
          "coordinates": [55.740387, 37.628716]
        },
        "properties": {}
      }, {
        "type": "Feature",
        "id": 1,
        "geometry": {
          "type": "Point",
          "coordinates": [55.739271, 37.636717]
        },
        "properties": {}
      }]
    };
  }
}