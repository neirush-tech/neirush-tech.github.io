new Vue({
    el: '#app',
    data: {
        // Масив усіх товарів
        products: [
            { id: 1, title: 'Перець Каліфорнійське Чудо', short_text: 'Популярний сорт', image: 'img/pepper_1.jpg', desc: 'Високоврожайний сорт, плоди кубовидні...' },
            { id: 2, title: 'Перець Ратунда', short_text: 'Округлий сорт', image: 'img/pepper_2.jpg', desc: 'М’ясиста м’якоть, солодкий смак...' },
            { id: 3, title: 'Перець Білозерка', short_text: 'Класичний сорт', image: 'img/pepper_3.jpg', desc: 'Конусоподібні плоди, стійкий до хвороб...' },
            { id: 4, title: 'Перець Шоколадний красень', short_text: 'Екзотичний сорт', image: 'img/pepper_4.jpg', desc: 'Темно-коричневі плоди, дуже солодкі...' },
            { id: 5, title: 'Перець Подарунок Молдови', short_text: 'Надійний сорт', image: 'img/pepper_5.jpg', desc: 'Для відкритого ґрунту, стабільний врожай...' }
        ],
        product: {},          // Для tomato-one.html
        btnVisible: 0,        // Для кнопки "В кошику"
        cart: [],             // Для таблиці в contact.html
        contactFields: {      // Об'єкт для форми
            name: '',
            email: '',
            company: '',
            phone: '',
            role: 'seed producer',
            interest: ''
        },
        orderSubmitted: false // Стан відправки форми
    },
    methods: {
        // --- ЛОГІКА ДЛЯ КАРТКИ ТОВАРУ (tomato-one) ---
        getProduct: function() {
            var hashValue = window.location.hash.substring(1); 
            if (hashValue) {
                var found = this.products.find(p => p.id == hashValue);
                if (found) {
                    this.product = found;
                }
            }
        },
        addToCart: function(id) {
            var cartIds = [];
            if (window.localStorage.getItem('cart')) {
                cartIds = window.localStorage.getItem('cart').split(',');
            }
            if (cartIds.indexOf(String(id)) === -1) {
                cartIds.push(id);
                window.localStorage.setItem('cart', cartIds.join());
                this.btnVisible = 1;
                this.getCart(); // Оновлюємо масив cart відразу
            }
        },
        checkInCart: function() {
            if (this.product.id && window.localStorage.getItem('cart')) {
                var cartIds = window.localStorage.getItem('cart').split(',');
                if (cartIds.indexOf(String(this.product.id)) !== -1) {
                    this.btnVisible = 1;
                }
            }
        },

        // --- ЛОГІКА ДЛЯ КОШИКА ТА КОНТАКТІВ (contact) ---
        getCart: function() {
            this.cart = []; 
            var storageData = window.localStorage.getItem('cart');
            if (storageData) {
                var ids = storageData.split(',');
                ids.forEach(id => {
                    var found = this.products.find(p => p.id == id);
                    if (found) this.cart.push(found);
                });
            }
        },
        removeFromCart: function(id) {
            this.cart = this.cart.filter(item => item.id != id);
            
            var storageData = window.localStorage.getItem('cart');
            if (storageData) {
                var ids = storageData.split(',');
                var updatedIds = ids.filter(itemId => itemId != id);
                if (updatedIds.length > 0) {
                    window.localStorage.setItem('cart', updatedIds.join(','));
                } else {
                    window.localStorage.removeItem('cart');
                }
    
            if (this.product.id == id) this.btnVisible = 0;
        },
        makeOrder: function() {
            this.orderSubmitted = true;
            this.cart = [];
            window.localStorage.removeItem('cart');
            this.btnVisible = 0;
        }
    },
    mounted: function() {
        this.getProduct();   
        this.checkInCart();  
        this.getCart();
    }
});
