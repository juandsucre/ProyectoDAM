window.onload = inicializacion;

var httpreq = new XMLHttpRequest();

function inicializacion()
{
    document.getElementById("crearCliente").addEventListener("click", crearCliente)
    document.getElementById("idmod").addEventListener("click", modificarCliente)

    httpreq.open('GET', 'http://localhost:8080/RestClientes/webapi/clientes/3')
    httpreq.onload = procesapeticion
    httpreq.send()
}

function procesapeticion()
{
    if(httpreq.readyState == 4)
    {
        if(httpreq.status == 200)
        {
            let cliente = JSON.parse(httpreq.responseText)
            document.getElementById("idMSG").style.display = "none"
            document.getElementById("idFormulario").style.display = "block"
            document.getElementById("idConectandose").style.display = "none"
            
            document.getElementById("id").value = cliente.id
            document.getElementById("idcodigo").value = cliente.codigo
            document.getElementById("idempresa").value = cliente.empresa
        }else{
            document.getElementById("idMSG").innerHTML = "Error al conectarse con el servidor: " + httpreq.status
            
            document.getElementById("idFormulario").style.display = "none"
            document.getElementById("idMSG").style.display = "block"
            document.getElementById("idConectandose").style.display = "none"
        }
    }
}

function crearCliente()
{
    location.href = 'formulario.html'
}