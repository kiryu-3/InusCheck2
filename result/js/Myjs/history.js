function editPer(data){
    const result = {};

    // スキルごとに割合を計算
    for (let i = 1; i <= 66; i++) {
        const skillKey = `skill${i}`;
        const skillData = data.map(entry => entry[skillKey]);

        const oneCount = skillData.filter(value => value === "1").length;
        const twoCount = skillData.filter(value => value === "2").length;
        const threeCount = skillData.filter(value => value === "3").length;
        const fourCount = skillData.filter(value => value === "4").length;
        const fiveCount = skillData.filter(value => value === "5").length;

        const totalCount = skillData.length;

        const onePercentage = (oneCount / totalCount) * 100;
        const twoPercentage = (twoCount / totalCount) * 100;
        const threePercentage = (threeCount / totalCount) * 100;
        const fourPercentage = (fourCount / totalCount) * 100;
        const fivePercentage = (fiveCount / totalCount) * 100;

        result[skillKey] = [onePercentage, twoPercentage, threePercentage, fourPercentage, fivePercentage];
    }
    return result;
}

function showQuestions() {
    var category = document.getElementById("category").value;
    for (var i = 1; i <= 66; i++) {
        var elementsq = document.getElementsByClassName("question" + i);
        // var elementss = document.getElementById("skill" + i);
        if (
            (category === "オンライン・コラボレーション力" && i >= 1 && i <= 15) ||
            (category === "データ利活用力" && i >= 16 && i <= 30) ||
            (category === "情報システム開発力" && i >= 31 && i <= 44) ||
            (category === "情報倫理力" && i >= 45 && i <= 66)
        ) {
            for (var j = 0; j < elementsq.length; j++) {
                elementsq[j].style.display = "block";
            }
            // elementss.style.display = "block";
        } else {
            for (var j = 0; j < elementsq.length; j++) {
                elementsq[j].style.display = "none";
            }
            // elementss.style.display = "none";
        }
    }
}

$(document).ready(function() {
    $(".multi-select").select2();
});

// "empty" キーの値がある場合にそのキーを削除する関数
function removeEmptyKey(obj) {
    for (var key in obj) {
        if (key == "empty") {
            delete obj[key];
        }
    }
}

function drawRadar(outputData, sizeData, flag){
    var plot = [];
    var title = ["＜過去の自分との比較＞"]

    for (var label in outputData) {
        var repeatedList = Array.from({length: 4}, () => sizeData[label]);
        console.log("repeatedList", repeatedList);
        var trace = {
            type: 'scatterpolar',
            r: outputData[label],
            theta: ['オンライン・コラボレーション力', 'データ利活用力', '情報システム開発力', '情報倫理力'],  // 項目のラベル

            name: label,
            hovertemplate: '%{theta}: %{r:.2f}%<br>n=%{text}',  // hoverinfoに'text+r'を指定し、hovertextとラベルを表示
            text: repeatedList,
            fill: 'toself'
        };
    plot.push(trace);
    }

    var title = 'スコア(%)　' + flag;
    var layout = {
        template: 'none',
        title: title,
        showlegend: true,
        polar: {
            bgcolor: 'white',
            radialaxis: {
            range: [0, 100],
            visible: true,
            showline: true,
            showgrid: true,
            tickfont: {
                size: 10
            },
            gridcolor: 'black'
            },
            angularaxis: {
            tickfont: {
                size: 12
            },
            linecolor: 'black',
            gridcolor: 'gray'
            },
            gridshape: 'circular'
        },
        paper_bgcolor: '#f8f9fa'
    };

    if (flag == "＜他者との比較＞"){
        // ラダーチャートを描画
        Plotly.newPlot('radarChart_1', plot, layout);
    }
    else{
        // ラダーチャートを描画
        Plotly.newPlot('radarChart_2', plot, layout);
    }
}

