# Tercera entrega del proyecto final

## Se debe entregar:
- Menú de registro y autenticación de usuarios basado en passport local, guardando en la base de datos las credenciales y el resto de los datos ingresados al momento del registro.
- Formulario post de registro y uno de login. De modo que, luego de concretarse cualquiera de estas operaciones en forma exitosa, el usuario accederá a su home.
- Envío de un email y un mensaje de whatsapp al administrador desde el servidor, a un número de contacto almacenado en una constante global.

## Aspectos a incluir
- El servidor trabajará con una base de datos DBaaS.
- Habilitar el modo cluster para el servidor, como opcional a través de una constante global.
- Utilizar alguno de los loggers ya vistos y reemplazar todos los mensajes a consola. En el caso de errores moderados o graves, el log tendrá admeás como destino un archivo elegido.
- Realizar una prueba de performance en modo local, con y sin cluster, utilizando Artiller en el endpoint del listado de productos (con el usuario logueado).