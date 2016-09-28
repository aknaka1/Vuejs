const namesReceive = [
    'Salario',
    'Emprestimo',
    'Aluguel',
    'Agiotagem',
    'Juros'
];

window.billReceiveCreateComponent = Vue.extend({
    template: `
        <form name="form" @submit.prevent="submit">
            <label>Vencimento:</label>
            <input type="text" v-model="bill.date_due | dateFormat 'pt-BR' "/>
            <br/><br/>
            <label>Nome:</label>
            <select v-model="bill.name">
                <option v-for="o in names" :value="o">{{ o | textCaseFormat }}</option>
            </select>
            <br/><br/>
            <label>Valor:</label>
            <input type="text" v-model="bill.value | numberFormat 'pt-BR' 'BRL' "/>
            <br/><br/>
            <label>Recebido?</label>
            <input type="checkbox" v-model="bill.done"/>
            <br/><br/>
            <input type="submit" value="Enviar"/>
        </form>
    `,
    data() {
        return {
            formType: 'insert',
            names: namesReceive,
            bill: new BillClass()
        };
    },
    created() {
        if(this.$route.name == 'bill-receive.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit() {
            //let data = Vue.util.extend(this.bill, {date_due: this.getDateDue(this.bill.date_due)});
            let data = this.bill.toJSON();
            if (this.formType == 'insert'){
                BillReceive.save({}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                });
            }else{ //update
                BillReceive.update({id: this.bill.id}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                });
            }
        },
        getBill(id) {
            BillReceive.get({id: id}).then((response) => {
                this.bill = new BillClass(response.data);
            });
        },
        getDateDue(date_due){
            let dateDueObject =  date_due;
            if(!(date_due instanceof  Date)){
                dateDueObject = new Date(dateDueObject.split('/').reverse().join('-') + "T:03:00:00");
            }
            //return dateDueObject.toISOString().split('T')[0];
            return dateDueObject.substring(0,10);
        }
    },
    events: {}
});