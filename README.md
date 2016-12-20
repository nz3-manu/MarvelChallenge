Marvel Challenge
===

Para ejecutar esta single page application (SPA), ejecuta en consola los siguientes comandos:

* npm install
* npm start

---
## Descripción breve de la SPA:

Se creo un componente principal en React que se llama **App**, el cual va a contener todos los componentes que explicare a continuación:

**Componente WrapComics**: Es encargado de pintar cada uno de los comics de los cuales de trae desde la APi, además contiene un componente el cual es **<Modal/>**, la función que realiza este es poder abrir una ventana la cual mostrara información mas detallada del comic al cual el usuario le dio clic, esta ventana contara además con un botón que permitirá  agregar este comic a Mis comics favoritos.

**Componente MyFavoutiresComics**: Es encargado de almacenar los comics a los cual el usuario agrego a favoritos y tambien tiene la funcionalidad de elimiar el comic de la seccion favoritos la función a cargo de eliminar el comic es *deleteComic*.

**Componente ButtonToolbar**: Es la paginación que se encuentra en la parte superior, es encargado de mostrar cada 10 comics, estos *ButtonToolbar* va a depender de la cantidad de comics que se traigan de la Api, ya a menor comics se necesitarían menos botones.
