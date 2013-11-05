/**
 * Created with JetBrains RubyMine.
 * User: adi
 * Date: 15/10/13
 * Time: 12:59
 * To change this template use File | Settings | File Templates.
 */

//Mostrar Lightbox del login
function showLightboxLogin() {
    document.getElementById('overLogin').style.display='block';
    document.getElementById('fadeLogin').style.display='block';
}

//Mostrar Lightbox del registro
function showLightboxRegistro() {
    document.getElementById('overRegistro').style.display='block';
    document.getElementById('fadeRegistro').style.display='block';
}

//Mostrar Lightbox de crear una nueva peticion
function showLightboxPeticion() {
    document.getElementById('overPeticion').style.display='block';
    document.getElementById('fadePeticion').style.display='block';
}

//Ocultar Lightbox del login
function hideLightboxLogin() {
    document.getElementById('overLogin').style.display='none';
    document.getElementById('fadeLogin').style.display='none';
}

//Ocultar Lightbox del registro
function hideLightboxRegistro() {
    document.getElementById('overRegistro').style.display='none';
    document.getElementById('fadeRegistro').style.display='none';
}

//Ocultar Lightbox de crear una nueva peticion
function hideLightboxPeticion() {
    document.getElementById('overPeticion').style.display='none';
    document.getElementById('fadePeticion').style.display='none';
}

//Comprueba si los campos del login no son vacios
function notNull(){
    if($('#login').val()!='' && $('#contraseñalogin').val()!=''){
        return true;
    }
    else{
        return false;
    }
}

//Funcion que hemos creado para mostrar nuestras propias alertas
//Tendremos que pasarle el mensaje que queremos y ademas la clase de boostrap que queremos aplicar
function alerta(texto, tipo){

    var mensaje = $('#mensaje');

    mensaje.html(texto);
    mensaje.removeClass();
    mensaje.addClass("alert");
    mensaje.addClass("alert-" + tipo);
    mensaje.show();
    mensaje.fadeOut(3000);
}

//Funcion que activamos cuando el usuario se loguee para mostrarle su nombre, boton logout, crear nueva peticion y ocultar los demas botones
//Le pasamos el nombre para mostrarlo
function mostrarUsuario(nombre){

    var botonRegistro =$('#botonRegistro');
    var botonLogin =$('#botonLogin');
    var nombreUsuario = $('#nombreUsuario');
    var botonLogout =$('#botonLogout');
    var botonPeticion =$('#botonPeticion');
    var datosPersonales =$('#datosPersonales');

    botonRegistro.hide();
    botonLogin.hide();
    nombreUsuario.html(nombre);
    botonPeticion.show();
    botonLogout.show();
    datosPersonales.hide();
}

//Funcion que llama a mostrarUsuario con el localStorage en caso de que haya
function datosUsuario(login){
    $.ajax({
        url: 'api/usuarios/'+login,
        method: 'GET'
    })
        .done(function(data, textStatus, jqXHR) {
            mostrarUsuario(data.nombre+" "+data.apellidos);
        })
}

//Funcion para hacer logout
function logout(){
    localStorage.removeItem("login");
    $.get("logout");

}

//Peticion AJAX para que el usuario se loguee (En JQuery)
function peticionAJAX(){

    var login=$('#login').val();
    var contraseñalogin=$("#contraseñalogin");

    if(notNull()){
        var formLogin=$('#formLogin');

        $.ajax( {
            url:'login',
            method: 'POST',
            data: formLogin.serialize()
        })
            .done(function(data, textStatus, jqXHR) {
                alerta("Bienvenido a la Batcueva", "success");
                localStorage.login = login;
                datosUsuario(login);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                 jqXHR.statusCode(
                     {
                         400: function() {
                             alerta("Los parametros no son validos", "danger");
                         },
                         403: function() {
                             alerta("Los credenciales no son correctos", "danger");
                         }
                     }
                 );
            });
    }
    else{
        alerta("Alguno de los campos esta vacio", "info");
    }
}

