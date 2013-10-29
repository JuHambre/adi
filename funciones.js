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

function peticionAJAX(){
    var login=document.getElementById("login");
    var contraseñalogin=document.getElementById("contraseñalogin");
    var req = new XMLHttpRequest();
    req.open('POST','login', true);
    req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    req.onreadystatechange = mi_callback(req);

    var loginseparado=login.value.split("@");
    req.send('login='+loginseparado[0]+'%40'+loginseparado[1]+'&password='+contraseñalogin.value);
}

function mi_callback(req) {
    return function(){
        if(req.readyState == 4){
            if(req.status == 200){
                alert(req.responseText);
            }
        }
    }
}