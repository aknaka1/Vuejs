'use strict';

var namesReceive = ['Salario', 'Emprestimo', 'Aluguel', 'Agiotagem', 'Juros'];

window.billReceiveCreateComponent = Vue.extend({
    template: '\n        <div class="container">\n            <div class="row">\n                <h5>Nova conta</h5>\n                <form name="form" @submit.prevent="submit">\n                    <div class="row">\n                        <div class="input-field col s6">\n                            <label class="active">Vencimento:</label>\n                            <input type="text" v-model="bill.date_due | dateFormat \'pt-BR\'"/>\n                        </div>\n                        <div class="input-field col s6">\n                            <label class="active">Valor:</label>\n                            <input type="text" v-model="bill.value | numberFormat \'pt-BR\' \'BRL\'"/>\n                        </div>\n                    </div>\n                    <div class="row">\n                        <div class="input-field col s6">\n                            <select v-model="bill.name" id="name" class="browser-default">\n                                <option value="" disabled selected>Escolha uma opção</option>\n                                <option v-for="o in names" :value="o">{{ o | textCaseFormat }}</option>\n                            </select>\n                            <label class="active">Nome:</label>\n                        </div>\n                        <div class="input-field col s6">\n                            <input type="checkbox" v-model="bill.done" id="recebido"/>\n                            <label for="recebido">Recebido?</label>\n                        </div>\n                    </div>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <input type="submit" value="Enviar" class="btn btn-large right"/>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    ',
    data: function data() {
        return {
            formType: 'insert',
            names: namesReceive,
            bill: new BillClass()
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
        $(document).ready(function () {
            $('#name').material_select();
        });
    },

    methods: {
        submit: function submit() {
            var _this = this;

            //let data = Vue.util.extend(this.bill, {date_due: this.getDateDue(this.bill.date_due)});
            var data = this.bill.toJSON();
            if (this.formType == 'insert') {
                BillReceive.save({}, data).then(function (response) {
                    Materialize.toast('Conta criada com sucesso!', 3000, 'rounded');
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-receive.list' });
                });
            } else {
                //update
                BillReceive.update({ id: this.bill.id }, data).then(function (response) {
                    Materialize.toast('Conta atualizada com sucesso!', 3000, 'rounded');
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-receive.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            BillReceive.get({ id: id }).then(function (response) {
                _this2.bill = new BillClass(response.data);
            });
        },
        getDateDue: function getDateDue(date_due) {
            var dateDueObject = date_due;
            if (!(date_due instanceof Date)) {
                dateDueObject = new Date(dateDueObject.split('/').reverse().join('-') + "T:03:00:00");
            }
            //return dateDueObject.toISOString().split('T')[0];
            return dateDueObject.substring(0, 10);
        }
    },
    events: {}
});