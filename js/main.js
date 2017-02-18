if(!Detector.webgl){
  Detector.addGetWebGLMessage();
} else {

  var years = ["1995 - 1998","1999 - 2004","2005 - 2009","2010 - 2014"];

  var container = document.getElementById('container');
  var globe = new DAT.Globe(container);

  console.log(globe);
  var i, tweens = [];

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

  for(var i = 0; i<years.length; i++) {
    var y = document.getElementById('year'+years[i].substring(0,4));
    y.addEventListener('click', settime(globe,i), false);
  }

  var xhr;
  TWEEN.start();


  xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://127.0.0.1:8080/data/globalcitizen.json', true);
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
}