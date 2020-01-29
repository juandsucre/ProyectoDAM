window.onload = inicializacion


var httpreq = new XMLHttpRequest();
function inicializacion() {
   // document.getElementById("crearCliente").addEventListener("click", crearCliente)
   // document.getElementById("idModificar").addEventListener("click", modificarCliente)

    document.getElementById("visualizar").addEventListener("click", visualizarClientes)
   // document.getElementById("redirecRegistro").addEventListener("click", redirecRegistro)
    
   // console.log(persona);
    
    httpreq.open('GET', 'http://localhost:8080/ProyectoHiberest/webapi/destinatarios')
    //httpreq.onload = procesapeticion
    httpreq.onload = visualizarClientes
    httpreq.send()
}

var persona = JSON.parse(localStorage.getItem('persona'));
var posicion = localStorage.getItem('posicion') 
function visualizarClientes() {

    console.log(persona[posicion]);
    console.log("posicion actual" +posicion)
    var posicionsel
     posicionsel = posicion
   // alert("POSICION INDEX"+posicion)

    //var name = document.getElementById('id').value;
    //var httpreq = new XMLHttpRequest();
    //  document.getElementById("idCliente").value = persona[posicion].nombreCliente

    if (httpreq.readyState == 4) {
        if (httpreq.status == 200) {
            var person = JSON.parse(httpreq.responseText);
            console.log(person[1].clientes.idCliente)
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
            alert(strUser)
           // alert("posicion"+posicionsel)
           
            
                for (var i = 0; i < 100; i++) {

                    //    $('#select').append('<option value="'+i+'">'+persona[i].nombreCliente+'</option>')
                    //$('#select').append('<option value="'+i+'">'+persona[i].nombreCliente+'</option>')
                    if (person[i].clientes.idCliente === persona[posicionsel].idCliente) {
                        
                        $("#tabla").append(

                            '<tr>' +
                            '<td>' + person[i].idDestinatario + '</td>' +
                            '<td>' + person[i].nombreDestinatario + '</td>' +
                            '<td>' + person[i].dninif + '</td>' +
                            '<td>' + person[i].codigoPostal + '</td>' +
                            '<td>' + person[i].direccionCompleta + '</td>'
                            + '<td colspan="2">' +
                            '<i class="far fa-edit" id="myBtn"></i>'
                            + '<i class="far fa-trash-alt"></i>' + '</td>'
                            + '</tr>'
                        );

                    }

                    //$('#select').append('<option value="'+i+'">'+persona[i].nombreCliente+'</option>')
                }
                //document.getElementById('about').value = person.about;
            
        }
    }
    e.addEventListener("change",actualiza(strUser))

    //httpreq.open('GET', 'http://localhost:8080/ProyectoHiberest/webapi/clientes/2')
    //httpreq.send();
}

function actualiza(pos)
{

  //  $("#tbody").remove()
  var posicionsel = localStorage.getItem('opcions')
  
    console.log(pos)
    //localStorage.clear()
    posicion = posicionsel
    localStorage.setItem('posicion', posicion)
    
    //  visualizarClientes();
    //location.reload();
}