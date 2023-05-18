import os
import json

c = {}

restful_sleep_total_count = 0  #  3
restful_sleep_count_arr = [] 
restful_sleep_count = 0
last_restful_sleep = ""
central_apnea_total_count = 0  #  2
central_apnea_count_arr = [] 
central_apnea_count = 0
last_central_apnea = ""
apnea_total_count = 0 # 1
apnea_count_arr = [] 
apnea_count = 0
last_apnea = ""
unknown_others_total_count = 0 # 0
unknown_others_count_arr = [] 
unknown_others_count = 0
last_unknown_others = ""
disturbed_sleep_total_count = 0 # -1
disturbed_sleep_count_arr = [] 
disturbed_sleep_count = 0
last_disturbed_sleep = ""
wake_rem_total_count = 0 # -2
wake_rem_count_arr = [] 
wake_rem_count = 0
last_wake_rem = ""

sleep_time_arr = []
sleep_value_arr = []

folder_path = "/Users/golfy/Documents/睡眠文档/sleepReport/Sleepreport_template/"
file_cpc = ""
file_rr = ""
file_list = os.listdir(folder_path)
for file_name in file_list:
    if file_name.endswith('cpc'):
        file_cpc = file_name
    elif file_name.endswith('rr'):
        file_rr = file_name
    else:
        pass


file_obj = open(file_cpc,'r')
file_obj1 = open(file_rr,'r')

