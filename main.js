var router = new VueRouter();

var mainComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: '<bill-component></bill-component>',
    data: function(){
        return {
            billsPay: [
                {date_due: '20/08/2016', name: 'Conta de luz', value: 70.99, done: true},
                {date_due: '21/08/2016', name: 'Conta de água', value: 55.99, done: false},
                {date_due: '22/08/2016', name: 'Conta de telefone', value: 55.99, done: false},
                {date_due: '23/08/2016', name: 'Supermercado', value: 625.99, done: false},
                {date_due: '24/08/2016', name: 'Cartão de crédito', value: 1500.99, done: false},
                {date_due: '25/08/2016', name: 'Empréstimo', value: 2000.99, done: false},
                {date_due: '26/08/2016', name: 'Gasolina', value: 200, done: false}
            ],
            billsReceive: [
                {date_due: '08/08/2016', name: 'Salario', value: 5000, done: 1},
                {date_due: '31/08/2016', name: 'Agiotagem', value: 425, done: 0},
            ]
        };
    }
});

router.map({
    '/': {
        name: 'dashboard',
        component: DashboardComponent
    },
    '/bill-pays': {
        component: billPayComponent,
        subRoutes: {
            '/': {
             name: 'bill-pay.list',
             component: billPayListComponent
             },
             '/create': {
             name: 'bill-pay.create',
             component: billPayCreateComponent
             },
             '/:index/update': {
             name: 'bill-pay.update',
             component: billPayCreateComponent
             }
        }
    },
    '/bill-receive': {
        name: 'bill-receive',
        component: billReceiveComponent,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: billReceiveListComponent
            },
            '/create': {
                name: 'bill-receive.create',
                component: billReceiveCreateComponent
            },
            '/:index/update': {
                name: 'bill-receive.update',
                component: billReceiveCreateComponent
            }
        }
    },
    '*': {
        component: billPayListComponent
    }
});

router.start({
    components: {
        'main-component': mainComponent
    }
}, '#app');

router.redirect({
    '*': '/bills-pays'
});