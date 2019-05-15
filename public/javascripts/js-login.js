$(function() {
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' /* optional */
    });

    // Validación del formulario de inicio de sesión
    $("#frm-login").validate({
        rules: {
            username_email: {
                required: true,
                rangelength: [2, 20],
                noSpecialCharacters: /([*+?^${}()|\[\]\/\\])/g
            },
            pass: {
                required: true,
                rangelength: [3, 20],
            },
        },
        messages: {
            username_email: {
                required: "Debes ingresar tu Nombre de Usuario",
                rangelength: "El Usuario debe tener entre 2 y 20 caracteres",
                noSpecialCharacters: "No se permiten caracteres especiales"
            },
            pass: {
                required: "Debes ingresar tu contraseña",
                rangelength: "La contraseña debe tener entre 2 y 20 caracteres",
            },
        },
        errorPlacement: function(error, element) {
            var name = $(element).attr("id");
            error.appendTo($("#" + name + "_validate"));
        },
        submitHandler: function(form) {
            login();
            return false;
        }
    });
});

function login(){
    var i = $('#frm-login').serialize();

    $.ajax({
        type: 'POST',
        url: base_url + '/ajx/login',
        data: i,
        dataType: 'json',
        beforeSend: function(){
            $(".btn-submit").attr("disabled", true).html('<i class="fa fa-spinner fa-spin"></i> Cargando');
        },
        success: function(r){
            if (r.status == 'OK') {
                $('.js-alert').html('<div class="alert alt-alert alert-success" role="alert">Inicio de sesión corrceto. Redireccionando <i class="fa fa-circle-o-notch fa-spin"></i><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + '</div>');
                $(location).attr('href', base_url + '/dashboard');
            } else if (r.status == 'Error') {
                $('.js-alert').html('<div class="alert alt-alert alert-danger" role="alert">' + r.message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + '</div>');
                $(".btn-submit").attr("disabled", false).html('Entrar');
                $(document).scrollTop(0);
            }
        }
    })
}
