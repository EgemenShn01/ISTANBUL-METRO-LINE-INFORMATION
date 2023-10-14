function taşıtdeğiş() {
    var taşıtCombobox = document.getElementById("taşıt");
    var hatlarCombobox = document.getElementById("hatlar");
    hatlarCombobox.innerHTML = "";

    var seçilentaşıt = taşıtCombobox.value;

    var taşıtData = {
        'seç': ["TAŞIT SEÇİNİZ", "taşıtseç"],
        'otobüs': [
            ["SEÇİNİZ","SEÇ"],
            ["1", "otobüs1"],
            ["2", "otobüs2"],
            ["4", "otobüs3"],
            ["5", "otobüs4"],
            ["10", "otobüs5"],
            ["11G", "otobüs6"],
            ["DT1", "otobüs7"],
            ["BN1", "otobüs8"],
            ["77", "otobüs9"],
            ["11ÜS", "otobüs10"]
        ],
        'metro': [
            ["SEÇİNİZ","SEÇ"],

            ["M1A", "metro1"],
            ["M1B", "metro2"],
            ["M3", "metro3"],
            ["M2", "metro4"],
            ["M4", "metro5"],
            ["M5", "metro6"],
            ["M6", "metro7"],
            ["M7", "metro8"],
            ["M8", "metro9"],
            ["M9", "metro10"],
            ["M11", "metro11"]
        ],
        'metrobüs': [
            ["SEÇİNİZ","SEÇ"],

            ["AVCILAR-SÖĞÜTLÜÇEŞME", "metrobüs1"],
            ["AVCILAR-ZİNCİRLİKUYU", "metrobüs2"],
            ["BEYLİKDÜZÜ-AVCILAR", "metrobüs3"],
            ["BEYLİKDÜZÜ-CEVİZLİBAĞ", "metrobüs4"],
            ["BEYLİKDÜZÜ-SÖĞÜTLÜÇEŞME", "metrobüs5"],
            ["CEVİZLİBAĞ-SÖĞÜTLÜÇEŞME", "metrobüs6"],
            ["ZİNCİRLİKUYU-SÖĞÜTLÜÇEŞME", "metrobüs7"],
            ["F1", "metrobüs8"],
            ["F2", "metrobüs9"],
            ["F3", "metrobüs10"]
        ],
        'tramvay': [
            ["SEÇİNİZ","SEÇ"],

            ["T1", "tramvay1"],
            ["T2", "tramvay2"],
            ["T3", "tramvay3"],
            ["T4", "tramvay4"],
            ["T5", "tramvay5"]
        ],
        'vapur': [
            ["SEÇİNİZ","SEÇ"],

            ["BEŞİKTAŞ-ADALAR", "vapur1"],
            ["BOSTANCI-ADALAR", "vapur2"],
            ["KARTAL-HEYEBELİADA", "vapur3"],
            ["KABATAŞ-ADALAR", "vapur4"],
            ["EMİNÖNÜ-ADALAR", "vapur5"],
            ["AVCILAR-BOSTANCI", "vapur6"],
            ["BEŞİKAŞ-KADIKÖY", "vapur7"],
            ["HAREM-SİRKECİ", "vapur8"],
            ["KADIKÖY-BEŞİKTAŞ", "vapur9"],
            ["KADIKÖY-EMİNÖNÜ", "vapur10"],
            ["ÜSKÜDAR-KABATAŞ", "vapur12"],
            ["ÜSKÜDAR-BEŞİKTAŞ", "vapur13"]
        ],
        'marmaray': [
            ["SEÇİNİZ","SEÇ"],

            ["ATAKÖY-PENDİK", "marmaray1"],
            ["HALKALI-BAHÇEŞEHİR", "marmaray2"],
            ["HALKALI-GEBZE", "marmaray3"]
        ]
    };

    if (seçilentaşıt === 'seç') {
        ekle("TAŞIT SEÇİNİZ", "taşıtseç");
    } else {
        var selectedTaşıtData = taşıtData[seçilentaşıt];
        for (var i = 0; i < selectedTaşıtData.length; i++) {
            ekle(selectedTaşıtData[i][0], selectedTaşıtData[i][1]);
        }
    }
}

function ekle(text, value) {
    var seçenek = document.createElement("option");
    seçenek.textContent = text;
    seçenek.value = value;
    document.getElementById("hatlar").appendChild(seçenek);
}

