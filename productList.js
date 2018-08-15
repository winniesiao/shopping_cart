var storage = sessionStorage;

function doFirst() {
    // addItemList是自己建立的key值，之後要放購買產品紀錄
    if (storage['addItemList'] == null) {
        storage.setItem('addItemList', '');
    }

    // 每個Add Cart建事件
    var list = document.querySelectorAll(".addButton");
    for (var i = 0; i < list.length; i++) {
        list[i].addEventListener('click', function() {
            var bearInfo = document.querySelector('#' + this.id + ' input').value;
            addItem(this.id, bearInfo);
        });
    }
}

function addItem(itemId, itemValue) {
    // alert(itemId + ': ' + itemValue);
    var image = document.createElement('img');

    // 字串轉成陣列，取第二個字串
    image.src = './imgs/' + itemValue.split('|')[1];
    image.id = 'imageSelect';

    var title = document.createElement('span');
    title.innerText = itemValue.split('|')[0];

    var price = document.createElement('span');
    price.innerText = '$' + itemValue.split('|')[2];

    var itemInfo = document.getElementById('itemInfo');

    // 先判斷此處是否已有物件，如果有要先刪除
    if (itemInfo.hasChildNodes()) {
        while (itemInfo.childNodes.length >= 1) {
            itemInfo.removeChild(itemInfo.firstChild);
        }
    }

    // 再新增新物件
    itemInfo.appendChild(image);
    itemInfo.appendChild(title);
    itemInfo.appendChild(price);

    // 存入session storage
    if (storage[itemId]) {
        alert("You have checked!");
    } else {
        storage[itemId] = itemValue;
        storage['addItemList'] += itemId + ', ';
    }

    // 計算數量跟小計

    // 先給key傳回value
    var itemString = storage.getItem('addItemList');
    // console.log(itemString);
    var items = itemString.substr(0, itemString.length - 2).split(', ');
    // console.log(items.length);

    var subtotal = 0;
    for (key in items) {
        var productInfo = storage.getItem(items[key]);
        var productPrice = parseInt(productInfo.split('|')[2]);
        subtotal += productPrice;
    }

    document.getElementById('itemCount').innerText = items.length;
    document.getElementById('subtotal').innerText = subtotal;
}

window.addEventListener('load', doFirst);