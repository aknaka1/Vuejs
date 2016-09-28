"use strict";

window.billReceiveMenuComponent = Vue.extend({
    template: "\n        <nav>\n            <ul>\n                <li v-for=\"o in menus\">\n                    <!--a v-link=\"{path: o.url}\">{{ o.name }}</a-->\n                    <a v-link=\"{name: o.routeName}\">{{ o.name }}</a>\n                </li>\n            </ul>\n        </nav>\n    ",
    data: function data() {
        return {
            menus: [{ id: 0, name: "Listar contas a receber", routeName: 'bill-receive.list' }, { id: 1, name: "Criar conta a receber", routeName: 'bill-receive.create' }]
        };
    }
});