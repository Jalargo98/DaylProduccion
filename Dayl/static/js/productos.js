$(document).ready(function() {
    // Aplicar truncado de texto a los elementos h3 y p con clase "clamp-2"
    $('.clamp-2').each(function() {
        var maxHeight = parseFloat($(this).css('line-height')) * 2; // Calcular altura máxima en píxeles (2 líneas)
        var textHeight = $(this).height(); // Obtener altura actual del contenido
        if (textHeight > maxHeight) {
            $(this).text(function(index, currentText) {
                return currentText.replace(/\W*\s(\S)*$/, '...'); // Truncar texto agregando puntos suspensivos
            });
        }
    });
});