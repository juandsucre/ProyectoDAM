window.onload = inicializacion
var httpreq = new XMLHttpRequest();
var httpreq2 = new XMLHttpRequest();
var httpreqd = new XMLHttpRequest();
function inicializacion() {
    // document.getElementById("crearCliente").addEventListener("click", crearCliente)
    // document.getElementById("idModificar").addEventListener("click", modificarCliente)

    //document.getElementById("clienteEnvia")
    //document.getElementById("enviar").addEventListener("click", enviar)
   
  
    document.getElementById("enviar").addEventListener("click", enviar)
    
    document.getElementById("generar").addEventListener("click", procesaqr)
    
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
            for(j= 0; j<envios.length; j++)
            {
                envios[j].idEnvio;
            }
            localStorage.setItem("tEnvios",j);
            var seleccion = "";
            seleccion+= '<select class="form-control" id="clienteEnviaar"  onchange="getDestinatarios()">'+'  <option value="1">Seleccione Cliente</option>'
          
            for (var j = 0; j < persona.length; j++){
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
    document.getElementById("generar").removeAttribute("disabled");
    let destinatarios = JSON.parse(httpreq.responseText);
    var e = document.getElementById("clienteRecibe");
    strUser = e.options[e.selectedIndex].value;
    document.getElementById("nombre").value = destinatarios[strUser].nombreDestinatario;
    document.getElementById("cifnif").value = destinatarios[strUser].dninif;
    document.getElementById("codPostal").value = destinatarios[strUser].codigoPostal;
    document.getElementById("direccion").value = destinatarios[strUser].direccionCompleta;
}

function enviar()
{
    let tal = document.getElementById("clienteEnviaar").value
    let persona = JSON.parse(localStorage.getItem('persona'));
    console.log(persona[tal].cifnif)
   let estadoenvio = document.getElementsByName("gridRadios").value;
    let envio = {
        "clientes": {
            "cifnif": persona[tal].cifnif,
            "direccionFacturacion": persona[tal].direccionFacturacion,
            "idCliente": persona[tal].idCliente,
            "nombreCliente": persona[tal].nombreCliente
        },
        "codigoPostal": document.getElementById("codPostal").value,
        "direccionCompleta":  document.getElementById("direccion").value,
        "dninif":  document.getElementById("cifnif").value,
        "estadosenvio": {
            "descripcionEstado": "",
            "idEstadoEnvio": "EN"
        },
        "idEnvio": 0,
        "nombreDestinatario": document.getElementById("nombre").value,
        "numIntentosEntrega": 0
    }
    httpreq.open('POST', 'http://localhost:8080/ProyectoHiberest/webapi/envios')
    httpreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpreq.onload = procesacreacion
    let jsonstring = JSON.stringify(envio)
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


function procesaqr(){
    
  //  var miCodigoQR = new QRCode("codigoQR");
var Envios = localStorage.getItem("tEnvios");
var otra = parseInt(Envios)+1;
var otraa = otra.toString();
document.getElementById("body").innerHTML=""
document.getElementById("body").innerHTML='<div id="codigoQR"></div> '
 
var miCodigoQR = new QRCode("codigoQR");
 miCodigoQR.makeCode(otraa);
}

