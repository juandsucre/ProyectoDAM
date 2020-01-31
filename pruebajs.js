window.onload = inicializacion
var httpreq = new XMLHttpRequest();
function inicializacion() {
    // document.getElementById("crearCliente").addEventListener("click", crearCliente)
    // document.getElementById("idModificar").addEventListener("click", modificarCliente)

    document.getElementById("siguiente").addEventListener("click", siguiente)
    document.getElementById("redirecRegistro").addEventListener("click", redirecRegistro)
    document.getElementById("redirecDestinatarios").addEventListener("click", redirecDestinatarios)

    httpreq.open('GET', 'http://localhost:8080/ProyectoHiberest/webapi/clientes/get')
    //httpreq.onload = procesapeticion
    httpreq.onload = visualizarClientes
    httpreq.send()
}

function redirecDestinatarios(){
    alert("Hola")
    location.href = 'destinatarios.html'
}


function redirecRegistro() {
    location.href = 'formulario.html'
}

function cancelar() {
    window.location.href = 'index.html'
}

function visualizarClientes() {
    //var name = document.getElementById('id').value;
    //var httpreq = new XMLHttpRequest();
    if (httpreq.readyState == 4) {
        if (httpreq.status == 200) {
            var person = JSON.parse(httpreq.responseText);
            localStorage.setItem('persona', JSON.stringify(person));
            for (var i = 0; i < 21; i++) {
                $("#tabla").append(
                    '<tr>' +
                    '<td >'+ '<p  style ="cursor: pointer;">' + person[i].idCliente + '</p>' +'</td>' +
                    '<td onclick="editar(this,' + person[i].idCliente + ',' + i + ')">' +'<p style="cursor:pointer">'+ person[i].cifnif +'</p>'+ '</td>' +
                    '<td onclick="editar(this,' + person[i].idCliente + ',' + i + ')">' +'<p style="cursor:pointer">'+ person[i].nombreCliente +'</p>'+ '</td>' +
                    '<td onclick="editar(this,' + person[i].idCliente + ',' + i + ')">' +'<p style="cursor:pointer">'+ person[i].direccionFacturacion +'</p>'+ '</td>'
                    + '<td colspan="2">' +
                    '<i style ="cursor: pointer;" class="far fa-edit" onclick="editar(this,' + person[i].idCliente + ',' + i + ')" id="myBtn"></i>'
                    + '<i style ="cursor: pointer;" class="far fa-trash-alt" onclick="eliminar(this ,' + person[i].idCliente + ',' + i + ')" id="modal"></i>' + '</td>'
                    + '</tr>'
                )
            }
            //document.getElementById('about').value = person.about;
        }
    }

    //httpreq.open('GET', 'http://localhost:8080/ProyectoHiberest/webapi/clientes/2')
    //httpreq.send();
}

//------- dispara al tocar el icono de editar -------
function editar(ctl, persona, i) {
    var j = i;
    var oPersona = persona
    var oPersona = JSON.parse(httpreq.responseText);
    localStorage.setItem('posicion', j);
    //CLICK AGREGAR DIRECCION

    //MODAL
    document.getElementById("agregarDireccion").addEventListener("click", agregarDireccion)
    document.getElementById("redirecDestinatarios").addEventListener("click", redirecDestinatarios)

    function agregarDireccion() {
        window.location.href = 'direcciones.html'
    }


    $(document).ready(function () {
        //funcion activa modal y envia los datos ç

        $("#myModal").modal();
        document.getElementById("idCliente").value = oPersona[j].idCliente
        document.getElementById("nombreCliente").value = oPersona[j].nombreCliente
        document.getElementById("cifnif").value = oPersona[j].cifnif
        document.getElementById("direccion").value = oPersona[j].direccionFacturacion
        // ESTO SE PUEDE USAR MAS ADELANTEdocument.getElementById("direccion").addEventListener("change",modifica)
        document.getElementById("actualizar").addEventListener("click", actualizar)
        //DISPARA FUNCION PARA ACTUALIZAR DATOS ENVIA LOS DATOS ACTUALIZADO
        function actualizar() {
            console.log(document.getElementById("cifnif").value)
            console.log(document.getElementById("direccion").value)
            console.log(document.getElementById("idCliente").value)
            console.log(document.getElementById("nombreCliente").value)
            let cliente = {
                "cifnif": document.getElementById("cifnif").value,
                "direccionFacturacion": document.getElementById("direccion").value,
                "idCliente": document.getElementById("idCliente").value,
                "nombreCliente": document.getElementById("nombreCliente").value,
            }
            document.getElementById("cifnif").value
            httpreq.open('PUT', 'http://localhost:8080/ProyectoHiberest/webapi/clientes/update')
            httpreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
            // httpreq.onload =JSON.parse(httpreq.responseText)
            let jsonstring = JSON.stringify(cliente)

            httpreq.send(jsonstring)
            location.reload();
            alert("SE han actualizado los")
            //document.getElementById("direccion").addEventListener("change", modifica)
            //alert("se va ha modificado")
        }
    });
  

}




function eliminar(ctl, persona, i) {
    var j = i;
    var prueba = persona
    var prueba = JSON.parse(httpreq.responseText);
    //console.log(ctl);

    console.log(prueba[j]);
    httpreq.open('DELETE', 'http://localhost:8080/ProyectoHiberest/webapi/clientes/delete')
    httpreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    let jsonstring = JSON.stringify(prueba[j])
    httpreq.send(jsonstring)
    alert("se han eliminado los datos")
}


/*function inicializacion() {
    document.getElementById("crearCliente").addEventListener("click", crearCliente)
    //document.getElementById("idModificar").addEventListener("click", modificarCliente)
    //document.getElementById("visualizar").addEventListener("click", visualizarClientes)
    document.getElementById("redirecInicio").addEventListener("click", redirecInicio)

    httpreq.open('GET', 'http://localhost:8080/ProyectoHiberest/webapi/clientes/')
    //httpreq.onload = procesapeticion
    httpreq.send()
}*/
/*
function crearCliente() {
    let cliente = {
        "cifnif": document.getElementById("CIF").value,
        "destinatarioses": [],
        "direccionFacturacion": document.getElementById("Direccion").value,
        "envioses": [],
        "idCliente": 0,
        "nombreCliente": document.getElementById("NombreCliente").value,
    }

    httpreq.open('POST', 'http://localhost:8080/ProyectoHiberest/webapi/clientes')
    httpreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpreq.onload = procesacreacion
    let jsonstring = JSON.stringify(cliente)
    httpreq.send(jsonstring)
    alert("Se ha creado el cliente")
}
*/