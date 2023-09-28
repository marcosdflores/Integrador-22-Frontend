from models.user_model import User
from flask import templates, request, session


class UserController:

    @classmethod
    def login(cls):
        data = request.json
        user = User(
            username = data.get('username'),
            contrasena = data.get('paswword')
            
        )
        
        if User.is_registered(user):
            session['username'] = data.get('username')
            return {"message": "Sesion iniciada"}, 200
        else:
            return {"message": "Usuario o contraseña incorrectos"}, 401

    @classmethod
    def show_profile(cls):
        username = session.get('username')
        user = User.get(User(username = username))
        if user is None:
            return {"message": "Usuario no encontrado"}, 404
        else:
            return user.serialize(), 200
    
    @classmethod
    def logout(cls):

        session.pop('username', None)
        return {"message": "Sesion cerrada"}, 200
    
    @classmethod
    def ver_usuario(id_usuario):
        usuario = User.ver_usuario(id_usuario)
        return templates('profile.html', usuario=usuario)
    
    @classmethod
    def crear_usuario():
        nombre = request.form.get('nombre')
        apellido = request.form.get('apellido')
        username = request.form.get('username')
        passwordd = request.form.get('passwordd')
        email = request.form.get('email')
        estado_usuario = request.form.get('estado_usuario')
        rol_usuario = request.form.get('rol_usuario')
        fecha_nacimiento = request.form.get('fecha_nacimiento')

        
        User.crear_usuario(nombre, apellido, username, passwordd, email, estado_usuario, rol_usuario, fecha_nacimiento)
        return ('Usuario creado con éxito'), 201
    
    def modificar_usuario(id_usuario):
        
        nombre = request.form.get('nombre')
        apellido = request.form.get('apellido')
        username = request.form.get('username')
        passwordd = request.form.get('passwordd')
        email = request.form.get('email')
        estado_usuario = request.form.get('estado_usuario')
        rol_usuario = request.form.get('rol_usuario')

        usuario = User.ver_usuario(id_usuario)
        if usuario and usuario.id_usuario == session.get('id_usuario'):
            User.modificar_usuario(id_usuario, nombre, apellido, username, passwordd, email, estado_usuario, rol_usuario)
            return ('Usuario modificado con éxito'), 200
        
        else:
            return('No tienes permiso para modificar este usuario'), 401

        
    
    def eliminar_usuario(id_usuario):
        
        usuario = User.ver_usuario(id_usuario)
        if usuario and usuario.id_usuario == session.get('id_usuario'):
            User.eliminar_usuario(id_usuario)
            return('Usuario eliminado con éxito'),200
        else:
            return('No tienes permiso para eliminar este usuario'),401
