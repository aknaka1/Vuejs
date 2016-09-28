window.DashboardComponent = Vue.extend({
    /*
     components: {
     'menu-component' : billPayMenuComponent
     },
     */
    template: `
    <style>
        .red{
            color: white;
            background: red;
        }
        .green{
            color: white;
            background: green;
        }
        .gray{
            color: white;
            background: gray;
        }
    </style>
    <h1>{{ title }}</h1>


    <h3 :class="{'gray': totalBalance === 0, 'green': totalBalance > 0, 'red': totalBalance < 0}">{{ totalBalance | numberFormat 'pt-BR' 'BRL' | totalDashboard }}</h3>
    <!--
    <menu-component></menu-component>
    -->
    <router-view></router-view>
    `,
    data: function () {
        return {
            title: "Dashboard",
            totalPagar: 0,
            totalReceber: 0,
            total: 0
        }
    },
    computed: {
        totalBalance: function () {
            let self = this;

            Bill.total().then(function(response) {
                self.totalPagar = response.data.total;
            });

            BillReceive.total().then(function(response) {
                self.totalReceber = response.data.total;
            });

            this.total = (this.totalReceber - this.totalPagar);
            return this.total;
        }
    },
    methods: {},
    events: {},
});