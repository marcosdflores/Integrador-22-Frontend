from database import DatabaseConnection

class Mensaje:
    def __init__(self, **kwargs):
        self.id_mensaje = kwargs.get('id_mensaje')
        self.contenido_mensaje = kwargs.get('contenido_mensaje')
        self.fecha_envio = kwargs.get('fecha_envio')
        self.fecha_actualizacion = kwargs.get('fecha_actualizacion')
        self.id_usuario = kwargs.get('id_usuario')
        self.id_canal = kwargs.get('id_canal')
        
    def serialize(self):
        return {
            "id_mensaje": self.id_mensaje,
            "contenido_mensaje": self.contenido_mensaje,
            "fecha_envio": self.fecha_envio,
            "fecha_actualizacion": self.fecha_actualizacion,
            "id_usuario": self.id_usuario,
            "id_canal": self.id_canal
        }

    @classmethod
    def ver_mensajes_ordenados_cronológicamente(cls, id_canal):
        query = "SELECT * FROM mensajes WHERE id_canal = %s ORDER BY fecha_envio"
        params = (id_canal,)

        cursor = DatabaseConnection.fetch_all(query, params=params)
        mensajes = [cls(*row) for row in cursor]
        return mensajes

    @classmethod
    def crear_mensaje(cls, contenido_mensaje, id_usuario, id_canal):
        query = "INSERT INTO mensajes (contenido_mensaje, id_usuario, id_canal) VALUES (%s, %s, %s)"
        params = (contenido_mensaje, id_usuario, id_canal)

        cursor = DatabaseConnection.execute_query(query, params=params)
        cursor.close()

    @classmethod
    def modificar_mensaje(cls, id_mensaje, contenido_mensaje, id_usuario):
        query = "UPDATE mensajes SET contenido_mensaje = %s, fecha_actualizacion = CURRENT_TIMESTAMP() WHERE id_mensaje = %s AND id_usuario = %s"
        params = (contenido_mensaje, id_mensaje, id_usuario)

        cursor = DatabaseConnection.execute_query(query, params=params)
        cursor.close()

    @classmethod
    def eliminar_mensaje(cls, id_mensaje, id_usuario):
        query = "DELETE FROM mensajes WHERE id_mensaje = %s AND id_usuario = %s"
        params = (id_mensaje, id_usuario)

        cursor = DatabaseConnection.execute_query(query, params=params)
        cursor.close()

