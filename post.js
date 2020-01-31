window.onload = inicializacion

var httpreq = new XMLHttpRequest();

function inicializacion() {
    document.getElementById("crearCliente").addEventListener("click", crearCliente)
    //document.getElementById("idModificar").addEventListener("click", modificarCliente)
    //document.getElementById("visualizar").addEventListener("click", visualizarClientes)
    document.getElementById("redirecInicio").addEventListener("click", redirecInicio)

    httpreq.open('GET', 'http://localhost:8080/ProyectoHiberest/webapi/clientes/get')
    //httpreq.onload = procesapeticion
    httpreq.send()
}

function crearCliente() {
    let cliente = {
        "cifnif": document.getElementById("CIF").value,
        "destinatarioses": [],
        "direccionFacturacion": document.getElementById("Direccion").value,
        "envioses": [],
        "idCliente": 0,
        "nombreCliente": document.getElementById("NombreCliente").value,
    }

    httpreq.open('POST', 'http://localhost:8080/ProyectoHiberest/webapi/clientes/add')
    httpreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpreq.onload = procesacreacion
    let jsonstring = JSON.stringify(cliente)
    httpreq.send(jsonstring)
  //  alert("Se ha creado el cliente")
}

function procesacreacion() {
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
            document.getElementById("idMsg").innerHTML = "Error al añadir cliente: " + httpreq.status
            document.getElementById("idFormulario").style.display = "none"
            document.getElementById("idMsg").style.display = "block"
            document.getElementById("idConectandose").style.display = "none"
        }
    }
}
function redirecInicio()
{
    window.location.href = 'index.html'
}