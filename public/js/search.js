const search = document.querySelector('#search_btn');
$(search).click(function (){
   alert("검색..");
});

//Time 지정 검색
var now = new Date();
var real_now = new Date();
getDefaultSetting(now);
var hour, minute, second, time, year, month, day, date;
var searchcheck=false;
var search_from;
var search_to;
//지난 7일 총인원이 default
getWeekData();
submit();


function getDefaultSetting(now){
  hour = now.getHours()>9 ? ''+now.getHours() : '0'+now.getHours();
  minute = now.getMinutes()>9 ? ''+now.getMinutes() : '0'+now.getMinutes();
  second = '00';
  time = hour + ":" + minute + ":" + second;
  if(hour<8){
      var yesterDate = now.getTime() - (1 * 24 * 60 * 60 *1000);
      now.setTime(yesterDate);
      time="20:00:00"; //전날 끝 시간 초기 값
  }
  if(hour>=20){
    time="20:00:00";
  }
  year = now.getFullYear();
  month = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
  day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
  date = year + '-' + month + '-' + day;

  /*
  교수님이 처음에 말씀하신 초기 값
  $('#date_from').val(date);
  $('#date_to').val(date);
  $('#time_from').val('08:00:00'); //시작 초기 값
  $('#time_to').val(time);*/
}

function timeToString(now){
  var h1 = now.getHours()>9 ? ''+now.getHours() : '0'+now.getHours();
  var m1 = now.getMinutes()>9 ? ''+now.getMinutes() : '0'+now.getMinutes();
  var s1 = '00';
  var t1 = h1 + ":" + m1 + ":" + s1;

  var y1 = now.getFullYear();
  var m2 = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
  var d1 = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
  var d = y1 + '-' + m2 + '-' + d1;

  return d+" "+t1;
}

function lastWeek() {
  var d = new Date();
  var dayOfMonth = d.getDate()
  d.setDate(dayOfMonth - 6)
  return d;
}

function lastDay() {
  var d = new Date();
  var dayOfMonth = d.getDate()
  d.setDate(dayOfMonth - 1)
  return d;
}

function lastHour() {
  var d = new Date();
  var lh = d.getHours()
  d.setHours(lh - 1);
  return d;
}

function getDate(d){
  var y = d.getFullYear();
  var m = (d.getMonth()+1)>9 ? ''+(d.getMonth()+1) : '0'+(d.getMonth()+1);
  var n = d.getDate()>9 ? ''+d.getDate() : '0'+d.getDate();
  return y + '-' + m + '-' + n;
}

function getTime(d){
  var h = d.getHours()>9 ? ''+d.getHours() : '0'+d.getHours();
  var m = d.getMinutes()>9 ? ''+d.getMinutes() : '0'+d.getMinutes();
  var s= '00';
  return h + ":" + m + ":" + s;
}

function getWeekData(){
  var lastweek = lastWeek();
  $('#date_from').val(getDate(lastweek)); //date
  $('#date_to').val(getDate(real_now)); // real_now
  $('#time_from').val(getTime(lastweek)); //'00:00:00'
  $('#time_to').val(getTime(real_now)); //'00:00:00'
}

const btn0 = document.querySelector('#chartBtn0');
const btn1 = document.querySelector('#chartBtn1');
const btn2 = document.querySelector('#chartBtn2');
const btn3 = document.querySelector('#chartBtn3');

function submit(){
  var result_from = $('#date_from').val()+" "+$('#time_from').val()+":00";
  $('#result_from').val(result_from.substr(0,19));
  var result_to = $('#date_to').val()+" "+$('#time_to').val()+":00";
  $('#result_to').val(result_to.substr(0,19));
}

$(btn0).click(function(){
  searchcheck=true;
  submit();
  search_from=$('#result_from').val();
  search_to=$('#result_to').val();
});

$(btn1).click(function(){
  getWeekData();
  submit();
});

$(btn2).click(function(){
  var lastday = lastDay();
  $('#date_from').val(getDate(lastday)); //date
  $('#date_to').val(getDate(real_now)); //date
  $('#time_from').val(getTime(lastday)); //'08:00:00'
  $('#time_to').val(getTime(real_now)); //time
  submit();
});

