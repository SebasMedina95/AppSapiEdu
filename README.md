<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## DESCRIPCIÓN DEL PROYECTO ##
Esta aplicación backend es la estructuración de un módulo presupuestario para la alcaldía de una municipalidad especificada, la idea será manejar las diferentes posiciones presupuestales, proyectos, centros gestores, fondos y áreas de funcionalidad aplicada que se encuentran dispuestas para difernetas rutas de disposición financiera, la idea será controlar toda esta estructura y manerar temas de proveedores, manejo de dineros entrantes y salientes así como también un módulo de autenticación para mantener la seguridad. Esta API tiene la posibilidad de ser expandida para unos anexos vía PQRS y la gestión de actividades detalladas que hacen parte de la composición de rutas presupuestales y razón de ser de las mismas.

``Desarrollado por``: [Juan Sebastian Medina Toro](https://www.linkedin.com/in/juan-sebastian-medina-toro-887491249/).

## PASOS DE INSTALACIÓN ##
Una vez descagada la aplicación, siga los siguientes pasos:
1. Ejecute el comando de instalación de dependencias:
```bash
$ npm install
```
2. Renombre el archivo ``.env.template`` a ``.env`` y configure las variables de entorno
3. Ejecute el comando para levantar la imagen de Docker:
```bash
$ docker compose up -d
```
4. Una vez levantada la base de datos, creemos sus tablas respectivas, para ello debemos ejecutar todas las migraciones que componen la base de datos con el comando:
```bash
$ npm run migration:run
```
Posterior a este paso, corroboar en la base de datos la creación de las tablas.
5. Ejecute el siguiente comando para llenar la información inicial de la base de datos, esto es una semilla de información preliminar para arrancar a usar los aspectos básicos del sistema, ejecute el comando:
```bash
$ npm run seed
```
6. Ejecutar en modo desarrollo usando el comando:
```bash
$ npm run start:dev
```


## ``INFORMACIÓN ADICIONAL IMPORTANTE`` ##
## CREACIÓN Y EJECUCIÓN DE MIGRACIONES ##
1. Para la creación de las migraciones, debemos ejecutar el comando:
```bash
$ npm run migration:generate ./src/config/database/migrations/NOMBRE_DE_MIGRACION
```
Debemos cambiar el ``NOMBRE_DE_MIGRACION`` por el nombre que le vayamos a dar a la migración, es de suma importancia y recomendación que los nombres de la migración no tengan espacios, usar ``-`` o ``_`` como separadores.

2. Para la ejecución de la(s) migración(es) debemos usar el comando:
```bash
$ npm run migration:run
```
Este comando ejecutará todas las migraciones que hayan en la carpeta de migraciones dentro del proyecto, por eso es importante tenerlas actualizadas al orden del día. Al iniciar el proyecto la primera vez, debemos ejecutar este comando para poder generar la base de datos.

3. Si desea revertir la última migración, podemos usar el comando:
```bash
$ npm run migration:rollback
```

## LÓGICA DEL PROYECTO (A quien pueda interesar) ##
En este apartado, se explicará a generalidad cual es el propósito de la aplicación, como funcionará la comunicación entre las diferentes entidades de trabajo para subsanar la necesidad. Se recuerda que esta aplicación es una API RESTful y el apartado de Frontend será dado en otro proyecto a posteriori.

``Entidades de trabajo``:
* ``Auth``:
  Módulo de autenticación y autorización, aquí también manejaremos la gestión de usuarios. Estaremos directamente enlazados al módulo de Personas pero adicional transversalmente a todos los demás módulos para guardar las gestiones. En este módulo también será controlado el tema de los permisos.
* ``Rutas Presupuestales``:
  Módulo donde se conectarán todos los entes necesarios que generan una ruta presupuestal para los ingresos financieros dentro de la alcaldía, aquí tendremos la transversabilidad de los proyectos, áreas funcionales, fondos, posiciones presupuestales tanto origen como SapiEdu así como los centros gestores y las entidades de control.
* ``Campus``:
  Módulo básico donde se gestionará las diferentes sedes de la alcaldía
* ``Entidades de Control:``:
  Módulo básico donde se gestionará las diferentes entidades de control
* ``Personas``:
  Módulo donde se trabajará la información básica de las personas que harán parte de los beneficios de la alcaldía. Este módulo se unificará con el de usuarios para la información elemental de usuarios, así como será transversal en los demás módulos para la gestión de las personas y los beneficios adquiridos
* ``Áreas Funcionales``:
  Módulo enlazado con el proyectos, las áreas funcionalidades determinarán un espacio de locación donde será ejecutado un presupuesto de la alcaldía
* ``Fondos``:
  Módulo estrechamente relacionado tanto con las rutas presupuestales como con el proyecto, la idea será que cada proyecto tiene varios fondos de donde sale respectivamente el dinero, los fondos se enlazan junto con los proyectos y sus áreas funcionales a las rutas presupuestales, formando un solo elemento de información.
* ``Personas``:
  Módulo de transversabilidad donde se alojará la información básica de todas las personas; en este módulo se guardará la información base de los usuarios dentro del sistema antes que sus credenciales de trabajo y también la información de correspondencia de una persona que solicitará un beneficio a la alcaldía; también estará estrechamente relacionado con la información de proveedores y también para la gestión de PQRS.
* ``Posiciones Presupuestales de Origen``:
  El módulo de las posiciones presupuestales determinan la vinculación de actividades detalladas que serán dispuestas para la ejecución de un presupuesto dentro delas rutas presupuestales, a su vez, son la posición base para la generación de las posiciones presupuestales SapiEdu, que estas últimas son las que se enlazan directamente en los modelos de ejecución de la alcaldía, pero parten desde un origen centralizado según el flujo de trabajo del cliente.
* ``Posiciones Presupuestales de SapiEdu``:
  Este módulo, complementario al módulo padre de posiciones presupuestales de origen, son las posiciones presupuestales hijas que contienen la información especificada para la ejecución del presupuesto, son importantes ya que en la subida de documentos de excel donde se extraen las rutas, trabajamos a partir de las rutas presupuestales SapiEdu, y por medio de la extracción de los últimos 3 dígitos obtenemos de manera explícita la ruta presupuestal de origen (además del enlace FK que se tendrá vía BD)
* ``Proyectos``:
  El módulo de proyectos determina dos grandes grupos de trabajo, los proyectos de inversión y los proyectos de funcionamiento, para la generación de las diferentes rutas de presupuesto de control, es clave determinar cual es el proyecto que engloba los recursos, por ejemplo, por medio de un proyecto de inversión registramos los recursos iniciales o bien los recursos con los que se contará en determinada ruta presupuestal, mientras que los proyectos de funcionamiento contendrán la distribución de estos recursos en diferentes rutas presupuestales (se menciona diferentes porque podríamos tener diferentes proyectos y diferentes rutas como tal desglozando el recurso dado por un proyecto de inversión).


