var time_paused;
var url_prefix = ".timeshifting.rsr.ch/feed.mp3?date=";

var feeds = Array(
["rsr1","La première"],
["rsr2","Espace 2"],
["rsr3","Couleur 3"],
["rsr4","Option Musique"]
);

function volch() {
 vol = document.getElementById('vol');
 player.volume = Number(vol.value);
}

function pop() {
  blam = false;
  plpa = document.getElementById('plpa');
  stst = document.getElementById('stst');
  player= document.getElementById('player');
  source = document.getElementById('src');
  chan = document.getElementById("cs");
  for (e in feeds) {    // fill combobox
   var o = document.createElement("option");
   o.value = e; o.innerHTML = feeds[e][1];
   chan.appendChild(o);
  }
  document.getElementById("dt").value = new Date().toISOString().slice(0,19);
  playingHndlr();
  dt.onchange = function() {blam = false;};
}

function sameselected() {
 return (source.src.indexOf(feeds[chan.value][0]) > 0);
}

function togglestartstop() {
if (player.paused == true || !sameselected() || !blam) {// selected != current -> replace
 tuneto(document.getElementById('cs').value, document.getElementById('dt').value);
 plpa.value="\u23F8";
 blam=true;
 } else {
 player.stop();
 plpa.value="\u23F8";
 }
}

function tuneto(chan, time) {
 var url =  "http://"+ feeds[chan][0] + url_prefix + genTimeStamp(time);
 source.src = url;
 player.load();
 player.play();
 blam = true;
}

function toggleplay() {
if (source.src == "") return togglestartstop();
if (player.paused) {player.play(); plpa.value="\u23F8";}
else { player.pause(); plpa.value="\u25B6";}

}

function incTrg() {
playitvl= window.setInterval(
 function () {
  d = new Date(p.value);
  d.setSeconds(d.getSeconds()+1);
  p.value = d.toISOString().slice(0,19);
}, 1000); }

function pzTrg() {
  window.clearInterval(playitvl);
}

function playingHndlr() {
  p = document.getElementById('dt'); // init!
  player.onplaying = incTrg;
  player.onpause = pzTrg;
  player.ondurationchange = pzTrg; // remove interval when changing channel
}

function genTimeStamp(d) {
return d+'Z';
}
