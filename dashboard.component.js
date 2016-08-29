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


    <h3 :class="{'gray': totalBalance === 0, 'green': totalBalance > 0, 'red': totalBalance < 0}">{{ totalBalance | totalDashboard }}</h3>
    <!--
    <menu-component></menu-component>
    -->
    <router-view></router-view>
    `,
    data: function () {
        return {
            title: "Dashboard"
        }
    },
    computed: {
        totalBalance: function () {

            var billsPay = this.$root.$children[0].billsPay;
            var billsReceive = this.$root.$children[0].billsReceive;

            var subTotalPay = 0;
            for (var p in billsPay) {
                if (billsPay[p].done) {
                    subTotalPay += billsPay[p].value;
                }
            }

            var subTotalReceive = 0;
            for (var r in billsReceive) {
                if (billsReceive[r].done) {
                    subTotalReceive += billsReceive[r].value;
                }
            }
            var total = subTotalReceive - subTotalPay;
            return total;

        }
    },
    methods: {},
    events: {},
});