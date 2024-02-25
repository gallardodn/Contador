class Item {
    constructor(codigo, name, quantity, maximo) {
        this.codigo = codigo;
        this.name = name;
        this.quantity = quantity;
        this.maximo = maximo;
    }
}

// funcion para ingresar un valor con una ventana emergente de sweetalert
function ingresarValor() {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: 'Ingrese un valor',
            input: 'number',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value) {
                    return 'Debe ingresar un valor';
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                resolve(result.value);
            } else {
                reject('Operación cancelada');
            }
        });
    });
    
}

const items = [];
let totalItems = 0;

function probar(datos){
    console.log(datos);
}
/*
function openPopup(id) {

    // Create popup window
    var popup = window.open("", "Popup", "width=300,height=200");

        // Create input element for quantity
    var quantityInputPopup = document.createElement('input');
        quantityInputPopup.type = 'number';
        quantityInputPopup.id = 'popupQuantityInput';
                quantityInputPopup.placeholder = 'Ingrese Cantidad';

                // Create button to update quantity
            var updateButton = document.createElement('button');
                updateButton.textContent = 'Update';
                updateButton.addEventListener('click', function() {
                    var quantity = popup.document.getElementById('popupQuantityInput').value;
                    probar(quantity);
                    document.getElementById(id).value = quantity; // Update the quantity input in the main window
                    popup.close();
                });

            // Append input and button to popup window
            popup.document.body.appendChild(quantityInputPopup);
            popup.document.body.appendChild(updateButton);
}
*/
function agregar(Codigo, Material, MaxMaterial) {
    if (Material !== '') {
        totalItems++;
        var itemDiv = document.createElement('div');
        var itemCode = document.createElement('input');
        probar(totalItems);

        // Creo el elemento Codigo
        var itemCode = document.createElement('input');
        itemCode.id = `newCodigo${totalItems}`;
        itemCode.classList.add('newCodigo');
        itemCode.type = 'text';
        itemCode.value = Codigo;
        itemCode.readOnly = true; // Set the input element as read-only

        // Creo el elemento Material
        var itemNameInput = document.createElement('input');
        itemNameInput.id = `newItemInput${totalItems}`;
        itemNameInput.classList.add('newItemInput');
        itemNameInput.type = 'text';
        itemNameInput.value = Material;
        
        // Creo el elemento Cantidad Variable
        var quantityInput = document.createElement('input');
        quantityInput.id = `newQuantityInput${totalItems}`;
        quantityInput.classList.add('newQuantityInput');
        quantityInput.type = 'number';
        quantityInput.value = MaxMaterial;
        quantityInput.addEventListener('click', function() {
            quantityInput.value = ingresarValor();
        });

        // Creo el elemento Cantidad Maxima
        var quantityMax = document.createElement('input');
        quantityMax.id = `newQuantityMax${totalItems}`;
        quantityMax.classList.add('newQuantityInput');
        quantityMax.type = 'number';
        quantityMax.value = MaxMaterial;
        quantityMax.readOnly = true; // Set the input element as read-only
   
        // Creo el elemento Boton de Suma
        var plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.addEventListener('click', function() {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });

        // Creo el elemento Boton de Resta
        var minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.addEventListener('click', function() {
            if (quantityInput.value > 0) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });

        // Agrego los elementos al div
        itemDiv.appendChild(itemCode);
        itemDiv.appendChild(itemNameInput);
        itemDiv.appendChild(quantityInput);
        itemDiv.appendChild(quantityMax);
        itemDiv.appendChild(plusButton);
        itemDiv.appendChild(minusButton);

        // Agrego el div al documento
        document.getElementById('items').appendChild(itemDiv);

        // Limpio los campos
        document.getElementById('newCodigo').value = '';
        document.getElementById('newItemInput').value = '';
        document.getElementById('newItemInput').placeholder='Material';
        document.getElementById('newQuantityInput').value = '';
        document.getElementById('newCodigo').focus();

        // Agrego el item al array
        items.push(new Item(Codigo, Material, MaxMaterial, MaxMaterial));
    }

}

// Agrego el evento al boton y recupero los valores de los inputs
document.getElementById('newItemButton').addEventListener('click', function() {
    var Codigo = document.getElementById('newCodigo').value;
    var Material = document.getElementById('newItemInput').value;
    var Cantidad = document.getElementById('newQuantityInput').value;
    agregar(Codigo, Material, Cantidad);
});