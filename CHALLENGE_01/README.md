# Brisa · Challenge 01

Web estática de hoteles: diseño adaptable, filtros por destino/precio, ordenación y cálculo de estancia. Los hoteles y precios son ficticios. No tiene reservas, pagos ni base de datos. Las fotos ilustrativas se cargan desde Unsplash y requieren conexión.

## Ver en local

Desde esta carpeta:

```sh
python3 -m http.server 8080 --directory web
```

Abrir http://localhost:8080.

## Infraestructura

Navegador → CloudFront (HTTPS) → S3 privado (acceso firmado OAC).
Terraform crea el bucket, bloqueo de acceso público, cifrado, política de acceso, distribución, cabeceras de seguridad y los tres archivos de la web. Usa el certificado y dominio de CloudFront; no necesita comprar un dominio. Región inicial: us-east-1, modificable con la variable region.

## Desplegar

1. Autenticarse en la cuenta del curso usando el método proporcionado por el profesor (SSO, perfil o credenciales temporales). No guardar claves en este proyecto. Si se usa un perfil con nombre, exportar AWS_PROFILE.
2. Comprobar la cuenta antes de crear recursos:

```sh
aws sts get-caller-identity
terraform -chdir=infra init
terraform -chdir=infra fmt -check
terraform -chdir=infra validate
terraform -chdir=infra plan -out=deploy.tfplan
terraform -chdir=infra apply deploy.tfplan
terraform -chdir=infra output -raw website_url
```

El despliegue puede tardar varios minutos y genera cargos según el uso de AWS; no se garantiza coste cero. El estado se guarda localmente en infra: conservarlo, no subirlo a Git ni compartirlo. Conservar .terraform.lock.hcl en Git.

## Actualizar

Editar web, repetir plan y apply. La caché puede tardar hasta cinco minutos en reflejar cambios. Para acelerar, después del apply:

```sh
aws cloudfront create-invalidation --distribution-id "$(terraform -chdir=infra output -raw distribution_id)" --paths '/*'
```

## Eliminar los recursos de esta práctica

Solo cuando ya no se necesiten, revisar y confirmar:

```sh
terraform -chdir=infra plan -destroy
terraform -chdir=infra destroy
```

Terraform elimina los archivos que administra y el bucket vacío. Si se suben otros archivos manualmente, habrá que retirarlos antes de borrar el bucket. No se fuerza el borrado de contenido ajeno al proyecto.

Referencia: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution
