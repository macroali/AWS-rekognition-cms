$(function(e){
    $('.table').DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ entradas por página",
            "zeroRecords": "No se han encontrado resultados",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No se han encontrado resultados",
            "infoFiltered": "(Se ha filtrado un total de _MAX_ entradas)",
            "search": "Buscar: ",
            "paginate": {
                "previous": "Anterior",
                "next": "Siguiente"
            }
        }
    });
});
