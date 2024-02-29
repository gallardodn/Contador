class Item {
    constructor(codigo, name, quantity, maximo) {
        this.codigo = codigo;
        this.name = name;
        this.quantity = quantity;
        this.maximo = maximo;
    }
}


// funcion para ingresar un valor con una ventana emergente de sweetalert
async function ingresarValor() {
    const result = await Swal.fire({
        title: 'Ingrese un valor',
        input: 'number',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (isNaN(value)) {
                return 'Debe ingresar un valor numérico';
            }
        }
    });
    probar(`EL resultado es: ${result}`);
    probar(`EL valor del resultado es: ${result.value}`);
    if (result.isConfirmed) {
        probar(result.value);
        return result.value;
    } else {
        throw new Error('Operación cancelada');
    }
}

const items = [];
let totalItems = 0;

function probar(datos){
    console.log(datos);
}

function agregar(Codigo, Material, varMaterial, MaxMaterial) {
    if (Material !== '') {
        totalItems++;
        var itemDiv = document.createElement('div');
        probar("items totales ",totalItems);

        // Creo el elemento Codigo
        var itemCode = document.createElement('span');
        itemCode.id = `newCodigo${totalItems}`;
        itemCode.classList.add('newCodigo');
        itemCode.type = 'text';
        itemCode.textContent = Codigo;
        itemCode.readOnly = true; // Set the input element as read-only

        // Creo el elemento Material
        var itemNameInput = document.createElement('span');
        itemNameInput.id = `newItemInput${totalItems}`;
        itemNameInput.classList.add('newItemInput');
        itemNameInput.type = 'text';
        itemNameInput.textContent = Material;
        
        // Creo el elemento Cantidad Variable
        var quantityInput = document.createElement('input');
        quantityInput.id = `newQuantityInput${totalItems}`;
        quantityInput.classList.add('newQuantityInput');
        quantityInput.type = 'number';
        quantityInput.value = varMaterial;
        quantityInput.addEventListener('click', async function() {
            try {
                var numero = await ingresarValor();
                probar(`Esto deberia dar un numero ${numero}`);
                quantityInput.value = numero;
            } catch (error) {
                probar(`Error: ${error}`);
            }
        });
        // Creo el elemento Cantidad Maxima
        var quantityMax = document.createElement('span');
        quantityMax.id = `newQuantityMax${totalItems}`;
        quantityMax.classList.add('newQuantityInput');
        quantityMax.type = 'text';
        quantityMax.textContent = MaxMaterial;
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
        itemDiv.appendChild(quantityMax);
        itemDiv.appendChild(quantityInput);
        itemDiv.appendChild(plusButton);
        itemDiv.appendChild(minusButton);

        // Agrego el div al documento
        document.getElementById('items').appendChild(itemDiv);

        // Limpio los campos
        LimpiarCampos();

        // Create Item object
        var newItem = new Item(Codigo, Material, varMaterial, MaxMaterial);
        items.push(newItem);

        // Save items to localStorage
        localStorage.setItem('items', JSON.stringify(items));
    }
}

function LimpiarCampos() {
    document.getElementById('newCodigo').value = '';
    document.getElementById('newItemInput').value = '';
    document.getElementById('newItemInput').placeholder='Material';
    document.getElementById('newQuantityInput').value = '';
    document.getElementById('newCodigo').focus();
}

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
function recuperarCampos() {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const totalItems = items.length;
    
    for (let i = 0; i < totalItems; i++) {
        const { Codigo, Material, Cantidad, Maximo } = items[i];
        agregar(Codigo, Material, Cantidad, Maximo);
    }
}


// Agrego el evento al boton y recupero los valores de los inputs
document.getElementById('newItemButton').addEventListener('click', function() {
    var Codigo = document.getElementById('newCodigo').value;
    var Material = document.getElementById('newItemInput').value;
    var Cantidad = document.getElementById('newQuantityInput').value;
    agregar(Codigo, Material, Cantidad, Cantidad);
});