

var authorization;
var start_time = "2023-05-16 00:18"; // 需要输入的开始睡眠时间

var start_timestamp = Date.parse(start_time); // 毫秒

var phone = ""; // 需要输入的用户手机号
var cpcContent;
var rrContent;


const cpcFileInput = document.getElementById('cpc-file-input');
const rrFileInput = document.getElementById('rr-file-input');
const phoneInput = document.getElementById('phone-input');
const starttimeInput = document.getElementById('starttime-input');
const fileInputWrapper = document.getElementById('file-input-wrapper');

cpcFileInput.addEventListener('change', e => {
  const cpcFile = e.target.files[0];

  const cpcReader = new FileReader();

  cpcReader.onload = e => {
    cpcContent = e.target.result;
  };

  cpcReader.readAsText(cpcFile);
});
rrFileInput.addEventListener('change', e => {
  const rrFile = e.target.files[0];
  // 获取文件名部分
  const fileName = rrFile.name.split('.').slice(0, -1).join('.');
  document.title = fileName;

  const rrReader = new FileReader();

  rrReader.onload = e => {
    rrContent = e.target.result;
  };

  rrReader.readAsText(rrFile);
});

function startCreatePDF() {

  phone = phoneInput.value
  start_time = starttimeInput.value;
  start_timestamp = Date.parse(start_time); // 毫秒
  
  $.ajaxSetup({
    beforeSend: function (xhr) {
      if (authorization != null) {
        xhr.setRequestHeader('Authorization', authorization)
      }
    }
  })
  $.get("https://miniprogram.semacare.cn/api/wx/user/login-phone?phone=" + phone + "&code=998080", function (data, status) {
    if (status == "success") {
      authorization = data["data"];
      $.get("https://miniprogram.semacare.cn/api/member/get-current-user-member-info", function (data, status) {
        if (status == "success") {
          $("#idname").text(data["data"]["name"]);
          $("#idgender").text(data["data"]["gender"] == 1 ? "男" : "女");
          $("#idage").text(birthday2age(data["data"]["birthdate"])+"岁");
          var height = data["data"]["height"];
          var weight = data["data"]["weight"];
          $("#idheight").text(height + "cm");
          $("#idweight").text(weight + "kg");
          var h = Number("1.57");
          var w = Number("60");
          $("#idbmi").text(Math.round(w / (h * h) * 10) / 10); // 这样做是为了保留小数点后一位
        }
      });
    }
  })

  processData();
  
  // 在文件选择后隐藏文件输入框
  fileInputWrapper.style.display = 'none';

};

// fetch('/Users/golfy/Documents/睡眠文档/sleepReport/Sleepreport_liu/王尔卓.txt')
// .then(res => res.text())
// .then(con => {
//   processData(con);
// })
// .catch(err => console.error(err));