map.on('load', function () { 
    map.addSource('geojsonMarkers', {
        type: 'geojson',
        data: 'karahattı/otobüshat.json',
    });
            
    map.addLayer({
        'id': 'markers',
        'type': 'symbol',
        'source': 'geojsonMarkers',
        'layout': {
            'icon-image': 'marker',
            'icon-size': 1,
        },
        'filter': ["==", 0, ["get", "hat-tipi"]]
    });
    map.on('click', "markers", function (event) {
        console.log(event);

        map.queryRenderedFeatures(event.point).forEach((element) => {
            if (element.id !== undefined)
                console.log(element);
        })
        var features = map.queryRenderedFeatures(event.point, { layers: ['markers'] });

        if (!features.length) {
            return;
        }

        var feature = features[0];
        var konum = event.lngLat;
        
        var popUpIcerik = popUpIcerikOlustur(feature.properties);

        var popUp = new maplibregl.Popup()
            .setLngLat(konum)
            .setHTML(popUpIcerik)
            .addTo(map);
            map.flyTo({ center: konum, zoom: 13 });
    });
    map.addSource('geojsonMarkers2', {
        type: 'geojson',
        data: 'karahattı/metrohat.json',
    });

    map.addLayer({
        'id': 'markers2',
        'type': 'symbol',
        'source': 'geojsonMarkers2',
        'layout': {
            'icon-image': 'marker2',
            'icon-size': 1,
        },
        'filter': ["==", 0, ["get", "hat-tipi"]]
    });
    map.on('click', "markers2", function (event) {
        console.log(event);

        map.queryRenderedFeatures(event.point).forEach((element) => {
            if (element.id !== undefined)
                console.log(element);
        })
        var features = map.queryRenderedFeatures(event.point, { layers: ['markers2'] });

        if (!features.length) {
            return;
        }

        var feature = features[0];
        var konum = event.lngLat;
        
        // Pop-up içeriğini oluşturun
        var popUpIcerik = popUpIcerikOlustur(feature.properties);

        // Pop-up'ı oluşturun ve konuma yerleştirin
        var popUp = new maplibregl.Popup()
            .setLngLat(konum)
            .setHTML(popUpIcerik)
            .addTo(map);
            map.flyTo({ center: konum, zoom: 13 });

        });

    map.addSource('geojsonMarkers3', {
        type: 'geojson',
        data: 'karahattı/tramvayhattı.json',
    });

    map.addLayer({
        'id': 'markers3',
        'type': 'symbol',
        'source': 'geojsonMarkers3',
        'layout': {
            'icon-image': 'marker4',
            'icon-size': 1,
        },
        'filter': ["==", 0, ["get", "hat-tipi"]]
    });
    map.on('click', "markers3", function (event) {
        console.log(event);

        map.queryRenderedFeatures(event.point).forEach((element) => {
            if (element.id !== undefined)
                console.log(element);
        })
        var features = map.queryRenderedFeatures(event.point, { layers: ['markers3'] });

        if (!features.length) {
            return;
        }

        var feature = features[0];
        var konum = event.lngLat;
        
        // Pop-up içeriğini oluşturun
        var popUpIcerik = popUpIcerikOlustur(feature.properties);

        // Pop-up'ı oluşturun ve konuma yerleştirin
        var popUp = new maplibregl.Popup()
            .setLngLat(konum)
            .setHTML(popUpIcerik)
            .addTo(map);
            map.flyTo({ center: konum, zoom: 13 });

    });

    
    map.addSource('geojsonMarkers4', {
        type: 'geojson',
        data: 'karahattı/metrobüshat.json',
    });

    map.addLayer({
        'id': 'markers4',
        'type': 'symbol',
        'source': 'geojsonMarkers4',
        'layout': {
            'icon-image': 'marker3',
            'icon-size': 1,
        },
        'filter': ["==", 0, ["get", "hat-tipi"]]
    });
    map.on('click', "markers4", function (event) {
        console.log(event);

        map.queryRenderedFeatures(event.point).forEach((element) => {
            if (element.id !== undefined)
                console.log(element);
        })
        var features = map.queryRenderedFeatures(event.point, { layers: ['markers4'] });

        if (!features.length) {
            return;
        }

        var feature = features[0];
        var konum = event.lngLat;
        
        // Pop-up içeriğini oluşturun
        var popUpIcerik = popUpIcerikOlustur(feature.properties);

        // Pop-up'ı oluşturun ve konuma yerleştirin
        var popUp = new maplibregl.Popup()
            .setLngLat(konum)
            .setHTML(popUpIcerik)
            .addTo(map);
            map.flyTo({ center: konum, zoom: 13 });

        });

    map.addSource('geojsonMarkers5', {
        type: 'geojson',
        data: 'vapurhattı/adalarvapurhattı.json',
    });

    map.addLayer({
        'id': 'markers5',
        'type': 'symbol',
        'source': 'geojsonMarkers5',
        'layout': {
            'icon-image': 'marker5',
            'icon-size': 1,
        },
        'filter': ["==", 0, ["get", "hat-tipi"]]
    });
    map.on('click', "markers5", function (event) {
        console.log(event);

        map.queryRenderedFeatures(event.point).forEach((element) => {
            if (element.id !== undefined)
                console.log(element);
        })
        var features = map.queryRenderedFeatures(event.point, { layers: ['markers5'] });

        if (!features.length) {
            return;
        }

        var feature = features[0];
        var konum = event.lngLat;
        
        // Pop-up içeriğini oluşturun
        var popUpIcerik = popUpIcerikOlustur(feature.properties);

        // Pop-up'ı oluşturun ve konuma yerleştirin
        var popUp = new maplibregl.Popup()
            .setLngLat(konum)
            .setHTML(popUpIcerik)
            .addTo(map);
            map.flyTo({ center: konum, zoom: 13 });

    });
    map.addSource('geojsonMarkers7', {
        type: 'geojson',
        data: 'vapurhattı/avcılar-bostancı.json',
    });

    map.addLayer({
        'id': 'markers7',
        'type': 'symbol',
        'source': 'geojsonMarkers7',
        'layout': {
            'icon-image': 'marker5',
            'icon-size': 1,
        },
        'filter': ["==", 0, ["get", "hat-tipi"]]
    });
    map.on('click', "markers7", function (event) {
        console.log(event);

        map.queryRenderedFeatures(event.point).forEach((element) => {
            if (element.id !== undefined)
                console.log(element);
        })
        var features = map.queryRenderedFeatures(event.point, { layers: ['markers7'] });

        if (!features.length) {
            return;
        }

        var feature = features[0];
        var konum = event.lngLat;
        
        // Pop-up içeriğini oluşturun
        var popUpIcerik = popUpIcerikOlustur(feature.properties);

        // Pop-up'ı oluşturun ve konuma yerleştirin
        var popUp = new maplibregl.Popup()
            .setLngLat(konum)
            .setHTML(popUpIcerik)
            .addTo(map);
            map.flyTo({ center: konum, zoom: 13 });

    });
    map.addSource('geojsonMarkers8', {
        type: 'geojson',
        data: 'vapurhattı/beşiktaş-kadıköy.json',
    });

    map.addLayer({
        'id': 'markers8',
        'type': 'symbol',
        'source': 'geojsonMarkers8',
        'layout': {
            'icon-image': 'marker5',
            'icon-size': 1,
        },
        'filter': ["==", 0, ["get", "hat-tipi"]]
    });
    map.on('click', "markers8", function (event) {
        console.log(event);

        map.queryRenderedFeatures(event.point).forEach((element) => {
            if (element.id !== undefined)
                console.log(element);
        })
        var features = map.queryRenderedFeatures(event.point, { layers: ['markers8'] });

        if (!features.length) {
            return;
        }

        var feature = features[0];
        var konum = event.lngLat;
        
        // Pop-up içeriğini oluşturun
        var popUpIcerik = popUpIcerikOlustur(feature.properties);

        // Pop-up'ı oluşturun ve konuma yerleştirin
        var popUp = new maplibregl.Popup()
            .setLngLat(konum)
            .setHTML(popUpIcerik)
            .addTo(map);
            map.flyTo({ center: konum, zoom: 13 });

    });
    map.addSource('geojsonMarkers9', {
        type: 'geojson',
        data: 'vapurhattı/harem-sirkeci.json',
    });

    map.addLayer({
        'id': 'markers9',
        'type': 'symbol',
        'source': 'geojsonMarkers9',
        'layout': {
            'icon-image': 'marker5',
            'icon-size': 1,
        },
        'filter': ["==", 0, ["get", "hat-tipi"]]
    });
    map.on('click', "markers9", function (event) {
        console.log(event);

        map.queryRenderedFeatures(event.point).forEach((element) => {
            if (element.id !== undefined)
                console.log(element);
        })
        var features = map.queryRenderedFeatures(event.point, { layers: ['markers9'] });

        if (!features.length) {
            return;
        }

        var feature = features[0];
        var konum = event.lngLat;
        
        // Pop-up içeriğini oluşturun
        var popUpIcerik = popUpIcerikOlustur(feature.properties);

        // Pop-up'ı oluşturun ve konuma yerleştirin
        var popUp = new maplibregl.Popup()
            .setLngLat(konum)
            .setHTML(popUpIcerik)
            .addTo(map);
            map.flyTo({ center: konum, zoom: 13 });

    });
    map.addSource('geojsonMarkers10', {
        type: 'geojson',
        data: 'vapurhattı/kadıköyvapurhattı.json',
    });

    map.addLayer({
        'id': 'markers10',
        'type': 'symbol',
        'source': 'geojsonMarkers10',
        'layout': {
            'icon-image': 'marker5',
            'icon-size': 1,
        },
        'filter': ["==", 0, ["get", "hat-tipi"]]
    });
    map.on('click', "markers10", function (event) {
        console.log(event);

        map.queryRenderedFeatures(event.point).forEach((element) => {
            if (element.id !== undefined)
                console.log(element);
        })
        var features = map.queryRenderedFeatures(event.point, { layers: ['markers10'] });

        if (!features.length) {
            return;
        }

        var feature = features[0];
        var konum = event.lngLat;
        
        // Pop-up içeriğini oluşturun
        var popUpIcerik = popUpIcerikOlustur(feature.properties);

        // Pop-up'ı oluşturun ve konuma yerleştirin
        var popUp = new maplibregl.Popup()
            .setLngLat(konum)
            .setHTML(popUpIcerik)
            .addTo(map);
            map.flyTo({ center: konum, zoom: 13 });

    });
    map.addSource('geojsonMarkers11', {
        type: 'geojson',
        data: 'vapurhattı/üsküdarvapurhattı.json',
    });

    map.addLayer({
        'id': 'markers11',
        'type': 'symbol',
        'source': 'geojsonMarkers11',
        'layout': {
            'icon-image': 'marker5',
            'icon-size': 1,
        },
        'filter': ["==", 0, ["get", "hat-tipi"]]
    });
    map.on('click', "markers11", function (event) {
        console.log(event);

        map.queryRenderedFeatures(event.point).forEach((element) => {
            if (element.id !== undefined)
                console.log(element);
        })
        var features = map.queryRenderedFeatures(event.point, { layers: ['markers11'] });

        if (!features.length) {
            return;
        }

        var feature = features[0];
        var konum = event.lngLat;
        
        // Pop-up içeriğini oluşturun
        var popUpIcerik = popUpIcerikOlustur(feature.properties);

        // Pop-up'ı oluşturun ve konuma yerleştirin
        var popUp = new maplibregl.Popup()
            .setLngLat(konum)
            .setHTML(popUpIcerik)
            .addTo(map);
            map.flyTo({ center: konum, zoom: 13 });

    });
    map.addSource('geojsonMarkers6', {
        type: 'geojson',
        data: 'karahattı/marmarayhatlar.json',
    });

    map.addLayer({
        'id': 'markers6',
        'type': 'symbol',
        'source': 'geojsonMarkers6',
        'layout': {
            'icon-image': 'marker6',
            'icon-size': 1,
        },
        'filter': ["==", 0, ["get", "hat-tipi"]]
    });
 map.on('click', "markers6", function (event) {
        console.log(event);

        map.queryRenderedFeatures(event.point).forEach((element) => {
            if (element.id !== undefined)
                console.log(element);
        })
        var features = map.queryRenderedFeatures(event.point, { layers: ['markers6'] });

        if (!features.length) {
            return;
        }

        var feature = features[0];
        var konum = event.lngLat;
        
        var popUpIcerik = popUpIcerikOlustur(feature.properties);

        var popUp = new maplibregl.Popup()
            .setLngLat(konum)
            .setHTML(popUpIcerik)
            .addTo(map);
            map.flyTo({ center: konum, zoom: 13 });
        });
 
    });

