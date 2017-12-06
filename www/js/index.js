
var app = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
  
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log(navigator.contacts);
        document.getElementById("createContact").addEventListener("click", createContact);
        document.getElementById("findContact").addEventListener("click", findContact);
        document.getElementById("deleteContact").addEventListener("click", deleteContact);
        
      
        
// -------------------------------------------------------------------------------------        
        function createContact() {
            alert("Crear contacto");
   var myContact = navigator.contacts.create({"displayName": "Test User"});
   myContact.save(contactSuccess, contactError);
    
   function contactSuccess() {
      alert("Contact is saved!");
   }
	
   function contactError(message) {
      alert('Failed because: ' + message);
   }
	
}
// -------------------------------------------------------------------------------------        
    
    function findContacts() {
        alert("Buscar contacto");
   var options = new ContactFindOptions();
   options.filter = "";
   options.multiple = true;
   fields = ["displayName"];
   navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);
    
   function contactfindSuccess(contacts) {
      for (var i = 0; i < contacts.length; i++) {
         alert("Display Name = " + contacts[i].displayName);
      }
   }
	
   function contactfindError(message) {
      alert('Failed because: ' + message);
   }
	
}    
        
   // -------------------------------------------------------------------------------------        
     
function deleteContact() {
    alert("Borrar contacto");
   var options = new ContactFindOptions();
   options.filter = "Test User";
   options.multiple = false;
   fields = ["displayName"];
   navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

   function contactfindSuccess(contacts) {
      var contact = contacts[0];
      contact.remove(contactRemoveSuccess, contactRemoveError);

      function contactRemoveSuccess(contact) {
         alert("Contact Deleted");
      }

      function contactRemoveError(message) {
         alert('Failed because: ' + message);
      }
   }

   function contactfindError(message) {
      alert('Failed because: ' + message);
   }
	
}    
        
    // -------------------------------------------------------------------------------------        
   
        
        ////esta parte de aqui estará monitoreando el estado de conexión si se encuentra conectado a una red el estado cambiara a online lo que provocara que entre en la función.
    document.addEventListener("online", onOnline, false);
    function onOnline() {
////esta variable es donde se guardara el valor que sera enviado por el tipo de conexión.                    
var networkState = navigator.connection.type;
/////lo comparara dentro del arreglo para declarar un texto mas amigable y entendible, estos testos entre comillas pueden modificarse a como uno guste cambiando su contenido
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
////con el alert mostrara en que tipo de conexion se ha establecido
        alert('se ha conectado a: ' + states[networkState]);
///y esta parte enviara el valor que obtubo al consultar la conexion a el span que declaramos en index.html esto para mostrar en pantalla que conexion es
        document.getElementById("connectionType").innerHTML = states[networkState];
    }
/////esta parte es para lanzar una alerta si el dispositivo se encuentra desconectado y entrara a la función onOffline
    document.addEventListener("offline", onOffline, false);

    function onOffline() {
///de igual manera el alert nos dira que no se encunetra conectado
        alert('te has desconectado');
////esta parte de aquí ara que cambie el valor que tenia span.
        document.getElementById("connectionType").innerHTML = "no te encuentras conectado a ninguna red";
    }
//esta declarara para que se reinicie el valor cuando no se encuentre conectado a nada y asi vuelva obtener otro nuevo al cambiar la conexion
    networkState = null;

 //-----------------------------------------------------------------------         
        
        
        
        
        
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
