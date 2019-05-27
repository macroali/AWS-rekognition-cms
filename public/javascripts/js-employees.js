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
            filePreview(this);
            $('.btn-file-gallery span').html('Subir más imágenes');
            $('.btn-submit').attr('disabled', false);

        }
    });

    $('.gallery').on('click', '.show-image', function(e){
        var URI = $(this).data('uri');
        $('.mod-image').html('<img src="' + URI + '" class="img-responsive" alt="employee">');
        $("#mod-show").modal();
    });

    $('.gallery').on('click', '.remove-image', function(e){
        var image = $(this).data('image');
        var parent = $(this).parent();
        var objRequest = {
            employe_id: $('#key').data('id'),
            image: image,
        }
        if (confirm("¿Estás seguro de eliminar esta imagen?")) {
            $.ajax({
                type: 'POST',
                url: awsAPI + '/employee-image-remove',
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(objRequest),
                cache: false,
                processData: false,
                beforeSend: function(){
                    $(".btn-submit").attr("disabled", true).html('<i class="fa fa-spinner fa-spin"></i> Cargando...');
                },
                success: function(r){
                    if (r.code == '200') {
                        parent.remove();
                    } else {
                        $('.js-alert').html('<div class="alert alt-alert alert-danger" role="alert">' + r.message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + '</div>');
                        $(".btn-submit").attr("disabled", false).html('Guardar');
                        $(document).scrollTop(0);
                    }
                }
            });
        }
    })

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
            persist();
            return false;
        }
    });
});

function persist() {
    var formData = new FormData(document.getElementById('frm-edit'));

    prepareImages(document.getElementById('gallery_images').files).then(function(res){
        var objRequest = {
            name: formData.get("name"),
            last_name: formData.get("last_name"),
            email: formData.get("email"),
            skype: formData.get("skype"),
            work_phone: formData.get("work_phone"),
            personal_phone: formData.get("personal_phone"),
            gender: formData.get("gender"),
            birthday: to_date(formData.get("birthdate")),
            images: res
        }

        setTimeout(function(){
            $.ajax({
                type: 'PUT',
                url: awsAPI + '/employee?id=' + $('#key').data('id'),
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(objRequest),
                cache: false,
                processData: false,
                beforeSend: function(){
                    $(".btn-submit").attr("disabled", true).html('<i class="fa fa-spinner fa-spin"></i> Cargando...');
                },
                success: function(r){
                    if (r.code == '200') {
                        // $(location).attr("href", base_url + "employees/edit/" + $('#key').data('id'));
                        location.href = base_url + "/employees/edit/" + $('#key').data('id');
                    } else {
                        $('.js-alert').html('<div class="alert alt-alert alert-danger" role="alert">' + r.message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + '</div>');
                        $(".btn-submit").attr("disabled", false).html('Guardar');
                        $(document).scrollTop(0);
                    }
                }
            });
        }, 500)

        return false;
    });
}

function prepareImages(files)
{
    var images = [];

    return new Promise(function(resolve, reject){
        for (var i in files) {
            var file = files[i];

            if (file && files) {
                if (typeof file === 'object') {
                    var FR = new FileReader();

                    FR.onload = function(e) {
                        images.push(e.target.result);
                    }

                    FR.readAsDataURL(file);
                }
            }
        }
        resolve(images);
    });
}


/**
 * Realiza el preview de las imagenes
 * @param  {object} input Objeto del input FILE
 * @return {void}
 */
function filePreview(input) {
    if (input.files) {
        var filesAmount = input.files.length;
        var cnt = 0;

        for (i = 0; i < filesAmount; i++) {
            var reader = new FileReader();

            reader.onload = function(e) {
                cnt++;
                var break_line = ((cnt % 4) == 0) ? true : false;
                if (cnt == 1) {
                    $("#ajx-gallery").append('<div class="clearfix css-marginB10"></div>');
                }

                if (break_line) {
                    $("#ajx-gallery").append('<div class="col-md-3"><img src="' + e.target.result + '" class="css-preview" alt="preview"></div><div class="clearfix css-marginB10"></div>');
                } else {
                    $("#ajx-gallery").append('<div class="col-md-3"><img src="' + e.target.result + '" class="css-preview" alt="preview"></div>');
                }
                // $($.parseHTML('<img>')).attr('src', e.target.result).appendTo("#ajx-gallery");
            }

            reader.readAsDataURL(input.files[i]);
        }
    }
}