function popUpIcerikOlustur(properties) {
    
    return '<div><h4>' + properties["pop-up content"] + '</h4></div>';
}


// map.on('mouseesnter', 'states-layer',()=>{
//     map.getCanvas().style.cursor='pointer';
// })
function addMarkers(e) {
    console.log(e.target.value);
    
    map.loadImage('http://127.0.0.1:5500/images/icons/otobüs.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('marker', image)
        });
        map.loadImage('http://127.0.0.1:5500/images/icons/metro.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('marker2', image)
        });
        map.loadImage('http://127.0.0.1:5500/images/icons/metrobüs.png',
        function (error, image2) {
            if (error) throw error;
            map.addImage('marker3', image2)
        });
        map.loadImage('http://127.0.0.1:5500/images/icons/tramvay.png',
        function (error, image3) {
            if (error) throw error;
            map.addImage('marker4', image3)
        });
        map.loadImage('http://127.0.0.1:5500/images/icons/vapur.png',
        function (error, image4) {
            if (error) throw error;
            map.addImage('marker5', image4)
        });
        map.loadImage('http://127.0.0.1:5500/images/icons/marmaray.png',
        function (error, image5) {
            if (error) throw error;
            map.addImage('marker6', image5)
        });
        
        
        if (e.target.value === 'SEÇİNİZ') {
            // Eğer "SEÇİNİZ" seçildiyse, tüm noktaların görünmesini sağlamak için filtreleri sıfırlayın.
            map.setFilter('markers', ["==", 0, ["get", "hat-tipi"]]);
            map.setFilter('markers2', ["==", 0, ["get", "hat-tipi"]]);
            map.setFilter('markers3', ["==", 0, ["get", "hat-tipi"]]);
            map.setFilter('markers4', ["==", 0, ["get", "hat-tipi"]]);
            map.setFilter('markers5', ["==", 0, ["get", "hat-tipi"]]);
            map.setFilter('markers6', ["==", 0, ["get", "hat-tipi"]]);
            map.setFilter('markers7', ["==", 0, ["get", "hat-tipi"]]);
            map.setFilter('markers8', ["==", 0, ["get", "hat-tipi"]]);
            map.setFilter('markers9', ["==", 0, ["get", "hat-tipi"]]);
            map.setFilter('markers10', ["==", 0, ["get", "hat-tipi"]]);
            map.setFilter('markers11', ["==", 0, ["get", "hat-tipi"]]);
    
            // Zoom düzeyini 9.5 olarak ayarlayın.
            map.flyTo({ zoom: 9.5 });
        } else {
            // Eğer belirli bir hat seçildiyse, filtreleri seçilen hata göre ayarlayın.
            map.setFilter('markers', ["==", e.target.value, ["get", "hat-tipi"]]);
            map.setFilter('markers2', ["==", e.target.value, ["get", "hat-tipi"]]);
            map.setFilter('markers3', ["==", e.target.value, ["get", "hat-tipi"]]);
            map.setFilter('markers4', ["==", e.target.value, ["get", "hat-tipi"]]);
            map.setFilter('markers5', ["==", e.target.value, ["get", "hat-tipi"]]);
            map.setFilter('markers6', ["==", e.target.value, ["get", "hat-tipi"]]);
            map.setFilter('markers7', ["==", e.target.value, ["get", "hat-tipi"]]);
            map.setFilter('markers8', ["==", e.target.value, ["get", "hat-tipi"]]);
            map.setFilter('markers9', ["==", e.target.value, ["get", "hat-tipi"]]);
            map.setFilter('markers10', ["==", e.target.value, ["get", "hat-tipi"]]);
            map.setFilter('markers11', ["==", e.target.value, ["get", "hat-tipi"]]);
    
            // Zoom düzeyini 9.5 olarak ayarlayın.
            map.flyTo({ zoom: 9.5 });
        }

        switch (e.target.value) {
            case 'otobüs':
                        map.TasıtProperties('markers','icon-image','marker');
                break;
        case 'metro':
            map.TasıtProperties('markers2','icon-image','marker2');
            break;
                case 'metrobüs':
                    map.TasıtProperties('markers4','icon-image','marker3');
                break;
                case 'tramvay':
                    map.TasıtProperties('markers3','icon-image','marker4')
                       break;
                       case 'vapur':
                        map.TasıtProperties('markers7','icon-image','marker5');
                        map.TasıtProperties('markers8','icon-image','marker5');
                        map.TasıtProperties('markers9','icon-image','marker5');
                        map.TasıtProperties('markers10','icon-image','marker5');
                        map.TasıtProperties('markers11','icon-image','marker5');
                        map.TasıtProperties('markers5','icon-image','marker5');
                        break;
                        case 'marmaray':
                            map.TasıtProperties('markers6','icon-image','marker6');
                            break;
                            default:
                        map.TasıtProperties('markers','icon-image','marker');
                        break;
        }
    };

// map.on('mouseleave','states-layer',() => {
//     map.getCanvas().style.cursor='';

// })
taşıtdeğiş();

document.getElementById('hatlar').addEventListener('change', (e) => addMarkers(e));


