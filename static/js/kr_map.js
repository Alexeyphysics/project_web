var kr_map;

ymaps.ready(init);

function init () {

    kr_map = new ymaps.Map('kr_map', {

        center:[44.63059195351334,39.3652683165985], 
        zoom:9,
        type: 'yandex#publicMapHybrid'
    });
    kr_map.behaviors.enable('scrollZoom');
    kr_map.controls
        .add('typeSelector')   
    // Создаем метку 1
    var fromPlacemark = new ymaps.Placemark([44.64137798116649,39.14554175409851], {
        // Свойства
        iconContent: 'отсюда',
        name: 'Начало маршрута',
        address: 'Горячий ключ',
        phone: 'тел: (495) 708-42-13',
        photo: '<img src="/img/kr_1.1.jpg" alt="фото начала маршрута" />',
    }, {
        // Опции
        preset: 'twirl#redStretchyIcon' 
    });

    // Создаем метку 2
    var place1Placemark = new ymaps.Placemark([44.63745602283655,39.32269629511415], {
        iconContent: 'фото',
        photo: '<img src="/img/kr_2.1.jpg" alt="фото начала маршрута" />',
    }, {
        preset: 'twirl#redStretchyIcon' 
    });

    // Создаем метку 3
    var place2Placemark = new ymaps.Placemark([44.605370989380525,39.611474639895775], {
        iconContent: 'сюда',
        name: 'конец маршрута',
        address: 'Тверской район',
        photo: '<img src="/img/kr_4.1.jpg" alt="фото начала маршрута" />',
    }, {
        preset: 'twirl#redStretchyIcon' 
    });

    // Создаем метку 4
    var toPlacemark = new ymaps.Placemark([44.66784421860078,39.50259741816101], {
        iconContent: 'фото',
        photo: '<img src="/img/kr_3.1.jpg" alt="фото начала маршрута" />',
    }, {
        preset: 'twirl#redStretchyIcon' 
    });

    // Создаем коллекцию, в которую будем добавлять метки
    var kr_mapCollection = new ymaps.GeoObjectCollection();

    // Добавляем метки в коллекцию геообъектов
    kr_mapCollection
        .add(fromPlacemark)
        .add(place1Placemark)
        .add(place2Placemark)
        .add(toPlacemark);

    // Создаем шаблон для отображения контента балуна
    var kr_mapBalloonLayout = ymaps.templateLayoutFactory.createClass(
        '<p><strong>$[properties.name]</strong></p>' +
        '<p>$[properties.address]</p>' +
        '<p>$[properties.phone]</p>' +
        '<p>$[properties.photo]</p>'
    );

    // Помещаем созданный шаблон в хранилище шаблонов.
    // Теперь наш шаблон доступен по ключу 'tinko#officeslayout'
    ymaps.layout.storage.add('kr_map#officeslayout', kr_mapBalloonLayout);

    // Задаем наш шаблон для балунов геобъектов коллекции
    kr_mapCollection.options.set({
        balloonContentBodyLayout:'kr_map#officeslayout',
        // Максимальная ширина балуна в пикселах
        balloonMaxWidth: 350
    });

    // Добавляем коллекцию геообъектов на карту
    kr_map.geoObjects.add(kr_mapCollection);
}
