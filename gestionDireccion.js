window.onload = inicializacion


var httpreq = new XMLHttpRequest();
function inicializacion() {
   // document.getElementById("crearCliente").addEventListener("click", crearCliente)
   // document.getElementById("idModificar").addEventListener("click", modificarCliente)

    document.getElementById("visualizar").addEventListener("click", visualizarClientes)
    document.getElementById("redirecDestinatarios").addEventListener("click", redirecDestinatarios)
   // document.getElementById("redirecRegistro").addEventListener("click", redirecRegistro)
    
   // console.log(persona);
    
    httpreq.open('GET', 'http://localhost:8080/ProyectoHiberest/webapi/destinatarios/get')
    //httpreq.onload = procesapeticion
    httpreq.onload = visualizarClientes
    httpreq.send()
}

var persona = JSON.parse(localStorage.getItem('persona'));
var posicion = localStorage.getItem('posicion') 

function visualizarClientes() {
    var posicionsel
    posicionsel = posicion
    // alert("POSICION INDEX"+posicion)
    //var name = document.getElementById('id').value;
    //var httpreq = new XMLHttpRequest();
    //  document.getElementById("idCliente").value = persona[posicion].nombreCliente

    if (httpreq.readyState == 4) {
        if (httpreq.status == 200) {
            var destinatarios = JSON.parse(httpreq.responseText);
            console.log(destinatarios[1].clientes.idCliente)
            $('#select').append('<option value="' + posicionsel + '">' + persona[posicionsel].nombreCliente + '</option>')
            for (var j = 0; j < persona.length; j++) {
                //'<option id="'+i+'">'+persona[i].nombreCliente+'</option>'
                $('#select').append('<option value="' + j + '">' + persona[j].nombreCliente + '</option>')
            }
            var e = document.getElementById("select");
            var strUser = e.options[e.selectedIndex].value;
            document.getElementById("CIFNIF").value = persona[strUser].cifnif
            document.getElementById("direccion").value = persona[strUser].direccionFacturacion
            localStorage.setItem("opcions", strUser);
            //alert(strUser)
            // alert("posicion"+posicionsel)

            var bool = 0
            for (var i = 0; i < destinatarios.length; i++){

                //    $('#select').append('<option value="'+i+'">'+persona[i].nombreCliente+'</option>')
                //$('#select').append('<option value="'+i+'">'+persona[i].nombreCliente+'</option>')
                if (destinatarios[i].clientes.idCliente === persona[posicionsel].idCliente) {
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
        }
    }
    e.addEventListener("change",actualiza(strUser))
}

function actualiza(pos)
{
  var posicionsel = localStorage.getItem('opcions')
  
    console.log(pos)
    posicion = posicionsel
    localStorage.setItem('posicion', posicion)
}

function redirecDestinatarios(){
    location.href = 'destinatarios.html'
}
