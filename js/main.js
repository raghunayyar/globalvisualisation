$(document).ready( function() {
  if(!Detector.webgl){
    Detector.addGetWebGLMessage();
  } else {

    var years = ["1995 - 1998","1999 - 2004","2005 - 2009","2010 - 2014"];
    var questions = 12;
    var container = document.getElementById('container');
    var globe = new DAT.Globe(container);

    var defaultObj =
    [
      ["1995 - 1998",[]],
      ["1999 - 2004",[]],
      ["2005 - 2009",[]],
      ["2010 - 2014",[]]
    ];

    var i, tweens = [];

    globe.createPoints();

    globe.animate();

    var pushdata = function (data) {
      this.data = [];
      this.data = data;
    };

    var getdata = function () {
      return this.data;
    };


    var toggleactivity = function(el) {
      var yy = document.getElementsByClassName('question');
      for(i=0; i<yy.length; i++) {
        yy[i].setAttribute('class','question');
      }
      el.setAttribute('class', 'question active');
    }

    $('#question1').click(function() {
      toggleactivity(this);
      $.get('data/aids.json', function(data) {
        globe.reset();
        for ( var i = 0; i < data.length; i ++ ) {
          globe.addData( data[i][1], {format: 'magnitude', name: data[i][0]} );
          pushdata(data);
        }
        globe.createPoints();
        globe.animate();
      });
    });

    $('#question2').click(function() {
      toggleactivity(this);
      $.get('data/criminal.json', function(data) {
        globe.reset();
        for ( var i = 0; i < data.length; i ++ ) {
          globe.addData( data[i][1], {format: 'magnitude', name: data[i][0]} );
          pushdata(data);
        }
        globe.createPoints();
        globe.animate();
      });
    });

    $('#question3').click(function() {
      toggleactivity(this);
      $.get('data/drinkers.json', function(data) {
        globe.reset();
        for ( var i = 0; i < data.length; i ++ ) {
          globe.addData( data[i][1], {format: 'magnitude', name: data[i][0]} );
          pushdata(data);
        }
        globe.createPoints();
        globe.animate();
      });
    });

    $('#question4').click(function() {
      toggleactivity(this);
      $.get('data/drugs.json', function(data) {
        globe.reset();
        for ( var i = 0; i < data.length; i ++ ) {
          globe.addData( data[i][1], {format: 'magnitude', name: data[i][0]} );
        }
        globe.createPoints();
        globe.animate();
      });
    });

    $('#question5').click(function() {
      toggleactivity(this);
      $.get('data/emotional.json', function(data) {
        globe.reset();
        for ( var i = 0; i < data.length; i ++ ) {
          globe.addData( data[i][1], {format: 'magnitude', name: data[i][0]} );
          pushdata(data);
        }
        globe.createPoints();
        globe.animate();
      });
    });

    $('#question6').click(function() {
      toggleactivity(this);
      $.get('data/extremists.json', function(data) {
        for ( var i = 0; i < data.length; i ++ ) {
          globe.addData( data[i][1], {format: 'magnitude', name: data[i][0]} );
          pushdata(data);
        }
        globe.createPoints();
        globe.animate();
      });
    });

    $('#question7').click(function() {
      toggleactivity(this);
      $.get('data/homosexual.json', function(data) {
        globe.reset();
        for ( var i = 0; i < data.length; i ++ ) {
          globe.addData( data[i][1], {format: 'magnitude', name: data[i][0]} );
          pushdata(data);
        }
        globe.createPoints();
        globe.animate();
      });
    });

    $('#question8').click(function() {
      toggleactivity(this);
      $.get('data/narcos.json', function(data) {
        globe.reset();
        for ( var i = 0; i < data.length; i ++ ) {
          globe.addData( data[i][1], {format: 'magnitude', name: data[i][0]} );
          pushdata(data);
        }
        globe.createPoints();
        globe.animate();
      });
    });

    $('#question9').click(function() {
      toggleactivity(this);
      $.get('data/medianage.json', function(data) {
        globe.reset();
        for ( var i = 0; i < data.length; i ++ ) {
          globe.addData( data[i][1], {format: 'magnitude', name: data[i][0]} );
          pushdata(data);
        }
        globe.createPoints();
        globe.animate();
      });
    });

    $('#question10').click(function() {
      toggleactivity(this);
      $.get('data/selfemployment.json', function(data) {
        globe.reset();
        for ( var i = 0; i < data.length; i ++ ) {
          globe.addData( data[i][1], {format: 'magnitude', name: data[i][0]} );
          pushdata(data);
        }
        globe.createPoints();
        globe.animate();
      });
    });

    $('#question11').click(function() {
      toggleactivity(this);
      $.get('data/prostate.json', function(data) {
        globe.reset();
        for ( var i = 0; i < data.length; i ++ ) {
          globe.addData( data[i][1], {format: 'magnitude', name: data[i][0]} );
          pushdata(data);
        }
        globe.createPoints();
        globe.animate();
      });
    });


    var change = function(i) {
      return function() {
        console.log(i);
        globe.reset();
        console.log(i);
        var data = getdata();
        console.log(data);
        globe.addData(data[i][1], {format: 'magnitude', name: data[i][0]});
        globe.createPoints();
        globe.animate();


        var y = document.getElementById('year'+years[i].substring(0,4));
        if (y.getAttribute('class') === 'year active') {
          return;
        }

        var yy = document.getElementsByClassName('year');
        for(var j=0; j<yy.length; j++) {
          yy[j].setAttribute('class','year');
        }
        y.setAttribute('class', 'year active');
      };
    }

    for(var i = 0; i<years.length; i++) {
      var y = document.getElementById('year' + years[i].substring(0,4));
      y.addEventListener('mouseenter', change(i), false);
    }

    TWEEN.start();
  }
});
