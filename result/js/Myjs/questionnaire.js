function checkRadioSelected() {
    var radioGroups = document.querySelectorAll('input[type="radio"][name^="question"]');
    var textareaElement = document.getElementById('question7');
    var submitButton = document.getElementById('submit');

    // ラジオボタングループごとに選択があるかどうかを確認
    var allGroupsSelected = Array.from(radioGroups).every(function(radioGroup) {
        return Array.from(document.querySelectorAll('input[type="radio"][name="' + radioGroup.name + '"]')).some(function(radio) {
            return radio.checked;
        });
    });

    // textareaの文字数が30文字以上300文字以内かどうかを確認
    var textareaLength = textareaElement.value.trim().length;
    var textareaValid = textareaLength >= 30 && textareaLength <= 300;

    // 同じワードが連続している場合は警告を出す
    var textareaValue = textareaElement.value.trim();
    var hasRepeatedWords = /(\S)\1{5,}|([a-zA-Zぁ-ん0-9])\2{5,}|(.+?)\3{3,}/.test(textareaValue);

    // 指定されたキーワードが含まれているかどうかを確認
    var keywords = ["お聞かせください", "（30文字以上、300文字以内）", "感想をぜひ伺いたいです", "ご協力よろしくお願いします", "あなたの", "あなたは"];
    var containsKeywords = keywords.some(function(keyword) {
        return textareaValue.includes(keyword);
    });

    // 選択があり、textareaの文字数が有効な場合に送信ボタンを有効にする
    if (allGroupsSelected && textareaValid) {
        if (hasRepeatedWords || containsKeywords) {
            alert('内容が不適切である恐れがあります。');
            submitButton.disabled = true;
        } else {
            submitButton.disabled = false;
        }
    } else {
        submitButton.disabled = true;
    }
}
