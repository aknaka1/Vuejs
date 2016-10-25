window.DashboardComponent = Vue.extend({
    template: `
    <div class="section">
        <div class="container">
            <div class="row">
                <h1>{{ title }}</h1>
                <div class="col s12">
                    <div class="card" :class="{'gray': totalBalance === 0, 'green': totalBalance > 0, 'red': totalBalance < 0}">
                        <div class="card-content white-text">
                            <p class="card-title">
                                <i class="material-icons">account_balance</i>
                            </p>
                            <h3>{{ totalBalance | numberFormat 'pt-BR' 'BRL' | totalDashboard }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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

            BillPay.total().then(function(response) {
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
