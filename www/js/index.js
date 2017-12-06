
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
        document.getElementById("findContact").addEventListener("click", findContacts);
        document.getElementById("deleteContact").addEventListener("click", deleteContact);
        
        document.getElementById("networkInfo").addEventListener("click", networkInfo);
        document.addEventListener("offline", onOffline, false);
        document.addEventListener("online", onOnline, false);
        
        document.getElementById("getPosition").addEventListener("click", getPosition);
        document.getElementById("watchPosition").addEventListener("click", watchPosition);	
        
        document.getElementById("createFile").addEventListener("click", createFile);
        document.getElementById("writeFile").addEventListener("click", writeFile);
        document.getElementById("readFile").addEventListener("click", readFile);
        document.getElementById("removeFile").addEventListener("click", removeFile);
        
      
        
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
   
        function networkInfo() {
   var networkState = navigator.connection.type;
   var states = {};
   states[Connection.UNKNOWN]  = 'Unknown connection';
   states[Connection.ETHERNET] = 'Ethernet connection';
   states[Connection.WIFI]     = 'WiFi connection';
   states[Connection.CELL_2G]  = 'Cell 2G connection';
   states[Connection.CELL_3G]  = 'Cell 3G connection';
   states[Connection.CELL_4G]  = 'Cell 4G connection';
   states[Connection.CELL]     = 'Cell generic connection';
   states[Connection.NONE]     = 'No network connection';
   alert('Connection type: ' + states[networkState]);
}

function onOffline() {
   alert('You are now offline!');
}

function onOnline() {
   alert('You are now online!');
}
  
 //-----------------------------------------------------------------------         
        
    function getPosition() {
   var options = {
      enableHighAccuracy: true,
      maximumAge: 3600000
   }
   var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

   function onSuccess(position) {
      alert('Latitude: '          + position.coords.latitude          + '\n' +
         'Longitude: '         + position.coords.longitude         + '\n' +
         'Altitude: '          + position.coords.altitude          + '\n' +
         'Accuracy: '          + position.coords.accuracy          + '\n' +
         'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
         'Heading: '           + position.coords.heading           + '\n' +
         'Speed: '             + position.coords.speed             + '\n' +
         'Timestamp: '         + position.timestamp                + '\n');
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
   }
}

function watchPosition() {
   var options = {
      maximumAge: 3600000,
      timeout: 3000,
      enableHighAccuracy: true,
   }
   var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

   function onSuccess(position) {
      alert('Latitude: '          + position.coords.latitude          + '\n' +
         'Longitude: '         + position.coords.longitude         + '\n' +
         'Altitude: '          + position.coords.altitude          + '\n' +
         'Accuracy: '          + position.coords.accuracy          + '\n' +
         'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
         'Heading: '           + position.coords.heading           + '\n' +
         'Speed: '             + position.coords.speed             + '\n' +
         'Timestamp: '         + position.timestamp                + '\n');
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
   }
}    
        
//-----------------------------------------------------------------------           
    function createFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {
         alert('File creation successfull!')
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
	
}
//------------------------------------------------------------------------
    function writeFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {create: true}, function(fileEntry) {

         fileEntry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
               alert('Write completed.');
            };

            fileWriter.onerror = function(e) {
               alert('Write failed: ' + e.toString());
            };

            var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
            fileWriter.write(blob);
         }, errorCallback);
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
}    
//------------------------------------------------------------------------
   function readFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {}, function(fileEntry) {

         fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onloadend = function(e) {
               var txtArea = document.getElementById('textarea');
               txtArea.value = this.result;
            };
            reader.readAsText(file);
         }, errorCallback);
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
} 
//------------------------------------------------------------------------
     function removeFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {create: false}, function(fileEntry) {

         fileEntry.remove(function() {
            alert('File removed.');
         }, errorCallback);
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
}	   
//------------------------------------------------------------------------        
      
        
        
        
        
        
        
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