function processData() {

  var c = {};
  var restful_sleep_total_count = 0  //  3
  var restful_sleep_count_arr = [] 
  var restful_sleep_count = 0
  var last_restful_sleep = ""
  var central_apnea_total_count = 0  //  2
  var central_apnea_count_arr = [] 
  var central_apnea_count = 0
  var last_central_apnea = ""
  var apnea_total_count = 0 // 1
  var apnea_count_arr = [] 
  var apnea_count = 0
  var last_apnea = ""
  var unknown_others_total_count = 0 // 0
  var unknown_others_count_arr = [] 
  var unknown_others_count = 0
  var last_unknown_others = ""
  var disturbed_sleep_total_count = 0 // -1
  var disturbed_sleep_count_arr = [] 
  var disturbed_sleep_count = 0
  var last_disturbed_sleep = ""
  var wake_rem_total_count = 0 // -2
  var wake_rem_count_arr = [] 
  var wake_rem_count = 0
  var last_wake_rem = ""

  var sleep_time_arr = []
  var sleep_value_arr = []

  const all_text = cpcContent.split('\n');
  const all_text1 = rrContent.split('\n');

  var last_line = all_text[all_text.length-2].split(/\s+/)

  all_text.forEach(line => {
    line_arr = line.split("\n")[0].split(" ")

    res = line_arr[1]

    sleep_time_arr.push(line_arr[0])
    sleep_value_arr.push(res)

    
    if (res == "3") {
        restful_sleep_total_count = restful_sleep_total_count + 1

        if (last_restful_sleep == "")
            restful_sleep_count = 1
        else
            restful_sleep_count += 1

        if (last_central_apnea != "") {
            central_apnea_count_arr.push(central_apnea_count)
            central_apnea_count = 0
            last_central_apnea = "" }
        if (last_apnea != "") {
            apnea_count_arr.push(apnea_count)
            apnea_count = 0
            last_apnea = "" }
        if (last_unknown_others != "") {
            unknown_others_count_arr.push(unknown_others_count)
            unknown_others_count = 0
            last_unknown_others = "" }
        if (last_disturbed_sleep != "") {
            disturbed_sleep_count_arr.push(disturbed_sleep_count)
            disturbed_sleep_count = 0
            last_disturbed_sleep = "" }
        if (last_wake_rem != "") {
            wake_rem_count_arr.push(wake_rem_count)
            wake_rem_count = 0
            last_wake_rem = "" }

        last_restful_sleep = res
    } else if (res == "2") {
        central_apnea_total_count = central_apnea_total_count + 1

        if (last_central_apnea == "")
            central_apnea_count = 1
        else
            central_apnea_count += 1

        if (last_restful_sleep != "") {
            restful_sleep_count_arr.push(restful_sleep_count)
            restful_sleep_count = 0
            last_restful_sleep = "" }
        if (last_apnea != "") {
            apnea_count_arr.push(apnea_count)
            apnea_count = 0
            last_apnea = "" }
        if (last_unknown_others != "") {
            unknown_others_count_arr.push(unknown_others_count)
            unknown_others_count = 0
            last_unknown_others = "" }
        if (last_disturbed_sleep != "") {
            disturbed_sleep_count_arr.push(disturbed_sleep_count)
            disturbed_sleep_count = 0
            last_disturbed_sleep = "" }
        if (last_wake_rem != "") {
            wake_rem_count_arr.push(wake_rem_count)
            wake_rem_count = 0
            last_wake_rem = "" }

        last_central_apnea = res
    } else if (res == "1") {
        apnea_total_count = apnea_total_count + 1

        if (last_apnea == "")
            apnea_count = 1
        else
            apnea_count += 1

        if (last_central_apnea != "") {
            central_apnea_count_arr.push(central_apnea_count)
            central_apnea_count = 0
            last_central_apnea = "" }
        if (last_restful_sleep != "") {
            restful_sleep_count_arr.push(restful_sleep_count)
            restful_sleep_count = 0
            last_restful_sleep = "" }
        if (last_unknown_others != "") {
            unknown_others_count_arr.push(unknown_others_count)
            unknown_others_count = 0
            last_unknown_others = "" }
        if (last_disturbed_sleep != "") {
            disturbed_sleep_count_arr.push(disturbed_sleep_count)
            disturbed_sleep_count = 0
            last_disturbed_sleep = "" }
        if (last_wake_rem != "") {
            wake_rem_count_arr.push(wake_rem_count)
            wake_rem_count = 0
            last_wake_rem = "" }

        last_apnea = res
    } else if (res == "0") {
        unknown_others_total_count = unknown_others_total_count + 1

        if (last_unknown_others == "")
            unknown_others_count = 1
        else
            unknown_others_count += 1

        if (last_central_apnea != "") {
            central_apnea_count_arr.push(central_apnea_count)
            central_apnea_count = 0
            last_central_apnea = "" }
        if (last_apnea != "") {
            apnea_count_arr.push(apnea_count)
            apnea_count = 0
            last_apnea = "" }
        if (last_restful_sleep != "") {
            restful_sleep_count_arr.push(restful_sleep_count)
            restful_sleep_count = 0
            last_restful_sleep = "" }
        if (last_disturbed_sleep != "") {
            disturbed_sleep_count_arr.push(disturbed_sleep_count)
            disturbed_sleep_count = 0
            last_disturbed_sleep = "" }
        if (last_wake_rem != "") {
            wake_rem_count_arr.push(wake_rem_count)
            wake_rem_count = 0
            last_wake_rem = "" }

        last_unknown_others = res
    } else if (res == "-1") {
        disturbed_sleep_total_count = disturbed_sleep_total_count + 1

        if (last_disturbed_sleep == "")
            disturbed_sleep_count = 1
        else
            disturbed_sleep_count += 1

        if (last_central_apnea != "") {
            central_apnea_count_arr.push(central_apnea_count)
            central_apnea_count = 0
            last_central_apnea = "" }
        if (last_apnea != "") {
            apnea_count_arr.push(apnea_count)
            apnea_count = 0
            last_apnea = "" }
        if (last_unknown_others != "") {
            unknown_others_count_arr.push(unknown_others_count)
            unknown_others_count = 0
            last_unknown_others = "" }
        if (last_restful_sleep != "") {
            restful_sleep_count_arr.push(restful_sleep_count)
            restful_sleep_count = 0
            last_restful_sleep = "" }
        if (last_wake_rem != "") {
            wake_rem_count_arr.push(wake_rem_count)
            wake_rem_count = 0
            last_wake_rem = ""      }

        last_disturbed_sleep = res
    } else {
        wake_rem_total_count = wake_rem_total_count + 1

        if (last_wake_rem == "")
            wake_rem_count = 1
        else
            wake_rem_count += 1

        if (last_central_apnea != "") {
            central_apnea_count_arr.push(central_apnea_count)
            central_apnea_count = 0
            last_central_apnea = "" }
        if (last_apnea != "") {
            apnea_count_arr.push(apnea_count)
            apnea_count = 0
            last_apnea = "" }
        if (last_unknown_others != "") {
            unknown_others_count_arr.push(unknown_others_count)
            unknown_others_count = 0
            last_unknown_others = "" }
        if (last_disturbed_sleep != "") {
            disturbed_sleep_count_arr.push(disturbed_sleep_count)
            disturbed_sleep_count = 0
            last_disturbed_sleep = "" }
        if (last_restful_sleep != "") {
            restful_sleep_count_arr.push(restful_sleep_count)
            restful_sleep_count = 0
            last_restful_sleep = "" }

        last_wake_rem = res
      }
  });
  c["restful_sleep_total_count"] = String(restful_sleep_total_count)
  c["restful_sleep_count_arr"] = restful_sleep_count_arr
  c["central_apnea_total_count"] = String(central_apnea_total_count)
  c["central_apnea_count_arr"] = central_apnea_count_arr
  c["apnea_total_count"] = String(apnea_total_count)
  c["apnea_count_arr"] = apnea_count_arr
  c["unknown_others_total_count"] = String(unknown_others_total_count)
  c["unknown_others_count_arr"] = unknown_others_count_arr
  c["disturbed_sleep_total_count"] = String(disturbed_sleep_total_count)
  c["disturbed_sleep_count_arr"] = disturbed_sleep_count_arr
  c["wake_rem_total_count"] = String(wake_rem_total_count)
  c["wake_rem_count_arr"] = wake_rem_count_arr

  c["sleep_time_arr"] = sleep_time_arr
  c["sleep_value_arr"] = sleep_value_arr
  c["sleep_time"] = last_line[0]
  c["on_bed_time"] = last_line[0]

  var max_hr = 0;
  var min_hr = 999;
  var count = 0;
  var total = 0;
  var hr_value_arr = [];
  var hr_time_arr = []

  all_text1.forEach(line => {
    line_arr = line.split(/\s+/)

    if (line_arr.length < 3) {
      return
    }

    rr_value = line_arr[1]
    hr_value = 60/parseFloat(rr_value)

    if (hr_value > 120 || hr_value < 50)
        return

    hr_value_arr.push(String(hr_value))

    hr_time = line_arr[0]
    hr_time_arr.push(String(hr_time))

    if (max_hr <= hr_value)
        max_hr = hr_value
    if (min_hr >= hr_value)
        min_hr = hr_value
    total += hr_value
    count += 1
  });

  mean_hr = total / count

  c["max_hr"] = Math.floor(max_hr).toString();
  c["min_hr"] = Math.floor(min_hr).toString();
  c["mean_hr"] = Math.floor(mean_hr).toString();
  c["hr_time_arr"] = hr_time_arr
  c["hr_value_arr"] = hr_value_arr

  processResultData(c);
}

