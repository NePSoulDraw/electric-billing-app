# electric-billing-app
Aplicación de facturación eléctrica con CRUD y posibilidad de subida de archivos CSV

Esta aplicación la he desarrollado en un tiempo de 4 días durante 14 horas aproximadamente (3-4 horas por día), tanto el backend como frontend funcionan correctamente, el único fallo que he encontrado y no encuentro solución es que al realizar la subida de un archivo CSV se realiza todo el proceso correctamente, se guarda en la base de datos toda la información y por consola me indica que no se ha podido manejar un error (A pesar de que todo el proceso y el guardado de fichero se ha realizado correctamente). Por todo lo demás la aplicación funciona perfectamente (Ese error no afecta al uso de la aplicación).

A continuación, instrucciones para ejecutar el proyecto:

1. En el caso de que la base de datos (MongoDB) sea en local, asegurarse de tener una carpeta 'data' en la raíz del disco duro, y ejecutar el daemon de MongoDB (Llamado 'mongod')
2. Sustituir en el fichero .env del backend la cadena de conexión a la base de datos de MongoDB por la de tu base de datos local u online (NO SUSTITUIR EL NÚMERO DE PUERTO / 8080)
3. Ejecutar 'npm start' en el directorio backend (La carpeta de distribución del frontend ya está preparada en la carpeta 'public' del backend, por lo que no es necesario abrir un nuevo servidor únicamente para el cliente, en el propio Localhost en el puerto 8080 ya está toda la aplicación construida tanto backend como frontend)
