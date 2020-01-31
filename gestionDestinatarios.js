window.onload = inicializacion

var httpreq = new XMLHttpRequest();
function inicializacion(){
    //httpreq.open('GET', 'http://localhost:8080/ProyectoHiberest/webapi/destinatarios/get')
    document.getElementById("crearDestino").addEventListener("click", ingresaDestino)
}

var posicion = localStorage.getItem('opcions');
//alert(posicion);
var objPer = JSON.parse(localStorage.getItem('persona'));
console.log(objPer[posicion].cifnif);

function ingresaDestino(){

    let destinatarios = {
        "clientes" : {
            "cifnif": objPer[posicion].cifnif,
            "direccionFacturacion": objPer[posicion].direccionFacturacion,
            "idCliente": objPer[posicion].idCliente,
            "nombreCliente": objPer[posicion].nombreCliente
        },
        "nombreDestinatario": document.getElementById("NombreDestinatario").value,
        "dninif": document.getElementById("DNINIF").value,
        "codigoPostal": document.getElementById("CodPostal").value,
        "direccionCompleta": document.getElementById("DireccionCom").value,
        "idDestinatario": 0,
    }
    httpreq.open('POST', 'http://localhost:8080/ProyectoHiberest/webapi/destinatarios')
    httpreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpreq.onload = procesacreacion
    let jsonstring = JSON.stringify(destinatarios)
    httpreq.send(jsonstring)
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
            document.getElementById("idMsg").innerHTML = "Error al añadir destinatario: " + httpreq.status
            document.getElementById("idFormulario").style.display = "none"
            document.getElementById("idMsg").style.display = "block"
            document.getElementById("idConectandose").style.display = "none"
        }
    }
}

function redirecInicio()
{
    window.location.href = 'direcciones.html'
}