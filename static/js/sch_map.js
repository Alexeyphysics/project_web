var sch_map;


ymaps.ready(init);

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    sch_map = new ymaps.Map('sch_map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center:[43.53837722879003,39.89835465906369], 
        zoom:10,
        type: 'yandex#publicMapHybrid'
    });

    // Масштабирование с помощью колесика мышки
    sch_map.behaviors.enable('scrollZoom');

    sch_map.controls
        //.add('mapTools')       // стандартные кнопки
        .add('typeSelector')   // переключатель типа карты
        //.add('zoomControl');

    // Создаем метку 1
    var fromPlacemark = new ymaps.Placemark([43.55236218910376,39.80222428796995], {
        // Свойства
        iconContent: 'отсюда',
        name: 'Начало маршрута',
        address: 'Сочи',
        phone: 'тел: (495) 708-42-13',
        photo: '<img src="/img/sch_1.1.jpg" alt="фото начала маршрута" />',
    }, {
        // Опции
        preset: 'twirl#redStretchyIcon' // иконка растягивается под контент
    });

    // Создаем метку 2
    var place1Placemark = new ymaps.Placemark([43.51639426133534,39.890114912969956], {
        iconContent: 'фото',
        photo: '<img src="/img/sch_2.1.jpg" alt="фото начала маршрута" />',
    }, {
        preset: 'twirl#redStretchyIcon' 
    });

    // Создаем метку 3
    var place2Placemark = new ymaps.Placemark([43.415368918048294,40.00821794031372], {
        iconContent: 'сюда',
        name: 'конец маршрута',
        address: 'Веселое',
        photo: '<img src="/img/sch_4.1.jpg" alt="фото начала маршрута" />',
    }, {
        preset: 'twirl#redStretchyIcon' 
    });

    // Создаем метку 4
    var toPlacemark = new ymaps.Placemark([43.45940086058137,39.896981368048074], {
        iconContent: 'фото',
        photo: '<img src="/img/sch_3.1.jpg" alt="фото начала маршрута" />',
    }, {
        preset: 'twirl#redStretchyIcon' 
    });

    // Создаем коллекцию, в которую будем добавлять метки
    var sch_mapCollection = new ymaps.GeoObjectCollection();

    // Добавляем метки в коллекцию геообъектов
    sch_mapCollection
        .add(fromPlacemark)
        .add(place1Placemark)
        .add(place2Placemark)
        .add(toPlacemark);

    // Создаем шаблон для отображения контента балуна
    var sch_mapBalloonLayout = ymaps.templateLayoutFactory.createClass(
        '<p><strong>$[properties.name]</strong></p>' +
        '<p>$[properties.address]</p>' +
        '<p>$[properties.phone]</p>' +
        '<p>$[properties.photo]</p>'
    );

    // Помещаем созданный шаблон в хранилище шаблонов.
    // Теперь наш шаблон доступен по ключу 'tinko#officeslayout'
    ymaps.layout.storage.add('sch_map#officeslayout', sch_mapBalloonLayout);

    // Задаем наш шаблон для балунов геобъектов коллекции
    sch_mapCollection.options.set({
        balloonContentBodyLayout:'sch_map#officeslayout',
        // Максимальная ширина балуна в пикселах
        balloonMaxWidth: 350
    });

    // Добавляем коллекцию геообъектов на карту
    sch_map.geoObjects.add(sch_mapCollection);
}
