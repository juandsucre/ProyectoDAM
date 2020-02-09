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
    httpreq2.open('GET', 'http://localhost:8080/ProyectoHiberest/webapi/clientes/get/todos')
    httpreq2.onload = procesacreacion
    httpreq.onload = rellenarClientes
    httpreq.send();
    httpreq2.send();
}



function rellenarClientes(){
    if (httpreq.readyState == 4) {
        if (httpreq.status == 200) {
            var envios = JSON.parse(httpreq.responseText);
            var persona = JSON.parse(httpreq2.responseText);
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
    httpreqd.onload= rellenarDestinos
    httpreqd.send();

}

function rellenarDestinos() {
    let tal = document.getElementById("clienteEnviaar").value
    console.log("la persona sele" + (tal))
    var persona = JSON.parse(httpreq2.responseText);
    let destinatarios = JSON.parse(httpreqd.responseText);
    let finald= destinatarios.length
    finald=finald-1
    console.log(destinatarios[finald].clientes.idCliente)
    if (httpreq.readyState == 4) {
        if (httpreq.status == 200) {
            var selec = "";
            selec+= '<select class="form-control" id="clienteRecibee">'+'  <option value="1">Seleccione Cliente</option>'
            for (var i = 0; i < finald; i++){
               // console.log(destinatarios[i].clientes.idCliente)
                    if(destinatarios[i].clientes.idCliente === persona[tal].idCliente){
                       
                        //'<option id="'+i+'">'+destinatarios[i].nombreCliente+'</option>'
                        selec+='<option id="opc" value="' + i + '">' + destinatarios[i].nombreDestinatario + '</option>'
                    }
                    
              
            }
            selec+= '</select>'
            document.getElementById("clienteRecibe").innerHTML= selec
            document.getElementById("clienteRecibee").addEventListener("change",rellenarCampos)
        }

    }
   
    
    
}
function rellenarCampos(){
    var e = document.getElementById("clienteRecibee").value;
    document.getElementById("generar").removeAttribute("disabled");
    let destinatarios = JSON.parse(httpreqd.responseText);
    //strUser = e.options[e.selectedIndex].value;
    document.getElementById("nombre").value = destinatarios[e].nombreDestinatario;
    document.getElementById("cifnif").value = destinatarios[e].dninif;
    document.getElementById("codPostal").value = destinatarios[e].codigoPostal;
    document.getElementById("direccion").value = destinatarios[e].direccionCompleta;
}

function enviar()
{
    let tal = document.getElementById("clienteEnviaar").value
    let persona = JSON.parse(httpreq2.responseText);
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

