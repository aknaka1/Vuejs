window.billPayListComponent = Vue.extend({
    components: {
        'modal': window.modalComponent
    },
    template: `
        <div class="container">
            <div class="row">
                <h5>Minhas contas a pagar</h5>
                <table class="bordered striped highlight centered responsive-table z-depth-5">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Vencimento</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Paga?</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(index,o) in bills">
                        <td>{{ index + 1 }}</td>
                        <td>{{ o.date_due | dateFormat 'pt-BR' }}</td>
                        <td>{{ o.name | textCaseFormat }}</td>
                        <td>{{ o.value | numberFormat 'pt-BR' 'BRL' }}</td>
                        <td class="white-text" :class="{'green lighten-2': o.done, 'red lighten-2': !o.done}">
                            {{ o.done | doneLabel }}
                        </td>
                        <td>
                            <a v-link="{ name: 'bill-pay.update', params: {id: o.id} }" class="linkEspace">
                                <i class="material-icons">create</i>
                            </a>

                            <a href="#" @click.prevent="openModalDelete(o)">
                                <i class="material-icons">delete_sweep</i>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <modal :modal="modal" class="meu-modal">
            <div slot="content">
                <h4>Mensagem de confirmação</h4>
                <p><strong>Deseja excluir esta conta?</strong></p>
                <div class="divider"></div>
                <p>Nome: <strong>{{billToDelete.name | textCaseFormat}}</strong></p>
                <p>Valor: <strong>{{billToDelete.value | numberFormat 'pt-BR' 'BRL'}}</strong></p>
                <p>Data de vencimento: <strong>{{billToDelete.date_due | dateFormat 'pt-BR'}}</strong></p>
                <div class="divider"></div>
            </div>
            <div slot="footer">
                <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteBill()">OK</button>
                <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>
            </div>
        </modal>
    `,
    data() {
        return {
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
        };
    },
    created() {
        BillPay.query().then((response) => {
            this.bills = response.data;
        });
    },
    methods: {
        deleteBill(bill) {
            BillPay.delete({id: this.billToDelete.id}).then((response) => {
                this.bills.$remove(this.billToDelete);
                this.billToDelete = null;
                Materialize.toast('Conta excluída com sucesso!', 3000, 'rounded');
                this.$dispatch('change-info');
            });
        },
        openModalDelete(bill) {
            this.billToDelete = bill;
            $('#modal-delete').openModal();
        }
    }
});
