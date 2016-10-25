'use strict';

window.billReceiveListComponent = Vue.extend({
    components: {
        'modal': window.modalComponent
    },
    template: '\n        <div class="container">\n            <div class="row">\n                <h5>Minhas contas a receber</h5>\n                <table class="bordered striped highlight centered responsive-table z-depth-5">\n                    <thead>\n                    <tr>\n                        <th>#</th>\n                        <th>Vencimento</th>\n                        <th>Nome</th>\n                        <th>Valor</th>\n                        <th>Recebido?</th>\n                        <th>Ações</th>\n                    </tr>\n                    </thead>\n                    <tbody>\n                    <tr v-for="(index,o) in bills">\n                        <td>{{ index + 1 }}</td>\n                        <td>{{ o.date_due | dateFormat \'pt-BR\' }}</td>\n                        <td>{{ o.name | textCaseFormat }}</td>\n                        <td>{{ o.value | numberFormat \'pt-BR\' \'BRL\' }}</td>\n                        <td class="white-text" :class="{\'green lighten-2\': o.done, \'red lighten-2\': !o.done}">\n                            {{ o.done | doneLabelReceive }}\n                        </td>\n                        <td>\n                            <a v-link="{ name: \'bill-receive.update\', params: {id: o.id} }" class="linkEspace">\n                                <i class="material-icons">create</i>\n                            </a>\n                            <a href="#" @click.prevent="openModalDelete(o)">\n                                <i class="material-icons">delete_sweep</i>\n                            </a>\n                        </td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n        <modal :modal="modal" class="meu-modal">\n            <div slot="content">\n                <h4>Mensagem de confirmação</h4>\n                <p><strong>Deseja excluir esta conta?</strong></p>\n                <div class="divider"></div>\n                <p>Nome: <strong>{{billToDelete.name | textCaseFormat}}</strong></p>\n                <p>Valor: <strong>{{billToDelete.value | numberFormat \'pt-BR\' \'BRL\'}}</strong></p>\n                <p>Data de vencimento: <strong>{{billToDelete.date_due | dateFormat \'pt-BR\'}}</strong></p>\n                <div class="divider"></div>\n            </div>\n            <div slot="footer">\n                <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteBill()">OK</button>\n                <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>\n            </div>\n        </modal>\n    ',
    data: function data() {
        return {
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
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

            BillReceive.delete({ id: this.billToDelete.id }).then(function (response) {
                _this2.bills.$remove(_this2.billToDelete);
                _this2.billToDelete = null;
                Materialize.toast('Conta excluída com sucesso!', 3000, 'rounded');
                _this2.$dispatch('change-info');
            });
        },
        openModalDelete: function openModalDelete(bill) {
            this.billToDelete = bill;
            $('#modal-delete').openModal();
        }
    },
    events: {}
});