Brisa - Web de hoteles

Para este challenge he creado una web sencilla de hoteles con HTML, CSS y JavaScript. Se pueden ver varios alojamientos, filtrar por destino y precio, y calcular cuánto costaría quedarse varias noches. También se adapta al móvil.

Cómo la he desplegado

He usado AWS CLI para conectar con AWS y Terraform para configurar los recursos y subir los archivos a S3.

Al principio intenté usar CloudFront, pero los permisos del laboratorio daban problemas, así que al final la web está publicada directamente en S3.

Verla en local

Desde la carpeta del proyecto:

python3 -m http.server 8080 --directory web

Después se abre http://localhost:8080 en el navegador.

Los hoteles y los precios son de ejemplo, no se pueden hacer reservas reales.


## Problema con AWS Academy

Terraform creó el bucket, pero después falló al consultar `GetBucketObjectLockConfiguration`, porque el laboratorio bloquea ese permiso. Este mismo problema aparece explicado en el apartado 25 del documento de la sesión 1 del curso.

Para continuar, utilicé `data "aws_s3_bucket"` para consultar el bucket ya creado. Terraform configura el sitio web, sus permisos y el cifrado. También he subido los archivos mediante AWS CLI.

La web funciona, pero la creación y eliminación del bucket no quedan gestionadas por el código final. Esa parte del requisito está pendiente por la restricción del laboratorio. El error inicial y los comandos utilizados están recogidos en `evidencia.md`.