function drawBar(perData){

    for (var idx = 1; idx < 67; idx++) {

        var columnName = "skill" + idx;
        var data = perData[columnName];
        var tracedata = [];

        var colors = ['#2B4C7E', '#AED6F1', '#95A5A6', '#E6B0AA', '#943126'];
        var tags = ['1', '2', '3', '4', '5'];
        for (var idx2 = 0; idx2 < data.length; idx2++) {
            // Plot
            var text = tags[idx2];
            var trace = {
                x: [data[idx2]],
                y: ["skill" + idx],
                type: 'bar',
                orientation: 'h',
                text: [tags[idx2]],
                name: tags[idx2] + " : " + data[idx2].toFixed(1) + "%",
                hovertemplate: '%{text}: %{x:0.2f}%',

                marker: {color: colors[idx2]}
            };

            tracedata.push(trace);
        }

        var layout = {
            barmode: 'stack',
            title: "<b>Q" + idx + "　" + uni + "の" + "<b>回答割合 (%)　n=" + allLatestData.length,
            legend: {
            orientation: 'h',
            traceorder: 'normal',  // 'normal' は tags の順番にします
            xanchor: 'right',
            x: 0.75,
            yanchor: 'bottom',
            y: 0.92,
            },
            width: 800,
            height: 200,
            plot_bgcolor: 'white',
            margin: {
                b: 0
            },
            yaxis: {
                showgrid: false,
                showticklabels: false,
                title: ""
            },
            paper_bgcolor: '#f8f9fa'
        };

        var config = {
            staticPlot: true
        };


        var tag = 'barChart_' + idx;

        Plotly.newPlot(tag, tracedata, layout,  config);

    }
}




$(document).ready(function() {
    $(".multi-select").select2();
});

// 選択されたオプションを取得する関数
function getSelectedOptions(flag) {

    if (flag == "departments"){
        // 学年の選択要素と選択されたオプションを取得
        const gradeElement = document.getElementById("grades");
        const gradeSelectedOptions = Array.from(gradeElement.options)
            .filter(option => option.selected)
            .map(option => option.value);

        // 学科の選択要素と選択されたオプションを取得
        const departmentElement = document.getElementById("departments");
        const departmentSelectedOptions = Array.from(departmentElement.options)
            .filter(option => option.selected)
            .map(option => option.value);

        // 結果をオブジェクトとして返す
        return {
            grades: gradeSelectedOptions,
            departments: departmentSelectedOptions
        };
    }
    else{
        // 学年の選択要素と選択されたオプションを取得
        const dateElement = document.getElementById("dates");
        console.log(dateElement);
        const dateSelectedOptions = Array.from(dateElement.options)
            .filter(option => option.selected)
            .map(option => option.value);

        // 結果をオブジェクトとして返す
        return {
            dates: dateSelectedOptions
        };
    }
}

// カテゴリごとのスコアを計算する関数
function calculateScore(infoSysData, categoryStart, categoryEnd) {
    // データ数
    var totalDataCount = infoSysData.length;

    console.log("infoSysData", infoSysData);

    // カウントを初期化
    var counts = {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
    };

    // 各カウントを計算
    var categoryColumnCount = 0;
    infoSysData.forEach(function(item) {
        for (var key in item) {
            // keyから数値部分を抽出
            let keyNum = key.match(/\d+/);
            if (keyNum) {
                keyNum = parseInt(keyNum[0]);

                if (keyNum >= categoryStart && keyNum <= categoryEnd) {
                    categoryColumnCount++;
                    if (item[key] in counts) {
                        counts[item[key]]++;
                    }
                }
            }
        }
    });


    // // 各カウントを計算
    // var categoryColumnCount = 0;
    // infoSysData.forEach(function(item) {
    //     for (var key in item) {
    //         console.log(key)
    //         if (key >= categoryStart && key <= categoryEnd) {
    //             categoryColumnCount++;
    //             if (item[key] in counts) {
    //                 counts[item[key]]++;
    //             }
    //         }
    //     }
    // });

    console.log(counts);
    console.log(categoryColumnCount);
    console.log(totalDataCount);

    // 割合を計算
    var totalPoints = Object.keys(counts).reduce(function(acc, key) {
        return acc + counts[key] * key;
    }, 0);
    console.log(totalPoints)

    var percentage = (totalPoints / (categoryColumnCount * 5)) * 100;

    return percentage;
}

