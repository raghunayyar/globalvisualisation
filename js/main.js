$(document).ready( function() {
  if(!Detector.webgl){
    Detector.addGetWebGLMessage();
  } else {

    var years = ["1995 - 1998","1999 - 2004","2005 - 2009","2010 - 2014"];
    var questions = 14;
    var container = document.getElementById('container');
    var globe = new DAT.Globe(container);

    var i, tweens = [];

    // Toggler for setting the year
    var settime = function(globe, t) {
      return function() {
        new TWEEN.Tween(globe).to({time: t/years.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
        var y = document.getElementById('year'+years[t].substring(0,4));
        if (y.getAttribute('class') === 'year active') {
          return;
        }
        var yy = document.getElementsByClassName('year');
        for(i=0; i<yy.length; i++) {
          yy[i].setAttribute('class','year');
        }
        y.setAttribute('class', 'year active');
      };
    };

    // Toggler for the question
    var setquestion = function(globe, t) {
      return function() {
        new TWEEN.Tween(globe).to({time: t/years.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
        var y = document.getElementById('question'+ t);
        if (y.getAttribute('class') === 'question active') {
          return;
        }
        var yy = document.getElementsByClassName('question');
        for(i=0; i<yy.length; i++) {
          yy[i].setAttribute('class','question');
        }
        y.setAttribute('class', 'question active');
      };
    };

    for(var i = 0; i<years.length; i++) {
      var y = document.getElementById('year'+years[i].substring(0,4));
      y.addEventListener('click', settime(globe,i), false);
    }

    for(var i = 1; i<questions; i++) {
      var y = document.getElementById('question' + i);
      y.addEventListener('click', setquestion(globe,i), false);
    }

    var xhr;
    TWEEN.start();

    // XHR for question 3
    $('#question3').click(function() {
      xhr = new XMLHttpRequest();
      xhr.open('GET', "data/globalcitizen.json", true);
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            window.data = data;
            for (i=0;i<data.length;i++) {
              globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
            }
            globe.createPoints();
            settime(globe,0)();
            globe.animate();
            document.body.style.backgroundImage = 'none'; // remove loading
          }
        }
      };
      xhr.send(null);
    });

    $.get('data/defaults/country.json', function(data) {
      var object = [
        [
          "1995 - 1998",
          []
        ],
        [
          "1999 - 2004",
          []
        ],
        [
          "2005 - 2009",
          []
        ],
        [
          "2010 - 2014",
          [

          ]
        ]
      ]
      for (var i=0; i< data.length; i++) {
        for (var j=0; j< object.length; j++) {
          //object[j][1].push(data[i].latlng.toString());
          object[j][1].push(data[i].name.common);
        }
        //data[i].latlng.toString();
      }
      // Should be final data structure
      createobject(object,data);

    })

    function createobject (object,locationdata) {
      var year = 3; // which year to draw
      $.get('data/defaults/temp.json', function(data) {
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            if (object[year][1].indexOf(key) === -1) {
            } else {
              addvalue(key, object, data,year);
            }
          }
        }

        object = addzero(object,year);
        removelocation(object, locationdata,year);
      })
    }

    // Adds the value from the temp JSON file
    function addvalue(key,object,data,year) {
      var temp = object[year][1][object[year][1].indexOf(key)] + ',' + (data[key]/100).toString();
      object[year][1][object[year][1].indexOf(key)] = temp;
    }

    // Removes location name and adds coordinates

    function removelocation(object, locationdata,year) {
      for (var i=0; i< object[year][1].length; i++) {
        object[year][1][i] = object[year][1][i].substring(object[year][1][i].indexOf(","));
        object[year][1][i] = locationdata[i].latlng.toString() + object[year][1][i];
      }

      object = finalobject(object,year);
      console.log(object);
    }

    function finalobject(object,year) {
      object[year][1] = object[year][1].toString().split(',').map(Number);
      return object;
    }

    // Replaces location not found with a zero.
    function addzero(strArray,year) {
      var str = ',';
      for (var j=0; j<strArray[year][1].length; j++) {
          if (!strArray[year][1][j].match(str)) {
            strArray[year][1][j] = strArray[year][1][j] + ',0';
          }
      }
      return strArray;
    }
  }
});
