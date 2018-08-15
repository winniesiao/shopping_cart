var storage = sessionStorage;

function doFirst() {
    var itemString = storage.getItem('addItemList');
    var items = itemString.substr(0, itemString.length - 2).split(', ');

    total = 0;

    for (var key in items) {
        var productInfo = storage.getItem(items[key]);
        createCartList(items[key], productInfo);

        // 計算總金額
        var productPrice = parseInt(productInfo.split('|')[2]);
        total += productPrice;
    }
    document.getElementById('total').innerText = total;
}

function createCartList(itemKey, itemValue) {
    newSection = document.createElement('section');
    newSection.className = 'itemList';
    document.getElementById('cartList').appendChild(newSection);

    var productTitle = itemValue.split('|')[0];
    var productImg = './imgs/' + itemValue.split('|')[1];
    var productPrice = parseInt(itemValue.split('|')[2]);

    // 建立商品圖片
    var itemPic = document.createElement('div');
    itemPic.className = 'eachItem';
    var image = document.createElement('img');
    image.src = productImg;

    itemPic.appendChild(image);
    newSection.appendChild(itemPic);

    // 建立商品名稱和刪除按鈕
    var itemTitle = document.createElement('div');
    itemTitle.id = itemKey;

    var bearTitle = document.createElement('p');
    bearTitle.innerText = productTitle;

    var delBtn = document.createElement('button');
    delBtn.innerText = 'Delete';
    delBtn.addEventListener('click', deleteItem);

    itemTitle.appendChild(bearTitle);
    itemTitle.appendChild(delBtn);
    newSection.appendChild(itemTitle);

    // 建立商品價格
    var itemPrice = document.createElement('div');
    itemPrice.innerText = productPrice;
    newSection.appendChild(itemPrice);

    // 建立商品數量
    var divItemCount = document.createElement('div');
    var itemCount = document.createElement('input');
    itemCount.type = 'number';
    itemCount.min = 0;
    itemCount.value = 1;
    itemCount.addEventListener('change', changeItemCount);

    divItemCount.appendChild(itemCount);
    newSection.appendChild(divItemCount);

    // 建立商品小計
    var subtotal = document.createElement('div');
    subtotal.className = 'subtotal';
    subtotal.innerText = productPrice;
    newSection.appendChild(subtotal);
}

function deleteItem() {
    var itemId = this.parentNode.getAttribute('id');
    var itemValue = storage.getItem(itemId);

    // 清除storage的資料
    storage.removeItem(itemId);
    storage['addItemList'] = storage['addItemList'].replace[itemId + ', ', ''];

    // 再刪除該筆section
    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);

    //重新計算產品總額
    var sum = 0;
    var subtotal = document.getElementsByClassName('subtotal');
    for (var i = 0; i < subtotal.length; i++) {
        sum += parseInt(subtotal[i].innerHTML);
    }
    document.getElementById('total').innerText = sum;
}

function changeItemCount() {
    var itemId = this.parentNode.parentNode.childNodes[1].getAttribute('id');
    // console.log(itemId);
    var itemValue = storage.getItem(itemId);

    var number = this.value;

    // 計算小計
    var subtotalCount = parseInt(itemValue.split('|')[2]) * number;
    var subtotal = this.parentNode.parentNode.childNodes[4];
    subtotal.innerText = subtotalCount;

    //重新計算產品總額
    var sum = 0;
    var subtotal = document.getElementsByClassName('subtotal');
    for (var i = 0; i < subtotal.length; i++) {
        sum += parseInt(subtotal[i].innerHTML);
    }
    document.getElementById('total').innerText = sum;
}
window.addEventListener('load', doFirst, false);