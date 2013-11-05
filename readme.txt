MOSTRAR MENSAJES CON ANIMACIÓN

En nuestro caso hemos creado un método en JavaScipt (Alerta()) para poder llamarlo desde donde
queramos mostrandonos el mensaje con animacion. En nuestro caso aparecera en la barra de arriba y
desaparecera al cabo de unos segundos. Además dependiendo de si sale error, es correcto, o
simplemente es una nota informativa; saldra de un color o de otro.

JASMINE

Se han implementado dos pruebas sencillas de Jasmine para comprobar su funcionamiento, podemos
verlas en el archivo PruebaSpec.js dentro de la carpeta jasmine. Simplemente hemos querido
comprobar si la funcion notNull() (Nos permite saber si el loguin o password son nulos)
funcionaba correctamente para ello implementamos lo siguiente:

describe ("login",function(){

    var login;
    var contraseñalogin;

    //Este metodo se aplicara antes de cada funcion
    beforeEach(function() {
        login = $('#login');
        contraseñalogin = $('#contraseñalogin');
    });

    //Funcion que comprueba si los campos estan vacios
    it("No te deja si los campos estan vacios",function(){
        login.val('');
        contraseñalogin.val('');
        expect(notNull()).toBe(false); //Misma funcion que assertEquals() de JUnit
    });

    //Funcion que comprueba si los cambos estan llenos
    it("Si te deja si los campos estan rellenados",function(){
        login.val('pepe@ua.es');
        contraseñalogin.val('pepe');
        expect(notNull()).toBe(true);
    });
});