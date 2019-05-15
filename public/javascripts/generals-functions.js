$(function(e){
	// Solo números enteros
	$('.only-number').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g,'');
    });

	// Solo decimales
    $('.only-decimal').on('input', function () {
        this.value = this.value.replace(/[^0-9.]/g,'');
    });

	// Solo números telefónicos
	$('.only-phone').on('input', function () {
		var regex = /[^+\d]/g;
		
		if($(this).val() == ""){ $(this).val("+") }
		$(this).val($(this).val().replace(regex, ""))
    });
});

/**
 * Lleva el sitio web al top
 * @return {void}
 */
function to_top()
{
	$(document).scrollTop(0);
}

/**
 * Resetea un formulario
 * @param {string} form ID del formulario
 */
function formReset(form) {
	document.getElementById(form).reset();
}

/**
 * Ejecuta una sentiencia ajax y muestra el resultado en un elemnto con el ID ingresado
 * @param  {string} URL Direccion del servicio ajax
 * @param  {string} ID  ID del tag donde se va a mostrar el resultado de la consulta
 * @return {string}
 */
function sendAJAX(URL, ID)
{
	var myURL = URL;
	$.ajax({
		type: "GET",
		url: myURL,
		dataType: 'json',
		success: function(data){
			$("#"+ID).html(data.response);
		}
	});
}

/**
 * Elimina una entrada por medio de Ajax
 * @param  {string} ajx Ruta del archivo ajax
 * @param  {string} url URL a donde se redireccionara la pantalla si la respuesta es true
 *
 */
function elimAction(ajx, url) {
	if (confirm("¿Estás seguro de eliminar esta entrada?")) {
		$.ajax({
			type: 'GET',
			url: ajx,
			dataType: 'json',
			success: function(r) {
				if (r.status == "OK") {
					$(location).attr("href", url+"&persist=3");
				} else {
					$(location).attr("href", url+"&persist=4");
				}
			}
		});
	}
}

/**
 * Envia una imagen a un servicio ajax
 * @param  {String} frm     Nombre del formulario contenedor
 * @param  {String} ajaxURL Ruta del servicio ajax
 * @param  {String} divID   ID del tag donde se mostrará el resultado
 * @return {Object}
 */
function saveImgAjax(frm, ajaxURL, divID){
	var formData = new FormData(document.getElementById(frm));

	$.ajax({
		type: 'POST',
		url: ajaxURL,
		dataType: 'json',
		data: formData,
		cache: false,
		contentType: false,
		processData: false,
		success: function(r){
			if (r.status == "OK") {
				$("#"+divID).html(r.data);
			} else {
				$("#"+divID).html('<span class="text-danger">' + r.message + '</span>');
			}

		}
	});
	return false;
}

/**
 * Elimina una entrada usando el modal de Bootstrap
 * @param  {string}  ID  ID del boton donde se encuentra el id de la entrada
 * @param  {integer} acc Accion a realizar [1 = dispara el modal, 2 = elimina la entrada]
 *
 */
function deleteBoostrapAction(ID, acc, p_url = "") {
	var url = "";

	if (p_url == "") {
		url = window.location.href + "/OK3";
	} else {
		url = p_url;
	}

	if (acc == 1) {
		$("#mod-remove").modal('show');
		$("#mod-remove-btn").data('id', ID);
	} else if (acc == 2) {
		var parameters = $("#mod-remove-btn").data('id');

		$.ajax({
			type: 'GET',
			url: base_url + "adm/ajax/remove/" + parameters,
			dataType: 'json',
			success: function(r){
				if (r.status === "OK") {
					$(location).attr("href", url);
				} else {
					to_top();
					$('.js-alert').html('<div class="alert alt-alert alert-danger" role="alert">' + r.message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + '</div>');
					$("#mod-remove").modal('hide');
				}
			}
		});
	}
}

