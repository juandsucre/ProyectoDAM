window.onload = inicializacion

var httpreq = new XMLHttpRequest();
var httpreqc = new XMLHttpRequest();
function inicializacion() {

    document.getElementById("visualizar").addEventListener("click", visualizarClientes)
    document.getElementById("redirecDestinatarios").addEventListener("click", redirecDestinatarios)

    httpreq.open('GET', 'http://localhost:8080/ProyectoHiberest/webapi/destinatarios/get')
    httpreqc.open('GET','http://localhost:8080/ProyectoHiberest/webapi/clientes/get/todos');
    httpreq.onload = visualizarClientes
    httpreqc.onload = procesacreacion
    httpreq.send()
    httpreqc.send()
}


var posicion = localStorage.getItem('posicion')


function visualizarClientes() {


    if (httpreq.readyState == 4) {
        if (httpreq.status == 200) {
            var persona = JSON.parse(httpreqc.responseText)
            var seleccion = "";
            seleccion += '<select class="form-control" id="select">' + '<option value="1">Seleccione Cliente</option>'

            for (var j = 0; j < persona.length; j++) {
                seleccion += '<option value="' + j + '">' + persona[j].nombreCliente + '</option>'
            }
            seleccion += '</select>'

            document.getElementById("lista").innerHTML = seleccion


            var e = document.getElementById("select");
            var strUser = e.options[e.selectedIndex].value;
            localStorage.setItem("opcions", strUser);
            let posicionSelect = document.getElementById("select").value;
        }
    }
    

    document.getElementById("select").addEventListener("change", actualiza);
}


function actualiza() {
    document.getElementById("tbody").innerHTML = ""
    var destinatarios = JSON.parse(httpreq.responseText);
    var persona = JSON.parse(httpreqc.responseText)
    let posicionSelect = document.getElementById("select").value;
    localStorage.setItem("pos",posicionSelect);
    var bool = 0
    for (var i = 0; i < destinatarios.length; i++) {

        if (destinatarios[i].clientes.idCliente === persona[posicionSelect].idCliente) {
            bool = 1;
            $("#tabla").append(

                '<tr>' +
                '<td>' + destinatarios[i].idDestinatario + '</td>' +
                '<td>' + destinatarios[i].nombreDestinatario + '</td>' +
                '<td>' + destinatarios[i].dninif + '</td>' +
                '<td>' + destinatarios[i].codigoPostal + '</td>' +
                '<td>' + destinatarios[i].direccionCompleta + '</td>'
                + '<td colspan="2">' +
                '<i class="far fa-edit" id="myBtn"></i>'
                + '<i class="far fa-trash-alt"></i>' + '</td>'
                + '</tr>'
            );
        }
    }
    if (bool === 0) {

        $("#tabla").append(
            '<div class="d-flex justify-content-center" style="position:absolute; margin-left:33%"><br>' +
            '<h2 class="text-center"> Este cliente no tiene destinatarios <br> Crea un nuevo destinatario</h2>' +
            '</div>' +
            '<div style="position:absolute; margin-left:45%" class="pt-5">' +
            '<br><button type="button" class="btn btn-success" onclick="redirecDestinatarios()">Crear Destinatario</button>' +
            '</div>'
        );
    }
    document.getElementById("CIFNIF").value = persona[posicionSelect].cifnif
    document.getElementById("direccion").value = persona[posicionSelect].direccionFacturacion

}

function redirecDestinatarios() {
    
    location.href = 'destinatarios.html'
}

function procesacreacion(){
    if (httpreqc.readyState == 4) {
        if (httpreqc.status == 200) {
            //localStorage.setItem("person",httpreqc.responseText);
           

/*          
            document.getElementById("idFormulario").style.display = "block"
            document.getElementById("idMsg").style.display = "block"
            document.getElementById("idMsg").innerHTML = "Cliente " + cliente.id + " creado"
            document.getElementById("idConectandose").style.display = "none"
            PARA OBTENER DATOS DEL OBJETO CLIENTE
            document.getElementById("idID").value = cliente.id
            document.getElementById("idCodigo").value = cliente.codigo
            document.getElementById("idEmpresa").value = cliente.empresa */

        } else {
            document.getElementById("idMsg").innerHTML = "Error al añadir destinatario: " + httpreq.status
            document.getElementById("idFormulario").style.display = "none"
            document.getElementById("idMsg").style.display = "block"
            document.getElementById("idConectandose").style.display = "none"
        }
    }
}
