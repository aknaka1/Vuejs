
Vue.filter('doneLabel',(value) => value == 0 ? "Nao Paga" : "Paga");
/*
Vue.filter('doneLabel', function(value){
    if(value==0) {
        return "Não Paga";
    } else {
        return "Paga";
    }
});
*/

Vue.filter('doneLabelReceive',(value) => value == 0 ? "Nao Recebido" : "Recebido");
/*
Vue.filter('doneLabelReceive', function (value) {

    if(value == 0){
        return "Não Recebido";
    }else{
        return "Recebido";
    }
});
*/

Vue.filter('statusGeneral', (value) => {
    if(value === false){
        return "Nenhuma conta cadastrada";
    }

    if(!value){
        return "Nenhuma conta a pagar";
    }else{
        return value + " contas a pagar";
    }
});
/*
Vue.filter('statusGeneral', function(value){
    if(value === false){
        return "Nenhuma conta cadastrada";
    }

    if(!value){
        return "Nenhuma conta a pagar";
    }else{
        return "Existem " + value + " contas a serem pagas";
    }
});
*/
Vue.filter('statusGeneralReceive', (value) => {
    if(value === false){
        return "Nenhuma conta cadastrada";
    }

    if(!value){
        return "Nenhuma conta a receber";
    }else{
        return  value + " contas a receber";
    }
});
/*Vue.filter('statusGeneralReceive', function(value){
    if(value === false){
        return "Nenhuma conta cadastrada";
    }

    if(!value){
        return "Nenhuma conta a receber";
    }else{
        return "Existem " + value + " contas a serem recebidas";
    }
});
*/

Vue.filter('totalDashboard',(value) => !value ? "Nenhum Saldo" : "Seu saldo é de: "+ value);
/*Vue.filter('totalDashboard', function (value) {

    if(!value){
        return "Nenhum Saldo";
    }else{
        return "Seu saldo é de: R$ "+ value +"";
    }
});
*/

Vue.filter('numberFormat', {
    read(value, lang = 'pt-BR', moeda = 'BRL'){ //mostra a informação na view
        let number = 0;
        if(value && typeof value !== undefined) {
            let numberRegex =value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }
        return new Intl.NumberFormat(lang, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: moeda
        }).format(number);
    },
    write(value){ //vai pegar o valor da view e converter para armazenar no modelo
        let number = 0;
        if(value.length > 0) { //"R$70,99" "70,99" "70.99"
            number = value.replace(/[^\d\,]/g, '')
                .replace(/\,/g,'.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }
        return number;
    }
});

Vue.filter('dateFormat', {
    read(value, lang = 'pt-BR'){ //mostra a informação na view
        if(value && typeof value !== undefined) {
            if(!(value instanceof  Date)) {
                let dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                let dateString = dateRegex ? dateRegex[0] : dateRegex;
                if(dateString) {
                    value = new Date(dateString+"T03:00:00");
                }else{
                    return value;
                }
            }
            return new Intl.DateTimeFormat(lang).format(value).split(' ')[0];
        }
        return value;
    },
    write(value){ //vai pegar o valor da view e converter para armazenar no modelo
        let dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if(dateRegex){
            let dateString = dateRegex[0];
            let date = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");
            if(!isNaN(date.getTime())){
                //return date;
                return date.toLocaleDateString().split('/').reverse().join('-');
            }
        }
        return value;
    }
});

Vue.filter('textCaseFormat', {
    read(value){
        if(value && typeof value !== undefined){
            return value.toUpperCase();
        }
        return value;
    },
    write(value){
        /*if(!isNaN(value)){
            return value.toLowerCase();
        }*/
        return value;
    }
});