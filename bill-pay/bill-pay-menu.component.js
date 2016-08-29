window.billPayMenuComponent = Vue.extend({
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
    data: function(){
        return {
            menus: [
                //{id: 0, name: "Listar contas", url:'bills'},
                //{id: 1, name: "Criar conta", url: '/bill/create'}
                {id: 0, name: "Listar contas", routeName:'bill-pay.list'},
                {id: 1, name: "Criar conta", routeName: 'bill-pay.create'}
            ]
        };
    }
});
