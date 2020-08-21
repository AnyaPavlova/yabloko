var contactsPage = document.querySelector('.contacts');
if (contactsPage) {

    var mapContacts;
    ymaps.ready(init);
    function init() {
        mapContacts = new ymaps.Map('contacts-map', {
            center: [59.948585, 30.345685],
            zoom: 16,
            controls: ['zoomControl'] // Отключаем все элементы управления
        });

        var objectsmapContacts = new ymaps.ObjectManager();

        objectsmapContacts.objects.options.set('iconLayout', 'default#image');
        objectsmapContacts.objects.options.set('iconImageHref', 'images/balloon.png');
        objectsmapContacts.objects.options.set('iconImageSize', [36, 36]);
        objectsmapContacts.objects.options.set('iconImageOffset', [-18, -18]);

        mapContacts.geoObjects.add(objectsmapContacts);
        objectsmapContacts.add(listObjectsmapContacts);

        mapContacts.behaviors.disable('scrollZoom'); //запрет прокрутки по скроллу        
    }

    var listObjectsmapContacts = {
        "type": "FeatureCollection",
        "features": [
            { "type": "Feature", "id": 0, "geometry": { "type": "Point", "coordinates": [59.948585, 30.345685] }, "properties": {  } }
        ]
    };

}
