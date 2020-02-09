window.onload = inicializacion
var httpreq = new XMLHttpRequest();
var httpreqenv = new XMLHttpRequest();
function inicializacion(){

   // document.getElementById("enviar").addEventListener("click", enviar)
    //document.getElementById("generar").addEventListener("click", procesaqr)
    
    httpreq.open('GET', 'http://localhost:8080/ProyectoHiberest/webapi/clientes/get/todos')
    httpreqenv.open('GET', 'http://localhost:8080/ProyectoHiberest/webapi/envios/get')
    httpreq.onload = procesacreacion
    httpreqenv.onload = actualiza
    httpreq.send();
    httpreqenv.send();
}

function procesacreacion(){
    if (httpreq.readyState == 4) {
        if (httpreq.status == 200) {
            var persona = JSON.parse(httpreq.responseText);

            var seleccion = "";
            seleccion+= '<select class="form-control" id="clienteEnvia"  onchange="getDestinatarios()">'+'  <option value="1">Seleccione Cliente</option>'
          
            for (var j = 0; j < persona.length; j++){
                //'<option id="'+i+'">'+envios[i].nombreCliente+'</option>'
                seleccion+='<option value="' + j + '">' + persona[j].nombreCliente + '</option>'
               
            }
            seleccion+= '</select>'
            document.getElementById("clienteEnvia").innerHTML= seleccion
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
    document.getElementById("clienteEnvia").addEventListener("change",actualiza)

}

function actualiza() {
    document.getElementById("tbody").innerHTML = ""
    var envios = JSON.parse(httpreqenv.responseText);
    var persona = JSON.parse(httpreq.responseText)
    let posicionSelect = document.getElementById("clienteEnvia").value;
    var bool = 0
    for (var i = 0; i < envios.length; i++) {

        if (envios[i].clientes.idCliente === persona[posicionSelect].idCliente) {
            bool = 1;
            $("#tabla").append(

                '<tr>' +
                '<td>' + envios[i].clientes.idCliente + '</td>' +
                '<td>' + envios[i].nombreDestinatario + '</td>' +
                '<td>' + envios[i].direccionCompleta +'</td>' +
                '<td>'+ envios[i].estadosenvio.descripcionEstado +  '</td>' +
                '<td>' + envios[i].numIntentosEntrega +'</td>'
                + '<td colspan="2">' +
                '<i class="far fa-edit" id="myBtn"></i>'
                + '<i class="far fa-trash-alt"></i>' + '</td>'
                + '</tr>'
            );
        }
    }
    if (bool === 0) {

        $("#tabla").append(
            '<div class="d-flex justify-content-center" style="position:absolute; margin-left:25%; color:black"><br>' +
            '<h2 class="text-center;">Este Cliente no tiene ningun envío Pendiente <br> Crea un nuevo Envío</h2>' +
            '</div>' +
            '<div style="position:absolute; margin-left:45%" class="pt-5">' +
            '<br><button type="button" class="btn btn-success" onclick="redirecDestinatarios()">Crear Envío</button>' +
            '</div>'
        );
    }
    document.getElementById("CIFNIF").value = persona[posicionSelect].cifnif
    document.getElementById("direccion").value = persona[posicionSelect].direccionFacturacion

}