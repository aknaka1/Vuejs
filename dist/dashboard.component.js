"use strict";

window.DashboardComponent = Vue.extend({
    /*
     components: {
     'menu-component' : billPayMenuComponent
     },
     */
    template: "\n    <style>\n        .red{\n            color: white;\n            background: red;\n        }\n        .green{\n            color: white;\n            background: green;\n        }\n        .gray{\n            color: white;\n            background: gray;\n        }\n    </style>\n    <h1>{{ title }}</h1>\n\n\n    <h3 :class=\"{'gray': totalBalance === 0, 'green': totalBalance > 0, 'red': totalBalance < 0}\">{{ totalBalance | numberFormat 'pt-BR' 'BRL' | totalDashboard }}</h3>\n    <!--\n    <menu-component></menu-component>\n    -->\n    <router-view></router-view>\n    ",
    data: function data() {
        return {
            title: "Dashboard",
            totalPagar: 0,
            totalReceber: 0,
            total: 0
        };
    },
    computed: {
        totalBalance: function totalBalance() {
            var self = this;

            Bill.total().then(function (response) {
                self.totalPagar = response.data.total;
            });

            BillReceive.total().then(function (response) {
                self.totalReceber = response.data.total;
            });

            this.total = this.totalReceber - this.totalPagar;
            return this.total;
        }
    },
    methods: {},
    events: {}
});