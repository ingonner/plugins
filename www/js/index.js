
document.getElementById("audioCapture").addEventListener("click", audioCapture);
document.getElementById("imageCapture").addEventListener("click", imageCapture);
document.getElementById("videoCapture").addEventListener("click", videoCapture);

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        

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
    
    }
 
};


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



 function cameraTakePicture() { 
   navigator.camera.getPicture(onSuccess, onFail, {  
      quality: 50, 
      destinationType: Camera.DestinationType.DATA_URL 
   });  
   
   function onSuccess(imageData) { 
      var image = document.getElementById('myImage'); 
      image.src = "data:image/jpeg;base64," + imageData; 
   }  
   
   function onFail(message) { 
      alert('Failed because: ' + message); 
   } 
}
        
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


function downloadFile() {
            var fileTransfer = new FileTransfer();
            var uri = encodeURI("http://s14.postimg.org/i8qvaxyup/bitcoin1.jpg");
            var fileURL = "///storage/emulated/0/Downloads/myFile";

            fileTransfer.download(
                uri, fileURL,
                function(entry) {
                    console.log("download complete: " + entry.toURL());
                    alert("completo");
                },
                function(error) {
                    console.log("download error source " + error.source);
                    console.log("download error target " + error.target);
                    console.log("download error code" + error.code);
                    alert("error");
                },
                false, {
                    headers: {
                        "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                    }
                }
            );
        }

        function uploadFile() {
            var fileURL = "///storage/emulated/0/Documents/myFile"
            var uri = encodeURI("http://posttestserver.com/post.php");
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
            options.mimeType = "text/plain";
            var headers = {
                'headerParam': 'headerValue'
            };
            options.headers = headers;
            var ft = new FileTransfer();
            ft.upload(fileURL, uri, onSuccess, onError, options);

            function onSuccess(r) {
                console.log("Code = " + r.responseCode);
                console.log("Response = " + r.response);
                console.log("Sent = " + r.bytesSent);
                alert(r.response);
            }
            function onError(error) {
                alert("An error has occurred: Code = " + error.code);
                console.log("upload error source " + error.source);
                console.log("upload error target " + error.target);
                alert("error");
            }
        }  


function audioCapture() {
 var options = {
 limit: 1,
 duration: 10
 };
 navigator.device.capture.captureAudio(onSuccess, onError, options);
 function onSuccess(mediaFiles) {
 var i, path, len;
 for (i = 0, len = mediaFiles.length; i < len; i += 1) {
 path = mediaFiles[i].fullPath;
 console.log(mediaFiles);
 }
 }
 function onError(error) {
 navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
 }
}


function imageCapture() {
 var options = {
 limit: 1
 };
 navigator.device.capture.captureImage(onSuccess, onError, options);
 function onSuccess(mediaFiles) {
 var i, path, len;
 for (i = 0, len = mediaFiles.length; i < len; i += 1) {
 path = mediaFiles[i].fullPath;
 console.log(mediaFiles);
 }
 }
 function onError(error) {
 navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
 }
}

function videoCapture() {
 var options = {
 limit: 1,
 duration: 10
 };
 navigator.device.capture.captureVideo(onSuccess, onError, options);
 function onSuccess(mediaFiles) {
 var i, path, len;
 for (i = 0, len = mediaFiles.length; i < len; i += 1) {
 path = mediaFiles[i].fullPath;
 console.log(mediaFiles);
 }
 }
 function onError(error) {
 navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
 }
}