try:
    all_text = file_obj.readlines()
    all_text1 = file_obj1.readlines()


    last_line = all_text[-1].split("\n")[0].split(" ")
    hour = int(last_line[0])/3600
    minute = int(last_line[0])/60%60
    
    for line in all_text:
        line_arr = line.split("\n")[0].split(" ")

        sleep_time_arr.append(line_arr[0])
        sleep_value_arr.append(line_arr[1])

        res = line_arr[1]

        if res == "3":
            restful_sleep_total_count = restful_sleep_total_count + 1

            if last_restful_sleep == "":
                restful_sleep_count = 1
            else:
                restful_sleep_count += 1

            if last_central_apnea != "":
                central_apnea_count_arr.append(central_apnea_count)
                central_apnea_count = 0
                last_central_apnea = ""
            if last_apnea != "":
                apnea_count_arr.append(apnea_count)
                apnea_count = 0
                last_apnea = ""
            if last_unknown_others != "":
                unknown_others_count_arr.append(unknown_others_count)
                unknown_others_count = 0
                last_unknown_others = ""
            if last_disturbed_sleep != "":
                disturbed_sleep_count_arr.append(disturbed_sleep_count)
                disturbed_sleep_count = 0
                last_disturbed_sleep = ""
            if last_wake_rem != "":
                wake_rem_count_arr.append(wake_rem_count)
                wake_rem_count = 0
                last_wake_rem = ""

            last_restful_sleep = res
        elif res == "2":
            central_apnea_total_count = central_apnea_total_count + 1

            if last_central_apnea == "":
                central_apnea_count = 1
            else:
                central_apnea_count += 1

            if last_restful_sleep != "":
                restful_sleep_count_arr.append(restful_sleep_count)
                restful_sleep_count = 0
                last_restful_sleep = ""
            if last_apnea != "":
                apnea_count_arr.append(apnea_count)
                apnea_count = 0
                last_apnea = ""
            if last_unknown_others != "":
                unknown_others_count_arr.append(unknown_others_count)
                unknown_others_count = 0
                last_unknown_others = ""
            if last_disturbed_sleep != "":
                disturbed_sleep_count_arr.append(disturbed_sleep_count)
                disturbed_sleep_count = 0
                last_disturbed_sleep = ""
            if last_wake_rem != "":
                wake_rem_count_arr.append(wake_rem_count)
                wake_rem_count = 0
                last_wake_rem = ""

            last_central_apnea = res
        elif res == "1":
            apnea_total_count = apnea_total_count + 1

            if last_apnea == "":
                apnea_count = 1
            else:
                apnea_count += 1

            if last_central_apnea != "":
                central_apnea_count_arr.append(central_apnea_count)
                central_apnea_count = 0
                last_central_apnea = ""
            if last_restful_sleep != "":
                restful_sleep_count_arr.append(restful_sleep_count)
                restful_sleep_count = 0
                last_restful_sleep = ""
            if last_unknown_others != "":
                unknown_others_count_arr.append(unknown_others_count)
                unknown_others_count = 0
                last_unknown_others = ""
            if last_disturbed_sleep != "":
                disturbed_sleep_count_arr.append(disturbed_sleep_count)
                disturbed_sleep_count = 0
                last_disturbed_sleep = ""
            if last_wake_rem != "":
                wake_rem_count_arr.append(wake_rem_count)
                wake_rem_count = 0
                last_wake_rem = ""

            last_apnea = res
        elif res == "0":
            unknown_others_total_count = unknown_others_total_count + 1

            if last_unknown_others == "":
                unknown_others_count = 1
            else:
                unknown_others_count += 1

            if last_central_apnea != "":
                central_apnea_count_arr.append(central_apnea_count)
                central_apnea_count = 0
                last_central_apnea = ""
            if last_apnea != "":
                apnea_count_arr.append(apnea_count)
                apnea_count = 0
                last_apnea = ""
            if last_restful_sleep != "":
                restful_sleep_count_arr.append(restful_sleep_count)
                restful_sleep_count = 0
                last_restful_sleep = ""
            if last_disturbed_sleep != "":
                disturbed_sleep_count_arr.append(disturbed_sleep_count)
                disturbed_sleep_count = 0
                last_disturbed_sleep = ""
            if last_wake_rem != "":
                wake_rem_count_arr.append(wake_rem_count)
                wake_rem_count = 0
                last_wake_rem = ""

            last_unknown_others = res
        elif res == "-1":
            disturbed_sleep_total_count = disturbed_sleep_total_count + 1

            if last_disturbed_sleep == "":
                disturbed_sleep_count = 1
            else:
                disturbed_sleep_count += 1

            if last_central_apnea != "":
                central_apnea_count_arr.append(central_apnea_count)
                central_apnea_count = 0
                last_central_apnea = ""
            if last_apnea != "":
                apnea_count_arr.append(apnea_count)
                apnea_count = 0
                last_apnea = ""
            if last_unknown_others != "":
                unknown_others_count_arr.append(unknown_others_count)
                unknown_others_count = 0
                last_unknown_others = ""
            if last_restful_sleep != "":
                restful_sleep_count_arr.append(restful_sleep_count)
                restful_sleep_count = 0
                last_restful_sleep = ""
            if last_wake_rem != "":
                wake_rem_count_arr.append(wake_rem_count)
                wake_rem_count = 0
                last_wake_rem = ""      

            last_disturbed_sleep = res
        else:
            wake_rem_total_count = wake_rem_total_count + 1

            if last_wake_rem == "":
                wake_rem_count = 1
            else:
                wake_rem_count += 1

            if last_central_apnea != "":
                central_apnea_count_arr.append(central_apnea_count)
                central_apnea_count = 0
                last_central_apnea = ""
            if last_apnea != "":
                apnea_count_arr.append(apnea_count)
                apnea_count = 0
                last_apnea = ""
            if last_unknown_others != "":
                unknown_others_count_arr.append(unknown_others_count)
                unknown_others_count = 0
                last_unknown_others = ""
            if last_disturbed_sleep != "":
                disturbed_sleep_count_arr.append(disturbed_sleep_count)
                disturbed_sleep_count = 0
                last_disturbed_sleep = ""
            if last_restful_sleep != "":
                restful_sleep_count_arr.append(restful_sleep_count)
                restful_sleep_count = 0
                last_restful_sleep = ""

            last_wake_rem = res
    
    # c["restful_sleep_time"] = "%.0f"%(restful_sleep*128/3600) + "小时" + "%.0f"%(restful_sleep*128/60%60) + "分钟"
    c["restful_sleep_total_count"] = str(restful_sleep_total_count)
    c["restful_sleep_count_arr"] = restful_sleep_count_arr
    c["central_apnea_total_count"] = str(central_apnea_total_count)
    c["central_apnea_count_arr"] = central_apnea_count_arr
    c["apnea_total_count"] = str(apnea_total_count)
    c["apnea_count_arr"] = apnea_count_arr
    c["unknown_others_total_count"] = str(unknown_others_total_count)
    c["unknown_others_count_arr"] = unknown_others_count_arr
    c["disturbed_sleep_total_count"] = str(disturbed_sleep_total_count)
    c["disturbed_sleep_count_arr"] = disturbed_sleep_count_arr
    c["wake_rem_total_count"] = str(wake_rem_total_count)
    c["wake_rem_count_arr"] = wake_rem_count_arr


    c["sleep_time_arr"] = sleep_time_arr
    c["sleep_value_arr"] = sleep_value_arr
    c["sleep_time"] = last_line[0]
    c["on_bed_time"] = last_line[0]
    

    max_hr = 0
    min_hr = 999
    count = 0
    total = 0
    hr_value_arr = [] 
    hr_time_arr = []
    for line in all_text1:
        line_arr = line.split(" ")
        rr_value = line_arr[1]
        hr_value = 60/float(rr_value)

        if hr_value > 108 or hr_value < 57:
            continue

        hr_value_arr.append(str(hr_value))

        hr_time = line_arr[0]
        hr_time_arr.append(str(hr_time))

        # print("res:"+str(res) +"--"+"hr:"+ "%.0f"%(hr))
        if max_hr <= hr_value:
            max_hr = hr_value
        if min_hr >= hr_value:
            min_hr = hr_value
        total += hr_value
        count += 1
    mean_hr = total / count

    c["max_hr"] = "%.0f"%(max_hr)
    c["min_hr"] = "%.0f"%(min_hr)
    c["mean_hr"] = "%.0f"%(mean_hr)
    c["hr_time_arr"] = hr_time_arr
    c["hr_value_arr"] = hr_value_arr
finally:
    file_obj.close()
    file_obj1.close()


with open("result_sleep.json","w", encoding="utf-8") as tf:
    json.dump(c, fp=tf, ensure_ascii=False)