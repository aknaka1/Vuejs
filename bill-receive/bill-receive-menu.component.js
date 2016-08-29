window.billReceiveMenuComponent = Vue.extend({
    template: `
        <nav>
            <ul>
                <li v-for="o in menus">
                    <!--a v-link="{path: o.url}">{{ o.name }}</a-->
                    <a v-link="{name: o.routeName}">{{ o.name }}</a>
                </li>
            </ul>
        </nav>
    `,
    data: function () {
        return {
            menus: [
                {id: 0, name: "Listar contas a receber", routeName: 'bill-receive.list'},
                {id: 1, name: "Criar conta a receber", routeName: 'bill-receive.create'},
            ],
        };
    }
});
