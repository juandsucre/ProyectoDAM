window.onload = inicializacion

var httpreq = new XMLHttpRequest();
function inicializacion(){
    //httpreq.open('GET', 'http://localhost:8080/ProyectoHiberest/webapi/destinatarios/get')
    document.getElementById("crearDestino").addEventListener("click", ingresaDestino)
    httpreq.open('GET', 'http://localhost:8080/ProyectoHiberest/webapi/clientes/get/todos')
    httpreq.onload = procesacreacion
    httpreq.send()
   
}

var posicion = localStorage.getItem('pos');
//console.log(persona[posicion].cifnif);

function ingresaDestino(){
    console.log(document.getElementById("CodPostal").value)
    console.log(document.getElementById("DireccionCom").value)
    console.log(document.getElementById("NombreDestinatario").value)
    console.log(document.getElementById("DNINIF").value)
    if (httpreq.readyState == 4) {
        if (httpreq.status == 200) {
            var persona = JSON.parse(httpreq.responseText);
            let destinatarios = {
                "clientes": {
                    "cifnif": persona[posicion].cifnif,
                    "direccionFacturacion": persona[posicion].direccionFacturacion,
                    "idCliente": persona[posicion].idCliente,
                    "nombreCliente": persona[posicion].nombreCliente
                },
                "codigoPostal": document.getElementById("CodPostal").value,
                "direccionCompleta": document.getElementById("DireccionCom").value,
                "dninif":  document.getElementById("DNINIF").value,
                "idEnvio": 0,
                "nombreDestinatario": document.getElementById("NombreDestinatario").value
            }
            httpreq.open('POST', 'http://localhost:8080/ProyectoHiberest/webapi/destinatarios')
            httpreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            httpreq.onload = procesacreacion
            let jsonstring = JSON.stringify(destinatarios)
            httpreq.send(jsonstring)
        }
    }
}

function procesacreacion(){
    if (httpreq.readyState == 4) {
        if (httpreq.status == 200) {
            let cliente = JSON.parse(httpreq.responseText)
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
            //document.getElementById("idMsg").innerHTML = "Error al añadir destinatario: " + httpreq.status
            //document.getElementById("idFormulario").style.display = "none"
            //document.getElementById("idMsg").style.display = "block"
            //document.getElementById("idConectandose").style.display = "none"
        }
    }
}

function redirecInicio()
{
    window.location.href = 'direcciones.html'
}