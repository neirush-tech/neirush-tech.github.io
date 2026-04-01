new Vue({
    el: '#app',
    data: {
        products: [
            { id: 1, title: 'Перець Каліфорнійське Чудо', short_text: 'Популярний сорт', image: 'img/pepper_1.jpg', desc: 'Високоврожайний сорт...' },
            { id: 2, title: 'Перець Ратунда', short_text: 'Округлий сорт', image: 'img/pepper_2.jpg', desc: 'М’ясиста м’якоть...' },
            { id: 3, title: 'Перець Білозерка', short_text: 'Класичний сорт', image: 'img/pepper_3.jpg', desc: 'Конусоподібні плоди...' },
            { id: 4, title: 'Перець Шоколадний красень', short_text: 'Екзотичний сорт', image: 'img/pepper_4.jpg', desc: 'Темно-коричневі плоди...' },
            { id: 5, title: 'Перець Подарунок Молдови', short_text: 'Надійний сорт', image: 'img/pepper_5.jpg', desc: 'Для відкритого ґрунту...' }
        ],
        product: {}, 
        btnVisible: 0 
    },
    methods: {
        getProduct: function() {
            var hashValue = window.location.hash.substring(1); 
            
            if (hashValue && this.products.length > 0) {
                for (var i = 0; i < this.products.length; i++) {
                    if (this.products[i].id == hashValue) {
                        this.product = this.products[i];
                        break;
                    }
                }
            }
        },
        addToCart: function(id) {
            var cart = [];
            if (window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }
            if (cart.indexOf(String(id)) === -1) {
                cart.push(id);
                window.localStorage.setItem('cart', cart.join());
                this.btnVisible = 1;
            }
        },
        checkInCart: function() {
            if (this.product && this.product.id && window.localStorage.getItem('cart')) {
                var cart = window.localStorage.getItem('cart').split(',');
                if (cart.indexOf(String(this.product.id)) !== -1) {
                    this.btnVisible = 1;
                }
            }
        }
    },
    mounted: function() {
        this.getProduct();   
        this.checkInCart();  
    }
});