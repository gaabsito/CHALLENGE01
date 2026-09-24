terraform {
  required_version = ">= 1.6, < 2.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 6.66.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = {
      Project   = "challenge-01-hoteles"
      ManagedBy = "Terraform"
    }
  }
}

# Reutiliza el bucket existente sin consultar Object Lock.
data "aws_s3_bucket" "web" {
  bucket = "brisa-hoteles-793629871707-us-east-1"
}

# Permite publicar mediante una política, manteniendo las ACL bloqueadas.
resource "aws_s3_bucket_public_access_block" "web" {
  bucket = data.aws_s3_bucket.web.id

  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_server_side_encryption_configuration" "web" {
  bucket = data.aws_s3_bucket.web.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_website_configuration" "web" {
  bucket = data.aws_s3_bucket.web.id

  index_document {
    suffix = "index.html"
  }
}

locals {
  web_files = {
    "index.html" = "text/html; charset=utf-8"
    "style.css"  = "text/css; charset=utf-8"
    "app.js"     = "application/javascript; charset=utf-8"
  }
}

# Lectura pública solo de los tres archivos de la web.
# No permite subir, borrar ni listar archivos.
resource "aws_s3_bucket_policy" "web" {
  bucket = data.aws_s3_bucket.web.id

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Sid       = "PublicReadWebsiteFiles"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"

        Resource = [
          for filename in keys(local.web_files) :
          "${data.aws_s3_bucket.web.arn}/${filename}"
        ]
      }
    ]
  })

  depends_on = [
    aws_s3_bucket_public_access_block.web
  ]
}

resource "aws_s3_object" "web" {
  for_each = local.web_files

  bucket = data.aws_s3_bucket.web.id
  key    = each.key
  source = "${path.module}/../web/${each.key}"

  source_hash = filemd5("${path.module}/../web/${each.key}")

  content_type  = each.value
  cache_control = "public, max-age=300"

  depends_on = [
    aws_s3_bucket_server_side_encryption_configuration.web
  ]
}

output "website_url" {
  value = "http://${aws_s3_bucket_website_configuration.web.website_endpoint}"
}

output "bucket_name" {
  value = data.aws_s3_bucket.web.id
}