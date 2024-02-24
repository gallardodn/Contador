class Item {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}

const items = [];
let totalItems = 0;

function agregar(Material, Cantidad) {
    if (Material !== '') {
        var itemDiv = document.createElement('div');
        var itemNameInput = document.createElement('input');
        itemNameInput.id = 'newItemInput';
        itemNameInput.type = 'text';
        itemNameInput.value = Material;
        var quantityInput = document.createElement('input');
        quantityInput.id = 'newQuantityInput';
        quantityInput.type = 'number';
        quantityInput.value = Cantidad;
        var plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.addEventListener('click', function() {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });
        var minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.addEventListener('click', function() {
            if (quantityInput.value > 0) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });
        itemDiv.appendChild(itemNameInput);
        itemDiv.appendChild(quantityInput);
        itemDiv.appendChild(plusButton);
        itemDiv.appendChild(minusButton);

        document.getElementById('items').appendChild(itemDiv);
        document.getElementById('newItemInput').value = '';
        document.getElementById('newItemInput').placeholder='Material';
        document.getElementById('newQuantityInput').value = '';
        items.push(new Item(Material, Cantidad));
        totalItems++;
    }

}

document.getElementById('newItemButton').addEventListener('click', function() {
    var Material = document.getElementById('newItemInput').value;
    var Cantidad = document.getElementById('newQuantityInput').value;
    agregar(Material, Cantidad);
});