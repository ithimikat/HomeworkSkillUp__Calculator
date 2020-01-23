$(document).ready(() =>{

    //собираю обращение к элементам в один объект
    const GUI = {
        input: $('input')[0],
        deleteAll: $('.btn-delete-all'),
        backspace: $('.btn-backspace'),
        numbers: $('.number'),
        mathSymbols: $('.math'),
        point: $('.point'),
        result: $('.equal')
    };

    let regExp = /\+|\-|\/|\*/;

    //обработчик на кнопку backspace удаление последнего символа в input
    GUI.backspace.click(() =>{
        GUI.input.value = GUI.input.value.slice(0, -1);

        if(GUI.input.value === ''){
            GUI.input.value = 0;
        }
    });

    //обработчик на клики по кнопкам с цифрами
    GUI.numbers.click(function(){
        if(GUI.input.value === '0'){
            GUI.input.value = this.innerText;
        } else{
            GUI.input.value += this.innerText;
        }
    });

    //обработчик на кнопку С - удалить все с input
    GUI.deleteAll.click(() =>{
        GUI.input.value = 0;
    });

    //обработчик на клики по кнопкам с арифметическими действиями
    GUI.mathSymbols.click(function () {
        let mathPos = GUI.input.value.search(regExp);
        let lastSymbol = GUI.input.value.slice(-1);

        //если последний символ не ноль и не точка
        //и арифм. знака в строке еще нет то можно ставить знак
        if(GUI.input.value !== '0' && mathPos === -1 && lastSymbol !== '.'){
            GUI.input.value += this.innerText;
        }
    });

    //обработчик на кнопку с точкой
    GUI.point.click(() =>{
        let lastSymbol = GUI.input.value.slice(-1);
        let numberPoints = GUI.input.value.split('.').length - 1;
        let mathPos = GUI.input.value.search(regExp);

        //если точки в строке еще нет и последний символ цифра
        //и арифм. знака еще нет то можно ставить точку
        if (numberPoints === 0 && !isNaN(lastSymbol) && mathPos === -1) {
            GUI.input.value += '.';
        }
        //если последний символ цифра и есть арифм. знак
        else if (!isNaN(lastSymbol) && mathPos !== -1) {
            let arrStr = GUI.input.value.split(regExp);
            numberPoints = arrStr[1].split('.').length - 1;

            //если во второй части после знака точки еще нет
            if (numberPoints === 0) {
                GUI.input.value += '.';
            }
        }
    });

    //обработчик на кнопку со знаком равенства
    //определение результата арифм. действия и вывод в input
    GUI.result.click(() =>{
        let mathPos = GUI.input.value.search(regExp);
        let lastSymbol = GUI.input.value.slice(-1);

        if(mathPos !== -1 && lastSymbol !== '.'){
            GUI.input.value = eval(GUI.input.value);
        }
    });
});