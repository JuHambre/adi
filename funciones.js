/**
 * Created with JetBrains RubyMine.
 * User: adi
 * Date: 15/10/13
 * Time: 12:59
 * To change this template use File | Settings | File Templates.
 */

function showLightboxLogin() {
    document.getElementById('overLogin').style.display='block';
    document.getElementById('fadeLogin').style.display='block';
}

function showLightboxRegistro() {
    document.getElementById('overRegistro').style.display='block';
    document.getElementById('fadeRegistro').style.display='block';
}

function hideLightboxLogin() {
    document.getElementById('overLogin').style.display='none';
    document.getElementById('fadeLogin').style.display='none';
}

function hideLightboxRegistro() {
    document.getElementById('overRegistro').style.display='none';
    document.getElementById('fadeRegistro').style.display='none';
}

function notNull(){
    if($('#login').val()!='' && $('#contraseñalogin').val()!=''){
        return true;
    }
    else{
        return false;
    }
}

function alerta(texto, tipo){

    var mensaje = $('#mensaje');

    mensaje.html(texto);
    mensaje.removeClass();
    mensaje.addClass("alert");
    mensaje.addClass("alert-" + tipo);
    mensaje.show();
    mensaje.fadeOut(3000);
}

function mostrarUsuario(nombre){

    var botonRegistro =$('#botonRegistro');
    var botonLogin =$('#botonLogin');
    var nombreUsuario = $('#nombreUsuario');
    var botonLogout =$('#botonLogout');

    botonRegistro.hide();
    botonLogin.hide();
    nombreUsuario.html(nombre);
    botonLogout.show();
}

function datosUsuario(login){
    $.ajax({
        url: 'api/usuarios/'+login,
        method: 'GET'
    })
        .done(function(data, textStatus, jqXHR) {
            mostrarUsuario(data.nombre+" "+data.apellidos);
        })
}

function logout(){
    localStorage.removeItem("login");
    $.get("logout");

}

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

function notNull2(){
    if($('#loginRegistro').val()!='' && $('#contraseñaRegistro').val()!='' && $('#rContraseñaRegistro').val()!=''&& $('#nombreRegistro').val()!='' && $('#apellidosRegistro').val()!=''){
        return true;
    }
    else{
        return false;
    }
}

function contraseñaIgual(){
    if($('#contraseñaRegistro').val()==$('#rContraseñaRegistro').val()){
        return true;
    }
    else{
        return false;
    }
}

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
                })
        }
        else{
            alerta("Las contraseñas no coinciden", "info");
        }
    }
    else{
        alerta("Alguno de los campos esta vacio", "info");
    }
}

if (localStorage.login) {
    datosUsuario(localStorage.login);
}