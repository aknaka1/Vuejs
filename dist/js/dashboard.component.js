"use strict";

window.DashboardComponent = Vue.extend({
    template: "\n    <div class=\"section\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <h1>{{ title }}</h1>\n                <div class=\"col s12\">\n                    <div class=\"card\" :class=\"{'gray': totalBalance === 0, 'green': totalBalance > 0, 'red': totalBalance < 0}\">\n                        <div class=\"card-content white-text\">\n                            <p class=\"card-title\">\n                                <i class=\"material-icons\">account_balance</i>\n                            </p>\n                            <h3>{{ totalBalance | numberFormat 'pt-BR' 'BRL' | totalDashboard }}</h3>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <router-view></router-view>\n    ",
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

            BillPay.total().then(function (response) {
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