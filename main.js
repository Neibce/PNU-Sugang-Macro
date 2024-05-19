const request = require('request');
const readline = require('readline');
const rsa = require('./rsa');
const COOKIE = "{YOUR COOKIE}";
const CSRFTOKEN = "{YOUR CSRF_TOKEN}";
const TIMETO = [8,0,0]; //TARGET H,M,S
const SUBJECTS = [
  {'코드': '', '분반': '', '교과목명': '', status: '', statusCode : -1},
  {'코드': '', '분반': '', '교과목명': '', status: '', statusCode : -1},
  {'코드': '', '분반': '', '교과목명': '', status: '', statusCode : -1}
];
const loginUser = {"YOUR USER_DATA":""};

var RSAModulus = "{YOUR RSAModulus}";
var RSAExponent = "{YOUR RSAExponent}";
var _rsa = new rsa.RSAKey();
_rsa.setPublic(RSAModulus, RSAExponent);

function gfn_str_getByteLength(s) {/*...*/}

function fn_ajax_enc_param(str) {/*...*/}

function gfn_str_parseNull(object) {/*...*/}

function gfn_ajax_request(options, success, failed) {/*...*/} // success, failed == callback function

function isEmpty(value) {/*...*/}

function getParam(subjNo, classNo, subjNM, loginUser) {/*...*/}

function timeToInt(t){
  return t[0] * 1000 + t[1] * 10 + t[0];
}

function checkTime(callback){
  gfn_ajax_request({url : "/g***", reqData : {}},
  function(body){
    let today_str;
    /* ... */
    let t = [h,m,s];
    callback(200, t);
  }, function(resCode){callback(resCode)});
}

function tictoc(time){
  readline.moveCursor(process.stdout,0,-1);
  readline.clearScreenDown(process.stdout);
  console.log('TICTOC(WAIT) - CURR : ' + time + ' / TARG : ' + TIMETO + ' ...');
  if(timeToInt(time) >= timeToInt(TIMETO)){
    console.log("TARG TIME!");
    run();
    return;
  }

  let nextTime = new Array(3);
  nextTime[2] = ++time[2] % 60;
  nextTime[1] = (time[1] + (nextTime[2] == 0)) % 60;
  nextTime[0] = (time[0] + (nextTime[1] == 0 && nextTime[2] == 0)) % 24;
  setTimeout(function(){tictoc(nextTime)}, 1000);
}

const st = ['대기', '실패', '성공', '전송'];
let frame = 0;
function load(){
  if(frame){
    readline.moveCursor(process.stdout, 0, - SUBJECTS.length - 1);
    readline.clearScreenDown(process.stdout);
  }
  console.log('f-' + ++frame);
  
  let cnt = 0;
  SUBJECTS.forEach((e) => {
    console.log(e.코드 + '-' + e.분반 + ' : ' + e.교과목명.padEnd(10) + ' :['+ st[e.statusCode + 1] +']'+  e.status);
    if(e.statusCode == 0 || e.statusCode == 1)
      cnt++;
  });
  if(cnt == SUBJECTS.length)
    return console.log("END.");
  setTimeout(load, 1000);
}

function req(i){
  gfn_ajax_request({url : "/l***", reqData : getParam(SUBJECTS[i].코드, SUBJECTS[i].분반, SUBJECTS[i].교과목명, loginUser)}, function(body){
    let json = JSON.parse(body);
    SUBJECTS[i].statusCode /* = ... */;
    SUBJECTS[i].status /* = ... */;
  }, function(resCode){req(i)});
}

function run(){
  console.log('-----');
  console.log('!!! START !!!');

  for(let i = 0; i < SUBJECTS.length; i++){
    SUBJECTS[i].statusCode = 2;
    req(i);
  }
  load();
}

console.clear();
console.log('--- PNU MACRO ---');
console.log('initialize ok.');

checkTime(function(resCode, time){
  if(resCode != 200)
    return console.log('ERR! - TIME CHECK: ' + resCode);
  console.log('OK! - PNU SERVER TIME : ' + time);
  console.log('-----');
  console.log('ERZ');
  tictoc(time);
});

