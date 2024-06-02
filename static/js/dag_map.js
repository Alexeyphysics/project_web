var dag_map;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    dag_map = new ymaps.Map('dag_map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center:[42.6527159173774,46.900470874203045], 
        zoom:10,
        type: 'yandex#publicMapHybrid'
    });

    // Масштабирование с помощью колесика мышки
    dag_map.behaviors.enable('scrollZoom');

    dag_map.controls
        //.add('mapTools')       // стандартные кнопки
        .add('typeSelector')   // переключатель типа карты
        //.add('zoomControl');

    // Создаем метку 1
    var fromPlacemark = new ymaps.Placemark([42.69773145085131,46.82145139834801], {
        // Свойства
        iconContent: 'отсюда',
        name: 'Начало маршрута',
        address: 'Унцукульский район',
        phone: 'тел: (495) 708-42-13',
        photo: '<img src="/img/dag_2.1.jpg" alt="фото начала маршрута" />',
    }, {
        // Опции
        preset: 'twirl#redStretchyIcon' // иконка растягивается под контент
    });

    // Создаем метку 2
    var place1Placemark = new ymaps.Placemark([42.590595459166806,46.91866698016008], {
        iconContent: 'фото',
        photo: '<img src="/img/dag-3.1.jpg" alt="фото начала маршрута" />',
    }, {
        preset: 'twirl#redStretchyIcon' 
    });

    // Создаем метку 3
    var place2Placemark = new ymaps.Placemark([42.5497394530022,46.98183836687883], {
        iconContent: 'сюда',
        name: 'конец маршрута',
        address: 'Унцукульский район',
        photo: '<img src="/img/dag_4.1.jpg" alt="фото начала маршрута" />',
    }, {
        preset: 'twirl#redStretchyIcon' 
    });

    // Создаем метку 4
    var toPlacemark = new ymaps.Placemark([42.64308499821898,46.90630736101946], {
        iconContent: 'фото',
        photo: '<img src="/img/dag_1.1.jpg" alt="фото начала маршрута" />',
    }, {
        preset: 'twirl#redStretchyIcon' 
    });

    // Создаем коллекцию, в которую будем добавлять метки
    var dag_mapCollection = new ymaps.GeoObjectCollection();

    // Добавляем метки в коллекцию геообъектов
    dag_mapCollection
        .add(fromPlacemark)
        .add(place1Placemark)
        .add(place2Placemark)
        .add(toPlacemark);

    // Создаем шаблон для отображения контента балуна
    var dag_mapBalloonLayout = ymaps.templateLayoutFactory.createClass(
        '<p><strong>$[properties.name]</strong></p>' +
        '<p>$[properties.address]</p>' +
        '<p>$[properties.phone]</p>' +
        '<p>$[properties.photo]</p>'
    );

    // Помещаем созданный шаблон в хранилище шаблонов.
    // Теперь наш шаблон доступен по ключу 'tinko#officeslayout'
    ymaps.layout.storage.add('dag_map#officeslayout', dag_mapBalloonLayout);

    // Задаем наш шаблон для балунов геобъектов коллекции
    dag_mapCollection.options.set({
        balloonContentBodyLayout:'dag_map#officeslayout',
        // Максимальная ширина балуна в пикселах
        balloonMaxWidth: 350
    });

    // Добавляем коллекцию геообъектов на карту
    dag_map.geoObjects.add(dag_mapCollection);
}
