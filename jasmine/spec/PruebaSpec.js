/**
 * Created with JetBrains RubyMine.
 * User: adi
 * Date: 2/11/13
 * Time: 18:21
 * To change this template use File | Settings | File Templates.
 */

describe ("login",function(){

    var login;
    var contraseñalogin;

    beforeEach(function() {
        login = $('#login');
        contraseñalogin = $('#contraseñalogin');
    });
    it("No te deja si los campos estan vacios",function(){
        login.val('');
        contraseñalogin.val('');
        expect(notNull()).toBe(false);
    });
    it("Si te deja si los campos estan rellenados",function(){
        login.val('pepe@ua.es');
        contraseñalogin.val('pepe');
        expect(notNull()).toBe(true);
    });
});