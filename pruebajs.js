window.onload = inicializacion

var httpreq = new XMLHttpRequest();

function inicializacion() {
    document.getElementById("crearCliente").addEventListener("click", crearCliente)
    document.getElementById("idModificar").addEventListener("click", modificarCliente)
    document.getElementById("visualizar").addEventListener("click", visualizarClientes)

    httpreq.open('GET', 'http://localhost:8080/ProyectoHiberest/webapi/clientes/')
    httpreq.onload = procesapeticion
    httpreq.send()
}

function procesapeticion() {
    if (httpreq.readyState == 4) {
        if (httpreq.status == 200) {
            let cliente = JSON.parse(httpreq.responseText)

            document.getElementById("idFormulario").style.display = "block"
            document.getElementById("idMsg").style.display = "none"
            document.getElementById("idConectandose").style.display = "none"

            document.getElementById("idID").value = cliente.id
            document.getElementById("idCodigo").value = cliente.codigo
            document.getElementById("idEmpresa").value = cliente.empresa

        } else {
            document.getElementById("idMsg").innerHTML = "Error al conectarse con el servidor: " + httpreq.status
            document.getElementById("idFormulario").style.display = "none"
            document.getElementById("idMsg").style.display = "block"
            document.getElementById("idConectandose").style.display = "none"
        }
    }
}

function crearCliente() {
    let cliente = {
        "id": 0,
        "codigo": document.getElementById("idCodigo").value,
        "empresa": document.getElementById("idEmpresa").value,
    }

    httpreq.open('POST', 'http://localhost:8080/RestClientes/webapi/clientes')
    httpreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpreq.onload = procesacreacion
    let jsonstring = JSON.stringify(cliente)
    httpreq.send(jsonstring)
    document.getElementById("idConectandose").style.display = "block"
}


function procesacreacion() {
    if (httpreq.readyState == 4) {
        if (httpreq.status == 200) {
            let cliente = JSON.parse(httpreq.responseText)

            document.getElementById("idFormulario").style.display = "block"
            document.getElementById("idMsg").style.display = "block"
            document.getElementById("idMsg").innerHTML = "Cliente " + cliente.id + " creado"
            document.getElementById("idConectandose").style.display = "none"

            document.getElementById("idID").value = cliente.id
            document.getElementById("idCodigo").value = cliente.codigo
            document.getElementById("idEmpresa").value = cliente.empresa

        } else {
            document.getElementById("idMsg").innerHTML = "Error al añadir cliente: " + httpreq.status
            document.getElementById("idFormulario").style.display = "none"
            document.getElementById("idMsg").style.display = "block"
            document.getElementById("idConectandose").style.display = "none"
        }
    }
}
function crearCliente()
{
    location.href = 'formulario.html'
}

function cancelar()
{
    window.location.href = 'index.html'
}

function visualizarClientes(){
    //var name = document.getElementById('id').value;

    var httpreq = new XMLHttpRequest();
    httpreq.onreadystatechange = function(){
        if(httpreq.readyState == 4){
            if(httpreq.status == 200){
                var person = JSON.parse(httpreq.responseText);
                document.getElementById('cif').value = person.birthYear;
                //document.getElementById('about').value = person.about;
            }
        }			
    }
    //httpreq.open('GET', 'http://localhost:8080/people/' + name);
    httpreq.send();
}
