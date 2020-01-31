window.onload = inicializacion
var httpreq = new XMLHttpRequest();
var httpreqd = new XMLHttpRequest();
function inicializacion() {
    // document.getElementById("crearCliente").addEventListener("click", crearCliente)
    // document.getElementById("idModificar").addEventListener("click", modificarCliente)

    //document.getElementById("clienteEnvia")
    //document.getElementById("redirecRegistro").addEventListener("click", redirecRegistro)
   
  


    httpreq.open('GET', 'http://localhost:8080/ProyectoHiberest/webapi/envios/get')
    //httpreq.onload = procesapeticion
    httpreq.onload = rellenarClientes
    httpreq.send();
}
var persona = JSON.parse(localStorage.getItem('persona'));


function rellenarClientes(){
    if (httpreq.readyState == 4) {
        if (httpreq.status == 200) {
            var envios = JSON.parse(httpreq.responseText);
            console.log(envios[1])
            var seleccion = "";
            seleccion+= '<select class="form-control" id="clienteEnviaar"  onchange="getDestinatarios()">'+'  <option value="1">Seleccione Cliente</option>'
          
            for (var j = 0; j < persona.length; j++) {
                //'<option id="'+i+'">'+envios[i].nombreCliente+'</option>'
                seleccion+='<option value="' + j + '">' + persona[j].nombreCliente + '</option>'
               
            }
            seleccion+= '</select>'
            document.getElementById("clienteEnvia").innerHTML= seleccion
            //document.getElementById('clienteEnvia').addEventListener("change", rellenarDestinos(strUser));
           // document.getElementById('clienteEnvia').addEventListener("change", rellenarDestinos);
       
        }
      //  console.log(envios[5].clientes.nombreCliente)
    }
}
function getDestinatarios(){
    $('.opc').remove();
    document.getElementById("nombre").value = "";
    document.getElementById("cifnif").value = "";
    document.getElementById("codPostal").value ="";
    document.getElementById("direccion").value = "";
    httpreqd.open('GET', 'http://localhost:8080/ProyectoHiberest/webapi/destinatarios/get')
    httpreqd.onload= rellenarDestinos();
    httpreqd.send();

}

function rellenarDestinos() {
    let tal = document.getElementById("clienteEnviaar").value
    console.log(tal)
    var persona = JSON.parse(localStorage.getItem('persona'));
    if (httpreq.readyState == 4) {
        if (httpreq.status == 200) {
            let destinatarios = JSON.parse(httpreq.responseText);
            console.log(persona[tal].idCliente)
            console.log(destinatarios[1].clientes.idCliente)
            for (var i = 0; i < 200; i++){

                    if(destinatarios[i].clientes.idCliente === persona[tal].idCliente){
                        //'<option id="'+i+'">'+destinatarios[i].nombreCliente+'</option>'
                        $('#clienteRecibe').append('<option class="opc" value="' + i + '">' + destinatarios[i].nombreDestinatario + '</option>')
                       document.getElementById("clienteRecibe").addEventListener("change",rellenarCampos);
                    }
              
            }
           
        }

    }
}
function rellenarCampos(){
    let destinatarios = JSON.parse(httpreq.responseText);
    var e = document.getElementById("clienteRecibe");
    strUser = e.options[e.selectedIndex].value;
    document.getElementById("nombre").value = destinatarios[strUser].nombreDestinatario;
    document.getElementById("cifnif").value = destinatarios[strUser].dninif;
    document.getElementById("codPostal").value = destinatarios[strUser].codigoPostal;
    document.getElementById("direccion").value = destinatarios[strUser].direccionCompleta;
}