// ボタンがクリックされた時に選択されたオプションを取得して表示
document.addEventListener("DOMContentLoaded", function() {
    var button = document.querySelector(".btn.btn-primary");
    button.addEventListener("click", function() {

        console.log("読み込み完了1");

        var selectedOptions = getSelectedOptions("departments");
        console.log("選択されたオプション:", selectedOptions);

        // 指定条件のデータだけを取り出す
        console.log(selectedOptions);
        var infoSysData = allLatestData.filter(function(item) {
            return selectedOptions["departments"].includes(item.department) && selectedOptions["grades"].includes(item.grade);
        });

        console.log("指定条件のデータ:", infoSysData);

        var gradesString = selectedOptions["grades"].join("・");
        var departmentsString = selectedOptions["departments"].join("・");

        var resultString = gradesString + "&" + departmentsString;

        console.log(resultString);
        result1 = calculateScore(infoSysData, 1, 15);
        result2 = calculateScore(infoSysData, 16, 30);
        result3 = calculateScore(infoSysData, 31, 44);
        result4 = calculateScore(infoSysData, 45, 66);

        // result1 = calculateScore(infoSysData, "skill1", "skill15");
        // result2 = calculateScore(infoSysData, "skill16", "skill30");
        // result3 = calculateScore(infoSysData, "skill31", "skill44");
        // result4 = calculateScore(infoSysData, "skill45", "skill66");

        departmentPerData[resultString] = [result1, result2, result3, result4];
        console.log("割合:", departmentPerData);

        departmentLengthData[resultString] = infoSysData.length;
        //inputData["no"] = [countValue(infoSysData, "skill1", "skill2", "no"), countValue(infoSysData, "skill3", "skill4", "no"), countValue(infoSysData, "skill5", "skill6", "no"), countValue(infoSysData, "skill7", "skill8", "no")];

        drawRadar(departmentPerData, departmentLengthData, "＜他者との比較＞");

        var selectedOptions = getSelectedOptions("dates");
        console.log("選択されたオプション:", selectedOptions);

        // 指定条件のデータだけを取り出す
        var infoSysData = userData.filter(function(item) {
            return selectedOptions["dates"].includes(item.date_added);
        });

        console.log("指定条件のデータ:", infoSysData);

        var datesString = selectedOptions["dates"].join("・");

        var resultString = datesString;

        console.log(resultString);

        result1 = calculateScore(infoSysData, 1, 15);
        result2 = calculateScore(infoSysData, 16, 30);
        result3 = calculateScore(infoSysData, 31, 44);
        result4 = calculateScore(infoSysData, 45, 66);
        // result1 = calculateScore(infoSysData, "skill1", "skill15");
        // result2 = calculateScore(infoSysData, "skill16", "skill30");
        // result3 = calculateScore(infoSysData, "skill31", "skill44");
        // result4 = calculateScore(infoSysData, "skill45", "skill66");

        datePerData[resultString] = [result1, result2, result3, result4];

        dateLengthData[resultString] = infoSysData.length;

        removeEmptyKey(datePerData);
        removeEmptyKey(departmentPerData);

        drawRadar(datePerData, dateLengthData, "＜過去の自分との比較＞");

        perData = editPer(allLatestData);


        drawBar(perData);
    });
});




// ボタンがクリックされた時に選択されたオプションを取得して表示
document.addEventListener("DOMContentLoaded", function() {
    var button = document.querySelector(".btn.btn-primary2");
    button.addEventListener("click", function() {

        console.log("読み込み完了2");

        departmentPerData = {};
        result1 = calculateScore(nowData, 1, 15);
        result2 = calculateScore(nowData, 16, 30);
        result3 = calculateScore(nowData, 31, 44);
        result4 = calculateScore(nowData, 45, 66);
        // result1 = calculateScore(nowData, "skill1", "skill15");
        // result2 = calculateScore(nowData, "skill16", "skill30");
        // result3 = calculateScore(nowData, "skill31", "skill44");
        // result4 = calculateScore(nowData, "skill45", "skill66");

        departmentPerData["あなたの結果"] = [result1, result2, result3, result4];
        console.log("Your", departmentPerData);

        departmentLengthData["あなたの結果"] = 1;

        drawRadar(departmentPerData, departmentPerData, "＜他者との比較＞");

        datePerData = {};
        datePerData["empty"] = [0, 0, 0, 0];
        dateLengthData["empty"] = 0;
        drawRadar(datePerData, dateLengthData, "＜過去の自分との比較＞");
    });
});

