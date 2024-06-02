var bl_map;


ymaps.ready(init);

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    bl_map = new ymaps.Map('bl_map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center:[53.17714715109146,107.26656751467272], 
        zoom:9,
        type: 'yandex#publicMapHybrid'
    });

    // Масштабирование с помощью колесика мышки
    bl_map.behaviors.enable('scrollZoom');

    bl_map.controls
        //.add('mapTools')       // стандартные кнопки
        .add('typeSelector')   // переключатель типа карты
        //.add('zoomControl');

    // Создаем метку 1
    var fromPlacemark = new ymaps.Placemark([53.035827820685796,106.96581678225081], {
        // Свойства
        iconContent: 'отсюда',
        name: 'Начало маршрута',
        address: 'Сахюрта',
        phone: 'тел: (495) 708-42-13',
        photo: '<img src="/static/img/bl_1.1.jpg" alt="фото начала маршрута" />',
    }, {
        // Опции
        preset: 'twirl#redStretchyIcon' // иконка растягивается под контент
    });

    // Создаем метку 2
    var place1Placemark = new ymaps.Placemark([53.11687492279604,107.09353284670394], {
        iconContent: 'фото',
        photo: '<img src="/static/img/bl_2.1.jpg" alt="фото начала маршрута" />',
    }, {
        preset: 'twirl#redStretchyIcon' 
    });

    // Создаем метку 3
    var place2Placemark = new ymaps.Placemark([53.18622189969387,107.32836561037584], {
        iconContent: 'сюда',
        name: 'конец маршрута',
        address: 'Хужир',
        photo: '<img src="/static/img/bl_4.1.jpg" alt="фото начала маршрута" />',
    }, {
        preset: 'twirl#redStretchyIcon' 
    });

    // Создаем метку 4
    var toPlacemark = new ymaps.Placemark([53.10200021212023,107.37231092287581], {
        iconContent: 'фото',
        photo: '<img src="/static/img/bl_3.1.png" alt="фото начала маршрута" />',
    }, {
        preset: 'twirl#redStretchyIcon' 
    });

    // Создаем коллекцию, в которую будем добавлять метки
    var bl_mapCollection = new ymaps.GeoObjectCollection();

    // Добавляем метки в коллекцию геообъектов
    bl_mapCollection
        .add(fromPlacemark)
        .add(place1Placemark)
        .add(place2Placemark)
        .add(toPlacemark);

    // Создаем шаблон для отображения контента балуна
    var bl_mapBalloonLayout = ymaps.templateLayoutFactory.createClass(
        '<p><strong>$[properties.name]</strong></p>' +
        '<p>$[properties.address]</p>' +
        '<p>$[properties.phone]</p>' +
        '<p>$[properties.photo]</p>'
    );

    // Помещаем созданный шаблон в хранилище шаблонов.
    // Теперь наш шаблон доступен по ключу 'tinko#officeslayout'
    ymaps.layout.storage.add('bl_map#officeslayout', bl_mapBalloonLayout);

    // Задаем наш шаблон для балунов геобъектов коллекции
    bl_mapCollection.options.set({
        balloonContentBodyLayout:'bl_map#officeslayout',
        // Максимальная ширина балуна в пикселах
        balloonMaxWidth: 350
    });

    // Добавляем коллекцию геообъектов на карту
    bl_map.geoObjects.add(bl_mapCollection);
}
