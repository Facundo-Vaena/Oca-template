const soap = require("soap");

//Lista de metodos:
//* obtener tarifa envio,
//* crear envio,
//* obtener etiquetas,
//* historial tracking envio -> trae numero de envio, descripcion motivo, descripcion estado, sucursal y fecha,
//* estado actual del envio -> trae operativa, orden de retiro, fecha de retiro, remito, destinatarios, email, numero de envio, cantidad de paquetes, peso total, peso aforado total, volument total, precio envio, seguro, fecha imposicion, sucursal actual, CI destino, fecha estado, estado, id estado, motivo, alto, ancho, largo
//* listado de envios segun cuit, fechaDesde y fechaHasta (no funciona bien con fechas muy cercanas) -> trae nro producto y nro envio
//* anular orden de envio

const baseUrl =
  "http://webservice.oca.com.ar/OEP_Tracking_TEST/Oep_Track.asmx?wsdl";
const baseUrlEPack = "http://webservice.oca.com.ar/ePak_Tracking_TEST?wsdl";

const parametrosTarifaEnvio = {
  Cuit: "30-53625919-4",
  Operativa: 78254,
  PesoTotal: 0.5,
  VolumenTotal: 0.5,
  CodigoPostalOrigen: 1431,
  CodigoPostalDestino: 1422,
  CantidadPaquetes: 2,
  ValorDeclarado: 150,
};

const xml_Datos = `<![CDATA[
    <ROWS>
          <cabecera ver="2.0" nrocuenta="111757/001"/>
          <origenes>
             <origen calle="La Rioja" nro="300" piso="" depto="" cp="1215" localidad="CAPITAL FEDERAL" provincia="CAPITAL FEDERAL" contacto="" email="test@oca.com.ar" solicitante="" observaciones="" centrocosto="0" idfranjahoraria="1" idcentroimposicionorigen="0" fecha="20151015">
                <envios>
                   <envio idoperativa="64665" nroremito="12345" cantidadremitos="1">
                      <destinatario apellido="Fernandez" nombre="Martin" calle="BALCARCE" nro="50" piso="" depto="" localidad="CAPITAL FEDERAL" provincia="CAPITAL FEDERAL" cp="1214" telefono="49569622" email="test@oca.com.ar" idci="0" celular="1121877788" observaciones="Prueba"/>
                      <paquetes>
                         <paquete alto="10" ancho="10" largo="10" peso="1" valor="10" cant="1"/>
                      </paquetes>
                   </envio>
                </envios>
             </origen>
          </origenes>
       </ROWS>
]]>`;


const parametrosIngresoOr = {
  usr: "test@oca.com.ar",
  psw: "123456",
  xml_Datos,
  ConfirmarRetiro: 1, //1/0
  DiasHastaRetiro: 12,
  idFranjaHoraria: 1,
};

const parametrosEtiquetas = {
  idOrdenRetiro: 20572786,
};

const parametrosTrackingPieza = {
  // NroDocumentoCliente: 4,
  // Cuit: "30-53625919-4",
  Pieza: "1217400000000048621",
};

const parametrosEstadoActual = {
  numeroEnvio: "1217400000000048621",

};

const parametrosListEnvios = {
  CUIT: "30-53625919-4",
  FechaDesde: "08-05-2022",
  FechaHasta: "09-06-2022",
};

const parametrosAnularOrden = {
  usr: "test@oca.com.ar",
  psw: "123456",
  IdOrdenRetiro: 20572794, //VA CON MAYUSCULA
};

const mainOcaMethods = async () => {
  const client = await soap.createClientAsync(baseUrlEPack); //urlEPack
  // console.log(client); //Obtener todos los metodos disponibles

  // !! Es necesario encerrar la ejecucion de los metodos dentro de una promesa awaiteada. Y en vez de return response, usar resolve(response).
  //EJEMPLO:
   // const envioEstadoActual = await new Promise((res) => {
  //   const info = client.Oep_Tracking.Oep_TrackingSoap.GetEnvioEstadoActual(parametrosEstadoActual, function (error: any, data: any, response: any, arg4: any, request: any, arg6: any) {
  //       console.log(arguments);
  //       res(response);
  //     });
  //     return info;
  // });
  //--------------------Historial completo del envio----------------------------
  // const historialCompleto = await client.Oep_Tracking.Oep_TrackingSoap.Tracking_Pieza(parametrosTrackingPieza, function(error: any, data: any, response: any, arg4: any, request: any, arg6: any) {
  //   return response;
  // })
  //------------------ -------Tarifa del envio-----------------------------------
  // const tarifaEnvio = await client.Oep_Tracking.Oep_TrackingSoap.Tarifar_Envio_Corporativo(parametrosTarifaEnvio, function (error: any, data: any, response: any, arg4: any, request: any, arg6: any)  {
  //   return response;
  // });
  // const tarifaEnvio = await new Promise((res: any) => {
  //   const info = client.Oep_Tracking.Oep_TrackingSoap.Tarifar_Envio_Corporativo(parametrosTarifaEnvio, (error: any, data: any, response: any, arg4: any, request: any, arg6: any) => {
  //     res(response);
  //   });
  //   return info;
  // });
  // return tarifaEnvio;
  //--------------------- Creacion de multi envio-------------------------------------
  // const creacionEnvio = await client.Oep_Tracking.Oep_TrackingSoap.IngresoORMultiplesRetiros(parametrosIngresoOr, function (error: any, data: any, response: any, arg4: any, request: any, arg6: any) {
  //     return response;
  // });  
  //--------------------------Obtener etiquetas en HTML-------------------------------
  // const obtenerEtiquetas =
  //   await client.Oep_Tracking.Oep_TrackingSoap.GetHtmlDeEtiquetasPorOrdenOrNumeroEnvio(
  //     parametrosEtiquetas,
  //     function (
  //       error: any,
  //       data: any,
  //       response: any,
  //       arg4: any,
  //       request: any,
  //       arg6: any
  //     ) {
  //       return response;
  //     }
  //   );
  //-----------------Estado actual del envio-----------------------------------------
  // const envioEstadoActual = await client.Oep_Tracking.Oep_TrackingSoap.GetEnvioEstadoActual(parametrosEstadoActual, function () {
  //   console.log(arguments);
  // });
  // const envioEstadoActual = await new Promise((res) => {
  //   const info = client.Oep_Tracking.Oep_TrackingSoap.GetEnvioEstadoActual(parametrosEstadoActual, function (error: any, data: any, response: any, arg4: any, request: any, arg6: any) {
  //       console.log(arguments);
  //       res(response);
  //     });
  //     return info;
  // });

  // return envioEstadoActual
  //---------------------Listado envios-----------------------------------------------
  // const listadoEnvios = await client.Oep_Tracking.Oep_TrackingSoap.List_Envios(parametrosListEnvios, function(error: any, data: any, response: any, arg4: any, request: any, arg6: any) {
  //   return response
  // })
  //----------------------Anular envio-----------------------------------------------
  // const anularOrden = await client.Oep_Tracking.Oep_TrackingSoap.AnularOrdenGenerada(parametrosAnularOrden, function (error: any, data: any, response: any, arg4: any, request: any, arg6: any) {
  //   return response;
  // });
};

export default mainOcaMethods;
