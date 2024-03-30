document.querySelectorAll('#contenedor-car-general .ui.action.input').forEach(function(element) {
    let id_color = element.getAttribute('data-producto-id');
    let producto_id = element.querySelector('.ui.input.focus').getAttribute('data-producto-id');
    let iva = element.querySelector('.iva-general').getAttribute('data-producto-id');
    console.log(id_color, producto_id, iva);
    input_cant(id_color, 'gen',producto_id);
    calcularValores()
});

document.querySelectorAll('#contenedor-car-responsive-padre .ui.action.input').forEach(function(element) {
    let id_color = element.getAttribute('data-producto-id');
    let producto_id = element.querySelector('.ui.input.focus').getAttribute('data-producto-id');
    let iva = element.querySelector('.iva-general').getAttribute('data-producto-id');
    console.log(id_color, producto_id, iva);
    input_cant(id_color, 'res',producto_id);
});

/*el mono paso por aqui*/
function modificar_cant(producto_id,color_id,cantidad) {
    var vlr_unit = document.getElementById("valor_unitario_"+producto_id);
    var valor_unitario = parseFloat(vlr_unit.querySelector("h4").innerText.replace("$", ""));
    var acum = document.getElementById("acumulado_producto_"+color_id);
    acumulado = document.getElementById("acumulado-general-"+color_id);
    acumulado.setAttribute('data-producto-id', valor_unitario * cantidad);
    acum.querySelector("h4").innerText = "$" + valor_unitario*cantidad;
    var xhr = new XMLHttpRequest();
    var url = '/carrito/modificarcant/?/?/?'
    .replace("?",producto_id)
    .replace("?",color_id)
    .replace("?",cantidad);

    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        console.log(url)
        console.log("Ready state:", xhr.readyState);
        console.log("Status:", xhr.status);
    };

    calcularValores()

    xhr.send();
};
function calcularValores(){
    subtotal_sin_iva = 0;
    total_iva = 0;
    acum = 0;
    document.querySelectorAll('#contenedor-car-general .ui.action.input').forEach(function(element){
        let iva = element.querySelector('.iva-general').getAttribute('data-producto-id');
        let acumulado = element.querySelector('.acumulado-general').getAttribute('data-producto-id');
        subtotal_sin_iva += Math.round(acumulado/(1+(iva/100)));
        total_iva += Math.round(acumulado-(acumulado/(1+(iva/100))))
    });
    contenedor = document.querySelector('.ui.unstackable.celled.table.summary-table');
    contenedor.querySelector('.subtotal-value.letra').innerText = "$" + Math.round(subtotal_sin_iva);
    contenedor.querySelector('.shipping-value.letra').innerText = "$" + Math.round(total_iva);
    total = parseInt(subtotal_sin_iva)+parseInt(total_iva);
    contenedor.querySelector('.total-value.letra').innerText = "$" + total;
}
function input_cant(id_color, containerId,producto_id) {
    $.ajax({
        url: '/obtener_imagen_color/',
        method: 'GET',
        data: { 'colorId': id_color },
        success: function(response) {
            let quantityInput = document.getElementById(containerId + '-' + id_color);
            let increaseBtn = document.getElementById(containerId + '-increase-' + id_color);
            let decreaseBtn = document.getElementById(containerId + '-decrease-'+ id_color);

            quantityInput.max = response.cantidad;

            increaseBtn.addEventListener('click', function() {
                if (parseInt(quantityInput.value) < parseInt(quantityInput.max)) {
                    quantityInput.value = parseInt(quantityInput.value) + 1;
                    modificar_cant(producto_id,id_color,quantityInput.value);
                }
            });

            decreaseBtn.addEventListener('click', function() {
                if (parseInt(quantityInput.value) >= 2) {
                    quantityInput.value = parseInt(quantityInput.value) - 1;
                    modificar_cant(producto_id,id_color,quantityInput.value);
                }
                else if (parseInt(quantityInput.value) <= 1) {
                    quantityInput.value = 1;
                    modificar_cant(producto_id,id_color,quantityInput.value);
                }
            });
            quantityInput.addEventListener("change", function() {
                if (parseInt(quantityInput.value) > parseInt(quantityInput.max)) {
                    quantityInput.value = parseInt(quantityInput.max);
                    modificar_cant(producto_id,id_color,quantityInput.value);
                }
                else if (parseInt(quantityInput.value)< 1){
                    quantityInput.value = 1;
                    modificar_cant(producto_id,id_color,quantityInput.value);
                }else{
                    modificar_cant(producto_id,id_color,quantityInput.value);
                }
            }
            )

        },
        error: function() {
            console.log("Super error");
        }
    });
}

