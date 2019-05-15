$(function(e) {
    // Máscara de fecha
    // $('#birthdate').inputmask('dd-mm-yyyy', {
    //     'placeholder': 'dd-mm-yyyy'
    // });
     $("[data-mask]").inputmask();
    // Select2
    $('.select2').select2();

    // Subir imagenes de galería
    $('#gallery_images').on('change', function(e) {
        if ($(this).val() != "") {
            $('.btn-file-gallery').addClass('btn-success').removeClass('btn-default');
            $('.btn-file-gallery span').html('Subiendo imágenes, por favor espere... <i class="fa fa-spinner fa-spin"></i>');
            $('.btn-submit').attr('disabled', true);
        }
    });

    $("#frm-edit").validate({
        rules: {
            name: {
                required: true,
                noSpecialCharacters: /([*+?^${}()|\[\]\/\\])/g
            },
            last_name: {
                required: true,
                noSpecialCharacters: /([*+?^${}()|\[\]\/\\])/g
            },
            email: {
                required: true,
                email: true
            },
            skype: {
                required: true,
                noSpecialCharacters: /([*+?^${}()|\[\]\/\\])/g
            },
            work_phone: {
                rangelength: [5, 18],
            },
            personal_phone: {
                rangelength: [5, 18],
            },
            "gender": {
                required: true,
            },
            birthdate: {
                required: true,
            }
        },
        messages: {
            name: {
                required: "Debes ingresar al menos un nombre",
                noSpecialCharacters: "No se permiten caracteres especiales"
            },
            last_name: {
                required: "Debes ingresar al menos un apellido",
                noSpecialCharacters: "No se permiten caracteres especiales"
            },
            email: {
                required: "Debes agregar un E-mail",
                email: "Debes ingresar un E-mail válido"
            },
            skype: {
                required: "Debes ingresar el nombre de usuario de Skype",
                noSpecialCharacters: "No se permiten caracteres especiales"
            },
            work_phone: {
                rangelength: "Debe singresra un número telefónico válido",
            },
            personal_phone: {
                rangelength: "Debe singresra un número telefónico válido",
            },
            "gender": {
                required: "Debes seleccionar un género",
            },
            birthdate: {
                required: "Debes ingresar la fecha de nacimiento",
            }
        },
        errorPlacement: function(error, element) {
            var name = $(element).attr("id");
            error.appendTo($("#" + name + "_validate"));
        },
        submitHandler: function(form) {

            return false;
        }
    });
});
