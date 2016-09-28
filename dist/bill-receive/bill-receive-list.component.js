"use strict";

window.billReceiveListComponent = Vue.extend({
    template: "\n        <style type=\"text/css\">\n            .pago{\n                color: green;\n            }\n            .nao-pago{\n                color: red;\n            }\n        </style>\n        <table border=\"1\" cellpadding=\"10\">\n            <thead>\n            <tr>\n                <th>#</th>\n                <th>Vencimento</th>\n                <th>Nome</th>\n                <th>Valor</th>\n                <th>Recebido?</th>\n                <th>Ações</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr v-for=\"(index,o) in bills\">\n                <td>{{ index + 1 }}</td>\n                <td>{{ o.date_due | dateFormat 'pt-BR' }}</td>\n                <td>{{ o.name | textCaseFormat }}</td>\n                <td>{{ o.value | numberFormat 'pt-BR' 'BRL' }}</td>\n                <td class=\"minha-classe\" :class=\"{'pago': o.done, 'nao-pago': !o.done}\">\n                    {{ o.done | doneLabelReceive }}\n                </td>\n                <td>\n                    <a v-link=\"{ name: 'bill-receive.update', params: {id: o.id} }\">Editar</a> |\n                    <a href=\"#\" @click.prevent=\"deleteBill(o)\">Excluir</a>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n    ",
    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        var _this = this;

        BillReceive.query().then(function (response) {
            _this.bills = response.data;
        });
    },

    methods: {
        deleteBill: function deleteBill(bill) {
            var _this2 = this;

            var ok = confirm("Você confirma a exclusão da conta " + bill.name + " de " + bill.date_due);
            if (ok == true) {
                BillReceive.delete({ id: bill.id }).then(function (response) {
                    _this2.bills.$remove(bill);
                    _this2.$dispatch('change-info');
                });
            }
        }
    },
    events: {}
});