//Comprobar que los campos del registro no sean nulos
function notNull2(){
    if($('#loginRegistro').val()!='' && $('#contraseñaRegistro').val()!='' && $('#rContraseñaRegistro').val()!=''&& $('#nombreRegistro').val()!='' && $('#apellidosRegistro').val()!=''){
        return true;
    }
    else{
        return false;
    }
}

//Funcion para comprobar que las contraseñas son iguales
function contraseñaIgual(){
    if($('#contraseñaRegistro').val()==$('#rContraseñaRegistro').val()){
        return true;
    }
    else{
        return false;
    }
}

//Funcion para comprobar si el usuario esta registrado o no
function comprobarRegistro(){

    var login= $('#loginRegistro').val();

    $.ajax({
        url: 'api/loginDisponible/'+login,
        method: 'GET'
    })
        .done(function(data, textStatus, jqXHR) {
            if(data=='OK'){
                $('#loginCogido').hide();
                $('#loginCorrecto').show();
            }
            else{
                $('#loginCorrecto').hide();
                $('#loginCogido').show();
            }
        })
}

//Peticion AJAX para que el usuario se registre (En JQuery) convirtiendo la cadena a JSON
function peticionAJAX2(){

    if(notNull2()){
        if(contraseñaIgual()){
            var json={
                login:          $('#loginRegistro').val(),
                password:       $('#contraseñaRegistro').val(),
                nombre:         $('#nombreRegistro').val(),
                apellidos:      $('#apellidosRegistro').val()
            }
            var jsonstgf = JSON.stringify(json);
            $.ajax({
                url:'api/usuarios',
                method: 'POST',
                contentType: 'application/json',
                data:jsonstgf
            })
                .done(function(data, textStatus, jqXHR) {
                    alerta("Registrado en la Batcueva correctamente", "success");
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    jqXHR.statusCode(
                        {
                            400: function() {
                                alerta("Los datos son incorrectos", "danger");
                            }
                        }
                    )
                });
        }
        else{
            alerta("Las contraseñas no coinciden", "info");
        }
    }
    else{
        alerta("Alguno de los campos esta vacio", "info");
    }
}

//Peticion para crear la peticion (En JQuery) convirtiendo la cadena en JSON
function crearPeticion(){

    var json={
        titulo:             $('#tituloPeticion').val(),
        fin:                $('#fechaPeticion').val(),
        firmasObjetivo:     $('#firmasPeticion').val(),
        texto:              $('#textoPeticion').val()
    }
    var jsonstgf = JSON.stringify(json);
    $.ajax({
        url:'api/peticiones',
        method: 'POST',
        contentType: 'application/json',
        data: jsonstgf
    })
        .done(function(data, textStatus, jqXHR) {
            alerta("Creada peticion correctamente", "success");
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            jqXHR.statusCode(
                {
                    400: function() {
                        alerta("Faltan campos o no son validos", "danger");
                    },
                    403: function() {
                        alerta("No estamos autentificados", "danger");
                    },
                    500: function() {
                        alerta("Error del servidor (Industries Wayne esta en ello)", "danger");
                    }
                }
            )
        });
}

//Peticion para crear una firma (En JQuery) convirtiendo la cadena en JSON
function crearFirma(){

    var json={
        publica:    $('#publicaFirma').prop('checked'),
        comentario: $('#comentarioFirma').val()
    }
    if(!localStorage.login){
        json.nombre = $('#nombreFirma').val();
        json.apellidos = $('#apellidosFirma').val();
        json.email = $('#emailFirma').val();
    }
    var jsonstgf = JSON.stringify(json);
    $.ajax({
        url:'api/peticiones/'+id_peticion+'/firmas/',
        method: 'POST',
        contentType: 'application/json',
        data: jsonstgf
    })
        .done(function(data, textStatus, jqXHR) {
            alerta("Firma creada correctamente", "success");
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            jqXHR.statusCode(
                {
                    400: function() {
                        alerta("Faltan campos o no son validos", "danger");
                    },
                    500: function() {
                        alerta("Error del servidor (Industries Wayne esta en ello)", "danger");
                    }
                }
            )
        });
}

//Siempre comprobamos si hay usuario logueado en caso de que si llamamos a datosUsuario
if (localStorage.login) {
    datosUsuario(localStorage.login);
}