// ページが読み込まれたときに選択されたオプションを取得して表示
document.addEventListener("DOMContentLoaded", function() {
    // fileRead("../result/json/now_data.json", "now_data");
    // fileRead("../result/json/user_data.json", "user_data");
    // fileRead("../result/json/all_latest_data.json", "all_latest_data");

    console.log("読み込み完了0");

    if (Object.keys(nowData).length > 0) {
        console.log(userData)
        result1 = calculateScore(nowData, 1, 15);
        result2 = calculateScore(nowData, 16, 30);
        result3 = calculateScore(nowData, 31, 44);
        result4 = calculateScore(nowData, 45, 66);
        // result1 = calculateScore(nowData, "skill1", "skill15");
        // result2 = calculateScore(nowData, "skill16", "skill30");
        // result3 = calculateScore(nowData, "skill31", "skill44");
        // result4 = calculateScore(nowData, "skill45", "skill66");

        departmentPerData["あなたの結果"] = [result1, result2, result3, result4];
    } else {
        departmentPerData["あなたの結果"] = [0, 0, 0, 0];
    }
    //departmentPerData["あなたの結果"] = [result1, result2, result3, result4];

    //departmentPerData["your"] = [calculatePercentage(nowData, "skill1", "skill2", "yes"), calculatePercentage(nowData, "skill3", "skill4", "yes"), calculatePercentage(nowData, "skill5", "skill6", "yes"), calculatePercentage(nowData, "skill7", "skill8", "yes")];

    // var selectedOptions = getSelectedOptions("departments");
    // console.log("選択されたオプション:", selectedOptions);

    // // 指定条件のデータだけを取り出す
    // console.log(allLatestData);
    // var infoSysData = allLatestData.filter(function(item) {
    //     return selectedOptions["departments"].includes(item.department) && selectedOptions["grades"].includes(item.grade);
    // });

    // console.log("指定条件のデータ:", infoSysData);

    // var gradesString = selectedOptions["grades"].join("・");
    // var departmentsString = selectedOptions["departments"].join("・");

    // var resultString = gradesString + "&" + departmentsString;

    // console.log(resultString);

    departmentLengthData["あなたの結果"] = 1;
    // departmentLengthData[resultString] = infoSysData.length;

    // result1 = calculateScore(infoSysData, "skill1", "skill15");
    // result2 = calculateScore(infoSysData, "skill16", "skill30");
    // result3 = calculateScore(infoSysData, "skill31", "skill44");
    // result4 = calculateScore(infoSysData, "skill45", "skill66");

    // departmentPerData[resultString] = [result1, result2, result3, result4];
    // //inputData["no"] = [countValue(infoSysData, "skill1", "skill2", "no"), countValue(infoSysData, "skill3", "skill4", "no"), countValue(infoSysData, "skill5", "skill6", "no"), countValue(infoSysData, "skill7", "skill8", "no")];
    // console.log("数:", departmentPerData);
    drawRadar(departmentPerData, departmentLengthData, "＜他者との比較＞");

    var selectedOptions = getSelectedOptions("dates");
    // console.log("選択されたオプション:", selectedOptions);

    // // 指定条件のデータだけを取り出す
    // var infoSysData = userData.filter(function(item) {
    //     return selectedOptions["dates"].includes(item.date_added);
    // });

    // console.log("指定条件のデータ:", infoSysData);

    // var datesString = selectedOptions["dates"].join("・");

    // var resultString = datesString;

    // console.log(resultString);

    // dateLengthData["あなたの結果"] = 1;
    // dateLengthData[resultString] = infoSysData.length;

    // result1 = calculateScore(infoSysData, "skill1", "skill15");
    // result2 = calculateScore(infoSysData, "skill16", "skill30");
    // result3 = calculateScore(infoSysData, "skill31", "skill44");
    // result4 = calculateScore(infoSysData, "skill45", "skill66");

    //datePerData[resultString] = [result1, result2, result3, result4];
    //inputData["no"] = [calculatePercentage(infoSysData, "skill1", "skill2", "no"), calculatePercentage(infoSysData, "skill3", "skill4", "no"), calculatePercentage(infoSysData, "skill5", "skill6", "no"), calculatePercentage(infoSysData, "skill7", "skill8", "no")];

    datePerData["empty"] = [0, 0, 0, 0];
    dateLengthData["empty"] = 0;

    drawRadar(datePerData, dateLengthData, "＜過去の自分との比較＞");

    perData = editPer(allLatestData);

    drawBar(perData);
});