$(btn3).click(function(){
  var lasthour = lastHour();
  $('#date_from').val(getDate(lasthour)); //date
  $('#date_to').val(getDate(real_now)); //date
  $('#time_from').val(getTime(lasthour)); //'08:00:00'
  $('#time_to').val(getTime(real_now)); //time
  submit();
});

//date 바꾸었을때도 input에 적용되게 동기화
var date_change = document.querySelector('#date_from');
var date_change2 = document.querySelector('#date_to');
var time_change = document.querySelector('#time_from');
var time_change2 = document.querySelector('#time_to');
date_change.addEventListener('change', (event) => {
  submit();
});
time_change.addEventListener('change', (event) => {
  submit();
});
date_change2.addEventListener('change', (event) => {
  submit();
});
time_change2.addEventListener('change', (event) => {
  submit();
});

document.querySelector('#searchBtn').addEventListener('click', function(){
  var data = {"starttime": document.getElementById('result_from').value, "endtime": document.getElementById('result_to').value};
  //var data = {"starttime": '2020-07-26 12:00:22', "endtime": '2020-08-02 12:00:22'};
  console.log(data);
  data = JSON.stringify(data);

  // content-type을 설정하고 데이터 송신
  var xhr = new XMLHttpRequest();
  xhr.open('POST', './search');
  xhr.setRequestHeader('Content-type', "application/json");
  xhr.send(data);

  // 데이터 수신이 완료되면 표시
  xhr.addEventListener('load', function(){
    console.log(xhr.responseText);
    var result = JSON.parse(xhr.responseText);
    var dt1 = result.data1;
    var dt2 = result.data2;
    var dt3 = result.data3;
    var dt4 = result.data4;
    var dt5 = result.data5;

    console.log(dt3);
    console.log(dt4);
    console.log(dt5);

    var color = ['#4abd9e', '#4097f5', '#f68645', '#dd497d', '#febe27', '#a14cfc', '#84c460', '#fa4cd7', '#3ed4de', '#fc5551'];
    var today = new Date(document.getElementById('result_from').value.replace('-','/').replace('-','/').substring(0,10));
    var startTime = new Date(document.getElementById('result_to').value.replace('-','/').replace('-','/').substring(0,10));
    var endTime = new Date(document.getElementById('result_from').value.replace('-','/').replace('-','/').substring(0,10));
    var dateD1 = new Date(document.forms[0].elements[5].value.replace('-','/').replace('-','/').substring(0,10));
    var dateTemp = new Date(document.forms[0].elements[5].value.replace('-','/').replace('-','/').substring(0,10));


    document.getElementById('myChart4').style.display = 'none';
    document.getElementById('myChart3').style.display = 'none';
    document.getElementById('myChart2').style.display = 'none';
    document.getElementById('myChart1').style.display = 'none';
    document.getElementById('chartBtn1').className = 'criteria';
    document.getElementById('chartBtn2').className = 'criteria';
    document.getElementById('chartBtn3').className = 'criteria';

    $('.img_wrapper').children().remove();

    for(var i=0; i<dt2.length; i++) {
      $('.img_wrapper').eq(dt2[i].cameraID-1).append('<div class="img_date"><img src="./resources/images/original/'+dt2[i].name+'" alt="" value="'+dt2[i].cameraID+'" onclick=\'showDetail("'+dt2[i].name+'", "'+dt2[i].cameraID+'", "'+dt2[i].regDate+'", "'+dt2[i].peopleCNT+'");\' /><br><p style="display:inline-block;">'+dt2[i].regDate+'</p><p style="display: inline-block; float:right; padding-right: 20px;">'+dt2[i].peopleCNT+'명</p></div>');
    }

    for(var i=0; i<dt1.camNum; i++){
      console.log($('.img_wrapper').eq(i).children());

      if($('.img_wrapper').eq(i).children().length == 0){
        $('.img_wrapper').eq(i).append('<div class="append">No Image</div>');
      }
    }
  });
});
