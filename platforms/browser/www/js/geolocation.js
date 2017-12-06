   document.addEventListener("deviceready",onDeviceReady,false);
            function onDeviceReady(){
                console.log("listo");   
            }

            function getDatos(){
                navigator.geolocation.getCurrentPosition(onSuccess,onError,{maximunAge: 300000,timeout:10000, enableHighAccuracy:true});
            }
        
            function onSuccess(position){
                var latitud=document.getElementById("lat");
                var longitud=document.getElementById("lon");
                latitud.innerHTML=""+position.coords.latitude;
                longitud.innerHTML=""+position.coords.longitude;
                //creamos un punto de coordenafas geograficas con la latitud y longitud obtenidas
                var coords= new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                //creamos algunas opciones center: el centro incial del mapa 
                //zoom el nivel de zoom inicial
                //el tipo de mapa ROADMAP,SATELLITE,HYBRID y TERRAIN si no coloca ningunop por defecto es ROADMAP

                var opciones = {center: coords, zoom: 15, mapTypeId: google.maps.MapTypeId.ROADMAP};
                //Ahora instaciamos un mapa y le indicamos el div en el que se colocara y las opciones

                var mapa = new google.maps.Map(document.getElementById("map"),opciones);

                //ahora agregamos un marcador para las coordenadas dadas

                var marcador= new google.maps.Marker({
                    position:coords,//es un objeto LatLng que indica la posicion en la que se creara el marcador
                    map: mapa,
                    title: ":D",
                    animation: google.maps. Animation.DROP//animacion  para el marcador
                });

            }

            function onError(err){ 
                console.log("codigo de err:"+err.code+"  msj="+err.message);
            }

            

        </script>