function SelfdeleteBoostrapAction(URLremove, acc, p_url = "") {
	var url = "";

	if (p_url == "") {
		url = window.location.href + "/OK3";
	} else {
		url = p_url;
	}

	if (acc == 1) {
		$("#mod-remove").modal('show');
		$("#mod-remove-btn").data('id', URLremove);
	} else if (acc == 2) {
		var parameters = $("#mod-remove-btn").data('id');

		$.ajax({
			type: 'GET',
			url: parameters,
			dataType: 'json',
			success: function(r){
				if (r.status === "OK") {
					$(location).attr("href", url);
				} else {
					to_top();
					$('.js-alert').html('<div class="alert alt-alert alert-danger" role="alert">' + r.message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + '</div>');
					$("#mod-remove").modal('hide');
				}
			}
		});
	}
}

/**
 * Realiza un preview de la imagen a guardar
 * @param  {event}  evt     Evento del FILE
 * @param  {string} output  Tag donde se mostrará el preview
 * @return {object}
 */
function previewImage (evt, output) {
	var files = evt.target.files;

	for (var i = 0, f; f = files[i]; i++) {
		if (!f.type.match('image.*')) {
			continue;
		}

		var reader = new FileReader();

		reader.onload = (function(theFile) {
			return function(e) {
				document.getElementById(output).innerHTML = ['<img class="img-responsive" id="js-img-tumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
			};
		})(f);

		reader.readAsDataURL(f);
	}
}

/**
 * Obtiene el valor de un parametro GET
 * @param  {string} name Nombre del parametro
 * @param  {string} url  URL donde se encuentra el parametro [Puede estar vacío]
 * @return {object}
 */
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * Obtiene el Valor de una cookie
 * @param  {string} cname Nombre de la cookie a la que se quiere acceder
 * @return {string}
 */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function delete_cookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

/**
 * Se encarga de persistir un formulario
 * @param       {string} form_name Nombre del formulario
 * @param       {string} ajx       nombre ajx
 * @param       {string} act       Acción
 * @param       {string} url       URL de redirección
 * @constructor
 */
function JSpersist(form_name, ajx, act, url)
{
    var i = $("#" + form_name).serialize();
	var ext = "";

	if (act) {
		ext = act;
	}

    $.ajax({
        type: 'POST',
        // url: base_admin + "ajax.php?m=" + ajx + "&act=" + act,
		url: base_url + "ajax/" + ajx + ext,
        dataType: 'json',
        data: i,
        beforeSend: function() {
            $(".js-submit").attr("disabled", true).html('<i class="fa fa-spinner fa-spin"></i> Cargando...');
        },
        success: function(r){
            if (r.status == 'OK') {
                $(location).attr("href", url);
            } else {
                $('.js-alert').html('<div class="alert alt-alert alert-danger" role="alert">' + r.message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + '</div>');
                $(".btn-submit").attr("disabled", false).html('Guardar');
                $(document).scrollTop(0);
            }
        }
    });
}

/**
 * Se encarga de persistir un formulario
 * @param       {string} form_name Nombre del formulario
 * @param       {string} ajx_url   Ruta del ajax
 * @param       {string} url       URL de redirección
 * @constructor
 */
function JSpersistCustom(form_name, ajx_url, url_done, act)
{
    var i = $("#" + form_name).serialize();

    $.ajax({
        type: 'POST',
        url: base_url + ajx_url,
        dataType: 'json',
        data: i,
        beforeSend: function() {
            $(".js-submit").attr("disabled", true).html('<i class="fa fa-spinner fa-spin"></i> Cargando...');
        },
        success: function(r){
            if (r.status == 'OK') {
                $(location).attr("href", url_done + '/' + r.id + '/OK' + act);
            } else {
                $('.js-alert').html('<div class="alert alt-alert alert-danger" role="alert">' + r.message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + '</div>');
                $(".btn-submit").attr("disabled", false).html('Guardar');
                $(document).scrollTop(0);
            }
        }
    });
}

/**
 * Cambia el formato de las fechas a DD-MM-YYYY
 * @param  {string} inputFormat Fecha sin formato
 * @return {string}
 */
function convertDate(inputFormat) {
	function pad(s) { return (s < 10) ? '0' + s : s; }
	var d = new Date(inputFormat);
	return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-');
}