function processResultData(result) {

  var restful_sleep_total_count = Number(result["restful_sleep_total_count"]);
  var restful_sleep_count_arr = result["restful_sleep_count_arr"];
  var central_apnea_total_count = Number(result["central_apnea_total_count"]);
  var central_apnea_count_arr = result["central_apnea_count_arr"];
  var apnea_total_count = Number(result["apnea_total_count"]);
  var apnea_count_arr = result["apnea_count_arr"];
  var unknown_others_total_count = Number(result["unknown_others_total_count"]);
  var unknown_others_count_arr = result["unknown_others_count_arr"];
  var disturbed_sleep_total_count = Number(result["disturbed_sleep_total_count"]);
  var disturbed_sleep_count_arr = result["disturbed_sleep_count_arr"];
  var wake_rem_total_count = Number(result["wake_rem_total_count"]);
  var wake_rem_count_arr = result["wake_rem_count_arr"];

  var sleep_time_arr = result["sleep_time_arr"];
  var sleep_value_arr = result["sleep_value_arr"];
  var sleep_time = Number(result["sleep_time"]);
  var on_bed_time = Number(result["on_bed_time"]);

  var sleep_time_str = Math.floor(sleep_time / 3600) + "小时" + Math.ceil(sleep_time / 60 % 60) + "分钟";
  var on_bed_time_str = sleep_time_str;

  $("#sleep_time").text(sleep_time_str);
  var end_timestamp = new Date(start_timestamp + sleep_time * 1000).toLocaleString();
  var end_time = end_timestamp.substring(0, end_timestamp.length - 3);
  $("#sleep_time_range").text(start_time + " ~ " + end_time);
  $("#on_bed_time").text(on_bed_time_str);
  $("#on_bed_time_range").text(start_time + " ~ " + end_time);

  $("#sleep_total_time").text(sleep_time_str);
  $("#pre_sleep_time").text("待补充");
  $("#wake_count").text(wake_rem_count_arr.length);

  var sleep_efficiency = Math.round(sleep_time / on_bed_time * 100);
  // $("#sleep_efficiency").text(sleep_efficiency + "%");
  $("#sleep_efficiency").text("待补充");



  if (sleep_efficiency > 85) {
    $("#sleep_efficiency_scale").text(sleep_efficiency + "%" + " 优");
  } else if (sleep_efficiency > 75 && sleep_efficiency <= 85) {
    $("#sleep_efficiency_scale").text(sleep_efficiency + "%" + " 良好");
  } else if (sleep_efficiency > 65 && sleep_efficiency <= 75) {
    $("#sleep_efficiency_scale").text(sleep_efficiency + "%" + " 一般");
  } else {
    $("#sleep_efficiency_scale").text(sleep_efficiency + "%" + " 差");
  }


  var sleep_ahi = Math.round((apnea_total_count + central_apnea_total_count) / (sleep_time / 3600) * 100) / 100;
  if (sleep_ahi < 5) {
    $("#sleep_result").text("您的睡眠一切正常，请继续保持");
    $("#sleep_result_detail").text("");
  } else if (sleep_ahi >= 5 && sleep_ahi < 15) {
    $("#sleep_result").text("您疑似患有轻度-阻塞型睡眠呼吸暂停低通气综合征，请尽快就诊");
    $("#sleep_result_detail").text("2.详情咨询专科医生，定期随访复查");
  } else if (sleep_ahi >= 15 && sleep_ahi < 30) {
    $("#sleep_result").text("您疑似患有中度-阻塞型睡眠呼吸暂停低通气综合征，请尽快就诊");
    $("#sleep_result_detail").text("2.详情咨询专科医生，定期随访复查");
  } else {
    $("#sleep_result").text("您疑似患有重度-阻塞型睡眠呼吸暂停低通气综合征，请尽快就诊");
    $("#sleep_result_detail").text("2.详情咨询专科医生，定期随访复查");
  }



  $("#sleep_ahi1").text(sleep_ahi);
  $("#sleep_ahi2").text(sleep_ahi);

  $("#sleep_ahi_osahs").text(Math.round(central_apnea_total_count / (central_apnea_total_count + apnea_total_count) * 100) + "%");
  $("#sleep_ahi_caas").text(Math.round(apnea_total_count / (central_apnea_total_count + apnea_total_count) * 100) + "%");

  var wake_time_str = Math.floor(wake_rem_total_count * 128 / 3600) + "小时" + Math.ceil(wake_rem_total_count * 128 / 60 % 60) + "分钟";
  $("#wake_time").text(wake_time_str);
  var rem_sleep_time_str = Math.floor(wake_rem_total_count * 128 / 3600) + "小时" + Math.ceil(wake_rem_total_count * 128 / 60 % 60) + "分钟";
  $("#rem_sleep_time").text(rem_sleep_time_str);
  var light_sleep_time_str = Math.floor((disturbed_sleep_total_count + central_apnea_total_count + apnea_total_count) * 128 / 3600) + "小时" +
    Math.ceil((disturbed_sleep_total_count + central_apnea_total_count + apnea_total_count) * 128 / 60 % 60) + "分钟";
  $("#light_sleep_time").text(light_sleep_time_str);
  var deep_sleep_time_str = Math.floor(restful_sleep_total_count * 128 / 3600) + "小时" + Math.ceil(restful_sleep_total_count * 128 / 60 % 60) + "分钟";
  $("#deep_sleep_time").text(deep_sleep_time_str);

  var wake_time_scale = Math.round(wake_rem_total_count * 128 / sleep_time * 100);
  var rem_sleep_time_scale = wake_time_scale;
  var light_sleep_time_scale = Math.round((disturbed_sleep_total_count + central_apnea_total_count + apnea_total_count) * 128 / sleep_time * 100);
  var deep_sleep_time_scale = Math.round(restful_sleep_total_count * 128 / sleep_time * 100);
  $("#wake_time_scale").text(wake_time_scale);
  $("#rem_sleep_time_scale").text(rem_sleep_time_scale);
  $("#light_sleep_time_scale").text(light_sleep_time_scale);
  $("#deep_sleep_time_scale").text(deep_sleep_time_scale);

  $("#obstructive_apnea_count").text(apnea_count_arr.length);
  // if (apnea_total_count == 0) {
  //   $("#obstructive_apnea_mean_time").text(0);
  //   $("#obstructive_apnea_max_time").text(0);
  // } else {
  //   $("#obstructive_apnea_mean_time").text(Math.round(apnea_total_count * 128 / apnea_count_arr.length));
  //   $("#obstructive_apnea_max_time").text(Math.max.apply(null, apnea_count_arr) * 128);
  // }
  // $("#obstructive_apnea_scale").text(Math.round(apnea_total_count * 128 / sleep_time * 100));
  $("#obstructive_apnea_index").text(Math.round(apnea_count_arr.length / (sleep_time / 3600) * 100) / 100);

  $("#central_apnea_count").text(central_apnea_count_arr.length);
  // if (central_apnea_total_count == 0) {
  //   $("#central_apnea_mean_time").text(0);
  //   $("#central_apnea_max_time").text(0);
  // } else {
  //   $("#central_apnea_mean_time").text(Math.round(central_apnea_total_count * 128 / central_apnea_count_arr.length));
  //   $("#central_apnea_max_time").text(Math.max.apply(null, central_apnea_count_arr) * 128);
  // }
  // $("#central_apnea_scale").text(Math.round(central_apnea_total_count * 128 / sleep_time * 100));
  $("#central_apnea_index").text(Math.round(central_apnea_count_arr.length / (sleep_time / 3600) * 100) / 100);

  if (apnea_count_arr.length == 0 || central_apnea_count_arr.length == 0) {
    $("#mixed_apnea_count").text(0);
    $("#mixed_apnea_index").text(0);
  } else {
    $("#mixed_apnea_count").text(apnea_count_arr.length + central_apnea_count_arr.length);
    $("#mixed_apnea_index").text(Math.round((apnea_count_arr.length + central_apnea_count_arr.length) / (sleep_time / 3600) * 100) / 100);
  }
  
  // if (apnea_total_count + central_apnea_total_count == 0) {
  //   $("#mixed_apnea_mean_time").text(0);
  //   $("#mixed_apnea_max_time").text(0);
  // } else {
  //   $("#mixed_apnea_mean_time").text(Math.round((apnea_total_count + central_apnea_total_count) * 128 / (apnea_count_arr.length + central_apnea_count_arr.length)));
  //   if (apnea_total_count == 0 && central_apnea_total_count != 0) {
  //     $("#mixed_apnea_max_time").text(Math.max.apply(null, central_apnea_count_arr) * 128);
  //   } else if (apnea_total_count != 0 && central_apnea_total_count == 0) {
  //     $("#mixed_apnea_max_time").text(Math.max.apply(null, apnea_count_arr) * 128);
  //   } else {
  //     $("#mixed_apnea_max_time").text(Math.max.apply(null, apnea_count_arr.concat(central_apnea_count_arr)) * 128);
  //   }
  // }

  // $("#mixed_apnea_scale").text(Math.round((apnea_total_count + central_apnea_total_count) * 128 / sleep_time * 100));


  $("#apnea_count").text(apnea_count_arr.length + central_apnea_count_arr.length);
  // if (apnea_total_count + central_apnea_total_count == 0) {
  //   $("#apnea_mean_time").text(0);
  //   $("#apnea_mean_time").text(0);
  // } else {
  //   $("#apnea_mean_time").text(Math.round((apnea_total_count + central_apnea_total_count) * 128 / (apnea_count_arr.length + central_apnea_count_arr.length)));
  //   if (apnea_total_count == 0 && central_apnea_total_count != 0) {
  //     $("#apnea_max_time").text(Math.max.apply(null, central_apnea_count_arr) * 128);
  //   } else if (apnea_total_count != 0 && central_apnea_total_count == 0) {
  //     $("#apnea_max_time").text(Math.max.apply(null, apnea_count_arr) * 128);
  //   } else {
  //     $("#apnea_max_time").text(Math.max.apply(null, apnea_count_arr.concat(central_apnea_count_arr)) * 128);
  //   }
  // }
  // $("#apnea_scale").text(Math.round((apnea_total_count + central_apnea_total_count) * 128 / sleep_time * 100));
  $("#apnea_index").text(Math.round((apnea_count_arr.length + central_apnea_count_arr.length) / (sleep_time / 3600) * 100) / 100);

  $("#mean_hr").text(result["mean_hr"] + " bpm");
  $("#max_hr").text(result["max_hr"] + " bpm");
  $("#min_hr").text(result["min_hr"] + " bpm");

  var hr_value_arr = result["hr_value_arr"];
  var hr_time_arr = result["hr_time_arr"];

  var tmp_hr_time_arr = [];
  for (let i = 0; i < hr_time_arr.length; i++) {
    var tmp_hr_time = new Date(start_timestamp + Number(hr_time_arr[i]) * 1000).toLocaleString();
    tmp_hr_time_arr.push(tmp_hr_time.substring(9, tmp_hr_time.length - 3));
  }

  hrOption = {
    grid: {
      left: 30,
      right: 10,
      top: 10,
      bottom: 30,
    },
    xAxis: {
      type: 'category',
      data: tmp_hr_time_arr
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: hr_value_arr,
        type: 'line'
      }
    ]
  };

  if (hrOption && typeof hrOption === 'object') {
    hrMyChart.setOption(hrOption);
  }

  let restful_sleep_color = 'green';
  let central_apnea_color = 'yellow';
  let apnea_color = 'yellow';
  let unknown_others_color = 'yellow';
  let disturbed_sleep_color = 'yellow';
  let wake_rem_color = 'blue';

  var data = [];
  var deep_sleep_data = [];
  var light_sleep_data = [];
  var rem_sleep_data = [];
  var wake_data = [];
  var tmp_sleep_time_arr = [];
  for (let i = 0; i < sleep_value_arr.length; i++) {
    var data_style = {};
    var data_style_color = {};

    var tmp_sleep_time = new Date(start_timestamp + Number(sleep_time_arr[i]) * 1000).toLocaleString();
    tmp_sleep_time_arr.push(tmp_sleep_time.substring(9, tmp_sleep_time.length - 3));


    let value = sleep_value_arr[i];
    var color;
    data_style["value"] = "3";
    if (value == "3") {
      color = restful_sleep_color;
      deep_sleep_data.push("2");
      light_sleep_data.push("-");
      rem_sleep_data.push("-");
      wake_data.push("-");
    } else if (value == "2") {
      color = central_apnea_color;
      deep_sleep_data.push("-");
      light_sleep_data.push("2");
      rem_sleep_data.push("-");
      wake_data.push("-");
    } else if (value == "1") {
      color = apnea_color;
      deep_sleep_data.push("-");
      light_sleep_data.push("2");
      rem_sleep_data.push("-");
      wake_data.push("-");
    } else if (value == "0") {
      color = unknown_others_color;
      deep_sleep_data.push("-");
      light_sleep_data.push("2");
      rem_sleep_data.push("-");
      wake_data.push("-");
    } else if (value == "-1") {
      color = disturbed_sleep_color;
      deep_sleep_data.push("-");
      light_sleep_data.push("2");
      rem_sleep_data.push("-");
      wake_data.push("-");
    } else if (value == "-2") {
      color = wake_rem_color;
      deep_sleep_data.push("-");
      light_sleep_data.push("-");
      rem_sleep_data.push("2");
      wake_data.push("-");
    }
    data_style_color["color"] = color;
    data_style["itemStyle"] = data_style_color;

    data.push(data_style);
  }

  sleepOption = {
    legend: {
      data: ["熟睡","浅睡","REM睡眠"],
      left: 'left'
    },
    grid: {
      left: 15,
      right: 10,
      top: 40,
      bottom: 30,
    },
    xAxis: {
      type: 'category',
      data: tmp_sleep_time_arr,
    },
    yAxis: {
      show: false,
      type: 'value'
    },
    series: [
      {
        name: "熟睡",
        data: deep_sleep_data,
        type: 'bar',
        barWidth: '100%',
        stack: 'Total',
        itemStyle: {
          color: restful_sleep_color,
        },
      },
      {
        name: "浅睡",
        data: light_sleep_data,
        type: 'bar',
        barWidth: '100%',
        stack: 'Total',
        itemStyle: {
          color: central_apnea_color,
        },
      },
      {
        name: "REM睡眠",
        data: rem_sleep_data,
        type: 'bar',
        barWidth: '100%',
        stack: 'Total',
        itemStyle: {
          color: wake_rem_color,
        },
      },
    ]
  };

  sleepOption1 = {
    grid: {
      left: 15,
      right: 15,
      top: 20,
      bottom: 30,
    },
    xAxis: {
      type: 'category',
      data: tmp_sleep_time_arr,
    },
    yAxis: {
      show: false,
      type: 'value'
    },
    series: [
      {
        data: data,
        type: 'bar',
        barWidth: '100%',
      }
    ]
  };


  if (sleepOption && typeof sleepOption === 'object') {
    sleepMyChart.setOption(sleepOption);
  }


  apneaOption = {
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        data: [
          { value: apnea_count_arr.length, name: '阻塞型' },
          { value: central_apnea_count_arr.length, name: '中枢型' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  if (apneaOption && typeof apneaOption === 'object') {
    apneaMyChart.setOption(apneaOption);
  }

};


var sleepDom = document.getElementById('chart-container');
var sleepMyChart = echarts.init(sleepDom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var sleepApp = {};
var sleepOption;

window.addEventListener('resize', sleepMyChart.resize);

var apneaDom = document.getElementById('chart-container2');
var apneaMyChart = echarts.init(apneaDom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var apneaApp = {};
var apneaOption;

window.addEventListener('resize', apneaMyChart.resize);

var hrDom = document.getElementById('chart-container3');
var hrMyChart = echarts.init(hrDom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var hrApp = {};
var hrOption;

window.addEventListener('resize', hrMyChart.resize);


function birthday2age(strAge) {
  const birArr = strAge.split("-");
  const birYear = Number(birArr[0]);
  const birMonth = Number(birArr[1]);
  const birDay = Number(birArr[2]);

  const today = new Date();
  const nowYear = today.getFullYear();
  const nowMonth = today.getMonth() + 1; //记得加1
  const nowDay = today.getDate();
  let returnAge;

  if (birArr === null) {
    return false
  };
  const d = new Date(birYear, birMonth - 1, birDay);

  if (d.getFullYear() === birYear && (d.getMonth() + 1) === birMonth && d.getDate() === birDay) {
    if (nowYear === birYear) {
      returnAge = 0; // 
    } else {
      let ageDiff = nowYear - birYear; // 
      if (ageDiff > 0) {
        if (nowMonth === birMonth) {
          let dayDiff = nowDay - birDay; // 
          if (dayDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        } else {
          let monthDiff = nowMonth - birMonth; // 
          if (monthDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        }
      } else {
        return 0; //返回-1 表示出生日期输入错误 晚于今天
      }
    }
    return returnAge;
  } else {
    return 0;
  }
} 