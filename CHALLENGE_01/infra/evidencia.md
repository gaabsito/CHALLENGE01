 + "Project"   = "challenge-01-hoteles"
        }
      + version_id             = (known after apply)
    }

  # aws_s3_object.web["style.css"] will be created
  + resource "aws_s3_object" "web" {
      + acl                    = (known after apply)
      + arn                    = (known after apply)
      + bucket                 = (known after apply)
      + bucket_key_enabled     = (known after apply)
      + cache_control          = "public, max-age=300"
      + checksum_crc32         = (known after apply)
      + checksum_crc32c        = (known after apply)
      + checksum_crc64nvme     = (known after apply)
      + checksum_sha1          = (known after apply)
      + checksum_sha256        = (known after apply)
      + content_type           = "text/css; charset=utf-8"
      + etag                   = (known after apply)
      + force_destroy          = false
      + id                     = (known after apply)
      + key                    = "style.css"
      + kms_key_id             = (known after apply)
      + region                 = "us-east-1"
      + server_side_encryption = (known after apply)
      + source                 = "./../web/style.css"
      + source_hash            = "788c78bb6aab5bc3dcd361d555d7c5b7"
      + storage_class          = (known after apply)
      + tags_all               = {
          + "ManagedBy" = "Terraform"
          + "Project"   = "challenge-01-hoteles"
        }
      + version_id             = (known after apply)
    }

Plan: 10 to add, 0 to change, 0 to destroy.

Changes to Outputs:
  + bucket_name     = (known after apply)
  + distribution_id = (known after apply)
  + website_url     = (known after apply)

────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

Saved the plan to: deploy.tfplan

To perform exactly these actions, run the following command to apply:
    terraform apply "deploy.tfplan"
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra apply deploy.tfplan
aws_s3_bucket.web: Creating...
aws_s3_bucket.web: Still creating... [00m10s elapsed]
╷
│ Error: reading S3 Bucket (brisa-hoteles-793629871707-us-east-1) object lock configuration: operation error S3: GetObjectLockConfiguration, https response error StatusCode: 403, RequestID: E2NYYY54XZ2JC9QJ, HostID: A8eOHCUUyOCEBBtJYu/utffDHiGR8MUsdxUTlkh4lknQbd5ydQR5lB/T0FV4ksgsR1jS6c/NU4Y1RCk6MxpjrALVgXmKbUFm, api error AccessDenied: User: arn:aws:sts::793629871707:assumed-role/voclabs/user1609577=Gabriel_Galan is not authorized to perform: s3:GetBucketObjectLockConfiguration on resource: "arn:aws:s3:::brisa-hoteles-793629871707-us-east-1" with an explicit deny in a service control policy: arn:aws:organizations::021312171183:policy/o-zmj0qsgu0z/service_control_policy/p-6v4y751d
│ 
│   with aws_s3_bucket.web,
│   on main.tf line 21, in resource "aws_s3_bucket" "web":
│   21: resource "aws_s3_bucket" "web" {
│ 
╵
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ aws s3api head-bucket --bucket brisa-hoteles-793629871707-us-east-1
{
    "BucketArn": "arn:aws:s3:::brisa-hoteles-793629871707-us-east-1",
    "BucketRegion": "us-east-1",
    "AccessPointAlias": false
}
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra state list
data.aws_caller_identity.current
aws_s3_bucket.web
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ cat infra/.terraform.lock.hcl
# This file is maintained automatically by "terraform init".
# Manual edits may be lost in future updates.

provider "registry.terraform.io/hashicorp/aws" {
  version     = "6.66.0"
  constraints = "~> 6.0"
  hashes = [
    "h1:OnLj4nhqJnEcUzyyRKUjp1FgWG00Y8maikJEYSf9Zjw=",
    "zh:156fe7164a3d26ef6b35734c43e99fb198df90575ed897d1182b8e930b8cd523",
    "zh:1af52b22b35be00f8d16e3ebebff9fa699ec4db2ef69e6032ba5c536f80c03d9",
    "zh:2545a8478bd551fdc9694f6cc1a1ad24617f6736f8bde0ad6cae90987c65380f",
    "zh:4070db1ee369ccb41cb610bfd887386bc0a9b9ecad60aeb4dbce58443d2519dd",
    "zh:53da7d3c1840ef875c7d34e967732502a64fe677af0e78824773d4c15a8fe740",
    "zh:576a93a28bf611a4de2a2e6ced697a41d5126b8fd31d30782b16797e410a9706",
    "zh:58fed5fa9a033355b9d4f3092c817b70d934100e0d8678d6e4c93f3c9493d4e4",
    "zh:6a9ca2f24e2ee9156dd785d159a850b35d190e9cf7eca21cb9582970c2db80cd",
    "zh:729edd30f99cc16009deba5c013265b0c81eda261a3d0821cbd011d3287fd230",
    "zh:7ae460049b75bd4aefee465ef7c53a01ac2df46d4d3e3ac00824afa8b5cb83fb",
    "zh:9051fa85c8034ade8a57a5c6f232fd33da28f3800bb5aa40bc8625dbc5e27632",
    "zh:906547e4319805e7acf7fbdf2bac28a4b1a7370790a2a430c7adb1b29bb934eb",
    "zh:998f27410a66158a35ee5ed142c27e5b21fe8601941da55da2157f8042d6dcca",
    "zh:9b12af85486a96aedd8d7984b0ff811a4b42e3d88dad1a3fb4c0b580d04fa425",
    "zh:9c1804eff1dda0446dc2d215231015bb65a2fc6c3b7ba24584fe45f1ddd3fa9f",
    "zh:b03ff5efdee310502aaaeb460144dc059bce72a0d8217e6b989099ef8aef9283",
  ]
}
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ aws s3api get-object-lock-configuration --bucket brisa-hoteles-793629871707-us-east-1

aws: [ERROR]: An error occurred (AccessDenied) when calling the GetObjectLockConfiguration operation: User: arn:aws:sts::793629871707:assumed-role/voclabs/user1609577=Gabriel_Galan is not authorized to perform: s3:GetBucketObjectLockConfiguration on resource: "arn:aws:s3:::brisa-hoteles-793629871707-us-east-1" with an explicit deny in a service control policy: arn:aws:organizations::021312171183:policy/o-zmj0qsgu0z/service_control_policy/p-6v4y751d
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ cp infra/terraform.tfstate "infra/terraform.tfstate.backup-$(date +%Y%m%d-%H%M%S)"
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra state rm aws_s3_bucket.web
╷
│ Error: Duplicate required providers configuration
│ 
│   on main.tf line 128, in terraform:
│  128:   required_providers {
│ 
│ A module may have only one required providers configuration. The required providers were previously configured at main.tf:3,3-21.
╵

╷
│ Error: Duplicate provider configuration
│ 
│   on main.tf line 136:
│  136: provider "aws" {
│ 
│ A default (non-aliased) provider configuration for "aws" was already given at main.tf:10,1-15. If multiple configurations are
│ required, set the "alias" argument for alternative configurations.
╵

╷
│ Error: Duplicate resource "aws_s3_bucket_public_access_block" configuration
│ 
│   on main.tf line 153:
│  153: resource "aws_s3_bucket_public_access_block" "web" {
│ 
│ A aws_s3_bucket_public_access_block resource named "web" was already declared at main.tf:24,1-51. Resource names must be unique per
│ type in each module.
╵

╷
│ Error: Duplicate resource "aws_s3_bucket_server_side_encryption_configuration" configuration
│ 
│   on main.tf line 162:
│  162: resource "aws_s3_bucket_server_side_encryption_configuration" "web" {
│ 
│ A aws_s3_bucket_server_side_encryption_configuration resource named "web" was already declared at main.tf:31,1-68. Resource names
│ must be unique per type in each module.
╵

╷
│ Error: Duplicate resource "aws_cloudfront_origin_access_control" configuration
│ 
│   on main.tf line 172:
│  172: resource "aws_cloudfront_origin_access_control" "web" {
│ 
│ A aws_cloudfront_origin_access_control resource named "web" was already declared at main.tf:37,1-54. Resource names must be unique
│ per type in each module.
╵

╷
│ Error: Duplicate resource "aws_cloudfront_distribution" configuration
│ 
│   on main.tf line 179:
│  179: resource "aws_cloudfront_distribution" "web" {
│ 
│ A aws_cloudfront_distribution resource named "web" was already declared at main.tf:43,1-45. Resource names must be unique per type
│ in each module.
╵

╷
│ Error: Duplicate resource "aws_s3_bucket_policy" configuration
│ 
│   on main.tf line 225:
│  225: resource "aws_s3_bucket_policy" "web" {
│ 
│ A aws_s3_bucket_policy resource named "web" was already declared at main.tf:96,1-38. Resource names must be unique per type in each
│ module.
╵

╷
│ Error: Duplicate resource "aws_s3_object" configuration
│ 
│   on main.tf line 265:
│  265: resource "aws_s3_object" "web" {
│ 
│ A aws_s3_object resource named "web" was already declared at main.tf:113,1-31. Resource names must be unique per type in each
│ module.
╵

╷
│ Error: Duplicate output definition
│ 
│   on main.tf line 282:
│  282: output "website_url" {
│ 
│ An output named "website_url" was already defined at main.tf:122,1-21. Output names must be unique within a module.
╵

╷
│ Error: Duplicate output definition
│ 
│   on main.tf line 286:
│  286: output "distribution_id" {
│ 
│ An output named "distribution_id" was already defined at main.tf:123,1-25. Output names must be unique within a module.
╵

╷
│ Error: Duplicate output definition
│ 
│   on main.tf line 290:
│  290: output "bucket_name" {
│ 
│ An output named "bucket_name" was already defined at main.tf:124,1-21. Output names must be unique within a module.
╵

MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ cp infra/terraform.tfstate "infra/terraform.tfstate.backup-$(date +%Y%m%d-%H%M%S)"
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra state rm aws_s3_bucket.web
Removed aws_s3_bucket.web
Successfully removed 1 resource instance(s).
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra fmt
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra init -upgrade
Initializing the backend...

Initializing provider plugins...
- Finding hashicorp/aws versions matching "6.66.0"...
- Using previously-installed hashicorp/aws v6.66.0

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra validate
Success! The configuration is valid.

MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra state rm aws_s3_bucket.web
╷
│ Error: Invalid target address
│ 
│ No matching objects found. To view the available instances, use "terraform state list". Please modify the address to reference a specific instance.
╵

MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra state list
data.aws_caller_identity.current
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra plan -out=deploy.tfplan
data.aws_s3_bucket.web: Reading...
data.aws_s3_bucket.web: Read complete after 2s [id=brisa-hoteles-793629871707-us-east-1]

Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following
symbols:
  + create

Terraform will perform the following actions:

  # aws_cloudfront_distribution.web will be created
  + resource "aws_cloudfront_distribution" "web" {
      + arn                             = (known after apply)
      + caller_reference                = (known after apply)
      + comment                         = "Challenge 01 - Brisa hoteles"
      + continuous_deployment_policy_id = (known after apply)
      + default_root_object             = "index.html"
      + domain_name                     = (known after apply)
      + enabled                         = true
      + etag                            = (known after apply)
      + hosted_zone_id                  = (known after apply)
      + http_version                    = "http2"
      + id                              = (known after apply)
      + in_progress_validation_batches  = (known after apply)
      + is_ipv6_enabled                 = true
      + last_modified_time              = (known after apply)
      + logging_v1_enabled              = (known after apply)
      + price_class                     = "PriceClass_100"
      + retain_on_delete                = false
      + staging                         = false
      + status                          = (known after apply)
      + tags_all                        = {
          + "ManagedBy" = "Terraform"
          + "Project"   = "challenge-01-hoteles"
        }
      + trusted_key_groups              = (known after apply)
      + trusted_signers                 = (known after apply)
      + wait_for_deployment             = true

      + default_cache_behavior {
          + allowed_methods        = [
              + "GET",
              + "HEAD",
            ]
          + cached_methods         = [
              + "GET",
              + "HEAD",
            ]
          + compress               = true
          + default_ttl            = 300
          + max_ttl                = 3600
          + min_ttl                = 0
          + target_origin_id       = "hoteles-s3"
          + trusted_key_groups     = (known after apply)
          + trusted_signers        = (known after apply)
          + viewer_protocol_policy = "redirect-to-https"

          + forwarded_values {
              + headers                 = (known after apply)
              + query_string            = false
              + query_string_cache_keys = (known after apply)

              + cookies {
                  + forward           = "none"
                  + whitelisted_names = (known after apply)
                }
            }

          + grpc_config (known after apply)
        }

      + origin {
          + connection_attempts         = 3
          + connection_timeout          = 10
          + domain_name                 = "brisa-hoteles-793629871707-us-east-1.s3.us-east-1.amazonaws.com"
          + origin_access_control_id    = (known after apply)
          + origin_id                   = "hoteles-s3"
          + response_completion_timeout = (known after apply)
            # (1 unchanged attribute hidden)
        }

      + restrictions {
          + geo_restriction {
              + locations        = (known after apply)
              + restriction_type = "none"
            }
        }

      + viewer_certificate {
          + cloudfront_default_certificate = true
          + minimum_protocol_version       = "TLSv1"
        }
    }

  # aws_cloudfront_origin_access_control.web will be created
  + resource "aws_cloudfront_origin_access_control" "web" {
      + arn                               = (known after apply)
      + description                       = "Managed by Terraform"
      + etag                              = (known after apply)
      + id                                = (known after apply)
      + name                              = "challenge-01-hoteles"
      + origin_access_control_origin_type = "s3"
      + signing_behavior                  = "always"
      + signing_protocol                  = "sigv4"
    }

  # aws_s3_bucket_policy.web will be created
  + resource "aws_s3_bucket_policy" "web" {
      + bucket = "brisa-hoteles-793629871707-us-east-1"
      + id     = (known after apply)
      + policy = (known after apply)
      + region = "us-east-1"
    }

  # aws_s3_bucket_public_access_block.web will be created
  + resource "aws_s3_bucket_public_access_block" "web" {
      + block_public_acls       = true
      + block_public_policy     = true
      + bucket                  = "brisa-hoteles-793629871707-us-east-1"
      + id                      = (known after apply)
      + ignore_public_acls      = true
      + region                  = "us-east-1"
      + restrict_public_buckets = true
    }

  # aws_s3_bucket_server_side_encryption_configuration.web will be created
  + resource "aws_s3_bucket_server_side_encryption_configuration" "web" {
      + bucket = "brisa-hoteles-793629871707-us-east-1"
      + id     = (known after apply)
      + region = "us-east-1"

      + rule {
          + blocked_encryption_types = (known after apply)
          + bucket_key_enabled       = (known after apply)

          + apply_server_side_encryption_by_default {
              + kms_master_key_id = (known after apply)
              + sse_algorithm     = "AES256"
            }
        }
    }

  # aws_s3_object.web["app.js"] will be created
  + resource "aws_s3_object" "web" {
      + acl                    = (known after apply)
      + arn                    = (known after apply)
      + bucket                 = "brisa-hoteles-793629871707-us-east-1"
      + bucket_key_enabled     = (known after apply)
      + cache_control          = "public, max-age=300"
      + checksum_crc32         = (known after apply)
      + checksum_crc32c        = (known after apply)
      + checksum_crc64nvme     = (known after apply)
      + checksum_sha1          = (known after apply)
      + checksum_sha256        = (known after apply)
      + content_type           = "application/javascript; charset=utf-8"
      + etag                   = (known after apply)
      + force_destroy          = false
      + id                     = (known after apply)
      + key                    = "app.js"
      + kms_key_id             = (known after apply)
      + region                 = "us-east-1"
      + server_side_encryption = (known after apply)
      + source                 = "./../web/app.js"
      + source_hash            = "8c14d8c510941387dc746ff4a5e27e93"
      + storage_class          = (known after apply)
      + tags_all               = {
          + "ManagedBy" = "Terraform"
          + "Project"   = "challenge-01-hoteles"
        }
      + version_id             = (known after apply)
    }

  # aws_s3_object.web["index.html"] will be created
  + resource "aws_s3_object" "web" {
      + acl                    = (known after apply)
      + arn                    = (known after apply)
      + bucket                 = "brisa-hoteles-793629871707-us-east-1"
      + bucket_key_enabled     = (known after apply)
      + cache_control          = "public, max-age=300"
      + checksum_crc32         = (known after apply)
      + checksum_crc32c        = (known after apply)
      + checksum_crc64nvme     = (known after apply)
      + checksum_sha1          = (known after apply)
      + checksum_sha256        = (known after apply)
      + content_type           = "text/html; charset=utf-8"
      + etag                   = (known after apply)
      + force_destroy          = false
      + id                     = (known after apply)
      + key                    = "index.html"
      + kms_key_id             = (known after apply)
      + region                 = "us-east-1"
      + server_side_encryption = (known after apply)
      + source                 = "./../web/index.html"
      + source_hash            = "2cc02d926181c74c876793ee3e8e53c4"
      + storage_class          = (known after apply)
      + tags_all               = {
          + "ManagedBy" = "Terraform"
          + "Project"   = "challenge-01-hoteles"
        }
      + version_id             = (known after apply)
    }

  # aws_s3_object.web["style.css"] will be created
  + resource "aws_s3_object" "web" {
      + acl                    = (known after apply)
      + arn                    = (known after apply)
      + bucket                 = "brisa-hoteles-793629871707-us-east-1"
      + bucket_key_enabled     = (known after apply)
      + cache_control          = "public, max-age=300"
      + checksum_crc32         = (known after apply)
      + checksum_crc32c        = (known after apply)
      + checksum_crc64nvme     = (known after apply)
      + checksum_sha1          = (known after apply)
      + checksum_sha256        = (known after apply)
      + content_type           = "text/css; charset=utf-8"
      + etag                   = (known after apply)
      + force_destroy          = false
      + id                     = (known after apply)
      + key                    = "style.css"
      + kms_key_id             = (known after apply)
      + region                 = "us-east-1"
      + server_side_encryption = (known after apply)
      + source                 = "./../web/style.css"
      + source_hash            = "788c78bb6aab5bc3dcd361d555d7c5b7"
      + storage_class          = (known after apply)
      + tags_all               = {
          + "ManagedBy" = "Terraform"
          + "Project"   = "challenge-01-hoteles"
        }
      + version_id             = (known after apply)
    }

Plan: 8 to add, 0 to change, 0 to destroy.

Changes to Outputs:
  + bucket_name     = "brisa-hoteles-793629871707-us-east-1"
  + distribution_id = (known after apply)
  + website_url     = (known after apply)

─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

Saved the plan to: deploy.tfplan

To perform exactly these actions, run the following command to apply:
    terraform apply "deploy.tfplan"
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra apply deploy.tfplan
aws_cloudfront_origin_access_control.web: Creating...
aws_s3_bucket_public_access_block.web: Creating...
aws_s3_bucket_server_side_encryption_configuration.web: Creating...
aws_s3_bucket_public_access_block.web: Creation complete after 2s [id=brisa-hoteles-793629871707-us-east-1]
aws_s3_bucket_server_side_encryption_configuration.web: Creation complete after 2s [id=brisa-hoteles-793629871707-us-east-1]
aws_s3_object.web["index.html"]: Creating...
aws_s3_object.web["app.js"]: Creating...
aws_s3_object.web["style.css"]: Creating...
aws_s3_object.web["app.js"]: Creation complete after 2s [id=brisa-hoteles-793629871707-us-east-1/app.js]
aws_s3_object.web["index.html"]: Creation complete after 2s [id=brisa-hoteles-793629871707-us-east-1/index.html]
aws_s3_object.web["style.css"]: Creation complete after 2s [id=brisa-hoteles-793629871707-us-east-1/style.css]
╷
│ Error: creating CloudFront Origin Access Control (challenge-01-hoteles): operation error CloudFront: CreateOriginAccessControl, https response error StatusCode: 403, RequestID: e070f8b4-3deb-43cd-bd5d-25ba9414fa18, api error AccessDenied: User: arn:aws:sts::793629871707:assumed-role/voclabs/user1609577=Gabriel_Galan is not authorized to perform: cloudfront:CreateOriginAccessControl on resource: arn:aws:cloudfront::793629871707:origin-access-control/* because no identity-based policy allows the cloudfront:CreateOriginAccessControl action
│ 
│   with aws_cloudfront_origin_access_control.web,
│   on main.tf line 48, in resource "aws_cloudfront_origin_access_control" "web":
│   48: resource "aws_cloudfront_origin_access_control" "web" {
│ 
╵
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra fmt
main.tf
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra validate
Success! The configuration is valid.

MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra plan -out=deploy.tfplan
data.aws_s3_bucket.web: Reading...
data.aws_s3_bucket.web: Read complete after 2s [id=brisa-hoteles-793629871707-us-east-1]
aws_s3_bucket_public_access_block.web: Refreshing state... [id=brisa-hoteles-793629871707-us-east-1]
aws_s3_bucket_server_side_encryption_configuration.web: Refreshing state... [id=brisa-hoteles-793629871707-us-east-1]
aws_s3_object.web["index.html"]: Refreshing state... [id=brisa-hoteles-793629871707-us-east-1/index.html]
aws_s3_object.web["app.js"]: Refreshing state... [id=brisa-hoteles-793629871707-us-east-1/app.js]
aws_s3_object.web["style.css"]: Refreshing state... [id=brisa-hoteles-793629871707-us-east-1/style.css]

Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following
symbols:
  + create
  ~ update in-place

Terraform will perform the following actions:

  # aws_s3_bucket_policy.web will be created
  + resource "aws_s3_bucket_policy" "web" {
      + bucket = "brisa-hoteles-793629871707-us-east-1"
      + id     = (known after apply)
      + policy = jsonencode(
            {
              + Statement = [
                  + {
                      + Action    = "s3:GetObject"
                      + Effect    = "Allow"
                      + Principal = "*"
                      + Resource  = [
                          + "arn:aws:s3:::brisa-hoteles-793629871707-us-east-1/app.js",
                          + "arn:aws:s3:::brisa-hoteles-793629871707-us-east-1/index.html",
                          + "arn:aws:s3:::brisa-hoteles-793629871707-us-east-1/style.css",
                        ]
                      + Sid       = "PublicReadWebsiteFiles"
                    },
                ]
              + Version   = "2012-10-17"
            }
        )
      + region = "us-east-1"
    }

  # aws_s3_bucket_public_access_block.web will be updated in-place
  ~ resource "aws_s3_bucket_public_access_block" "web" {
      ~ block_public_policy     = true -> false
        id                      = "brisa-hoteles-793629871707-us-east-1"
      ~ restrict_public_buckets = true -> false
        # (4 unchanged attributes hidden)
    }

  # aws_s3_bucket_website_configuration.web will be created
  + resource "aws_s3_bucket_website_configuration" "web" {
      + bucket           = "brisa-hoteles-793629871707-us-east-1"
      + id               = (known after apply)
      + region           = "us-east-1"
      + routing_rules    = (known after apply)
      + website_domain   = (known after apply)
      + website_endpoint = (known after apply)

      + index_document {
          + suffix = "index.html"
        }

      + routing_rule (known after apply)
    }

Plan: 2 to add, 1 to change, 0 to destroy.

Changes to Outputs:
  + website_url = (known after apply)

─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

Saved the plan to: deploy.tfplan

To perform exactly these actions, run the following command to apply:
    terraform apply "deploy.tfplan"
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra apply deploy.tfplan
aws_s3_bucket_public_access_block.web: Modifying... [id=brisa-hoteles-793629871707-us-east-1]
aws_s3_bucket_website_configuration.web: Creating...
aws_s3_bucket_public_access_block.web: Modifications complete after 2s [id=brisa-hoteles-793629871707-us-east-1]
aws_s3_bucket_policy.web: Creating...
aws_s3_bucket_website_configuration.web: Creation complete after 3s [id=brisa-hoteles-793629871707-us-east-1]
aws_s3_bucket_policy.web: Creation complete after 2s [id=brisa-hoteles-793629871707-us-east-1]

Apply complete! Resources: 2 added, 1 changed, 0 destroyed.

Outputs:

bucket_name = "brisa-hoteles-793629871707-us-east-1"
website_url = "http://brisa-hoteles-793629871707-us-east-1.s3-website-us-east-1.amazonaws.com"
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra output -raw website_urlç
╷
│ Error: Output "website_urlç" not found
│ 
│ The output variable requested could not be found in the state file. If you recently added this to your configuration, be sure to
│ run `terraform apply`, since the state won't be updated with new output variables until that command is run.
╵
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra output -raw website_url
http://brisa-hoteles-793629871707-us-east-1.s3-website-us-east-1.amazonaws.comMacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform 

MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ cd /Users/gabsitoo/Desktop/CURSO26_27/G
MacBook-Air-de-Gabriel:G gabsitoo$ git clone https://github.com/gaabsito/CHALLENGE01.git CHALLENGE01-GITHUB
Cloning into 'CHALLENGE01-GITHUB'...
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 5 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
Receiving objects: 100% (5/5), done.
MacBook-Air-de-Gabriel:G gabsitoo$ history
    1  ls
    7  aws --version
   12  export AWS_DEFAULT_REGION="us-east-1"
   13  aws sts get-caller-identity
   15  aws sts get-caller-identity
   18  aws sts get-caller-identity
   20  aws --version
   21  aws sts get-caller-identity --region us-east-1
   22  terraform version
   23  mkdir terraform-00-configuracion
   24  cd terraform-00-configuracion
   25  code .
   26  terraform init
   27  terraform validate
   28  terraform init
   29  cd ..
   30  ls
   31  cd 01-Primera_EC2/
   32  terraform init
   33  terraform validate
   34  terraform validate
   35  terraform plan
   36  terraform validate
   37  terraform version; uname -m;
   38  which terraform; command -v brew;
   39  curl -fL "https://releases.hashicorp.com/terraform/1.16.3/terraform_1.16.3_darwin_arm64.zip" -o /tmp/terraform-arm64.zip && unzip -o /tmp/terraform-arm64.zip terraform -d "/Users/gabsitoo/Downloads/terraform_1" && terraform version;
   40  terraform validate
   41  terraform init;
   42  terraform validate;
   43  terraform plan
   44  lsof terraform.tfstate;
   45  kill -INT 10458;
   46  lsof terraform.tfstate;
   47  kill -INT 10458;
   48  lsof terraform.tfstate;
   49  kill -TERM 10458;
   50  lsof terraform.tfstate;
   51  kill -KILL 10458;
   52  lsof terraform.tfstate;
   53  terraform plan;
   55  terraform plan;
   56  terraform apply
   57  terraform destroy
   58  history
   59  cd ..
   60  ls 
   61  cd terraform-00-configuracion/
   62  history
   63  aws sts get-caller-identity --region us-east-1
   64  cd ..
   65  ls 
   66  cd terraform-02-s3/
   67  terraform initterraform validate
   68  terraform init
   69  terraform validate
   70  terraform plan
   71  terraform apply
   72  terraform state list;aws s3api list-buckets --query 'Buckets[].Name' --output table;
   73  terraform plan;
   74  terraform plan;
   75  terraform destroy
   76  history
   77  cls
   78  clear
   79  aws sts get-caller-identity --region us-east-1
   80  cd ..
   81  ks
   82  ls
   83  cd terraform-03-vpc/
   84  terraform init
   85  terraform validate
   86  terraform plan
   87  terraform apply
   88  terraform state list
   89  terraform destroy
   90  history 
   91  cd ..
   92  ls
   93  terraform-04-subnets/
   94  cd terraform-04-subnets/
   95  terraform init
   96  terraform validate
   97  terraform plan
   98  cd ..
   99  ls terraform-04-subnets/
  100  terraform validateterraform init
  101  terraform validate
  102  terraform plan
  103  cd terraform-04-subnets/
  104  terraform validate
  105  terraform init
  106  terraform validate
  107  terraform plan
  108  terraform apply
  109  terraform destroy
  110  history
  111  history 100;
  112  cd ..
  113  ls
  114  cd terraform-05-security-group/
  115  terraform init
  116  terraform validate
  117  terraform plan
  118  terraform plan
  119  history 
  120  cd ..
  121  ls 
  122  cd terraform-06-routing/
  123  terraform init
  124  terraform validate
  125  terraform plan
  126  cd ..
  127  cd terraform-07-ec2-subnet/
  128  ls
  129  history
  130  terraform init
  131  terraform validate
  132  terraform plan
  133  history
  134  cd ..
  135  ls
  136  cd terraform-08-organizacion/
  137  terraform init
  138  terraform validate
  139  terraform plan
  140  cd ..
  141  cd terraform-09-variables/
  142  terraform init
  143  terraform validate
  144  terraform plan
  145  cd ..
  146  history
  147  cd terraform-10-tfvars/
  148  terraform init
  149  terraform plan -var-file="dev.tfvars"
  151  aws sts get-caller-identity && terraform plan -var-file="dev.tfvars";
  152  history
  153  cd ..
  154  cd terraform-11-outputs/
  155  cd ..
  156  cd terraform-12-data-sources/
  157  terraform init
  158  terraform plan
  159  cd ..
  160  history
  161  mkmkdir terraform-13-dependenciascd terraform-13-dependenciascode .
  162  mkdir terraform-13-dependencias
  163  cd terraform-13-dependencias
  164  code .
  165  terraform init
  166  terraform plan
  167  terraform init && terraform plan;
  169  cd ..
  170  cd terraform-14-cambios/
  171  terraform init && terraform plan;
  172  terraform apply
  173  history
  174  cd ..
  175  cd terraform-15/
  176  terraform init && terraform apply;
  177  history
  178  cd ..
  179  cd terraform-16/
  180  aws ec2 describe-vpcs --region us-east-1 --query 'Vpcs[].{ID:VpcId,CIDR:CidrBlock,Nombre:Tags[?Key==`Name`]|[0].Value,Predeterminada:IsDefault}' --output table;
  182  aws ec2 describe-vpcs --region us-east-1 --query 'Vpcs[].{ID:VpcId,CIDR:CidrBlock,Nombre:Tags[?Key==`Name`]|[0].Value,Predeterminada:IsDefault}' --output table;
  183  terraform import aws_vpc.vpc_importada vpc-08ed2860bf464652b;
  184  terraform init;
  185  terraform import aws_vpc.vpc_importada vpc-08ed2860bf464652b;
  186  terraform plan;
  187  terraform state list
  188  provider "aws" {  region = "us-east-1"}resource "aws_vpc" "vpc_aula" {  cidr_block = "10.80.0.0/16"}resource "aws_subnet" "subnets" {  count = 3  vpc_id     = aws_vpc.vpc_aula.id  cidr_block = cidrsubnet(aws_vpc.vpc_aula.cidr_block, 8, count.index + 1)  tags ={    Name = "subnet-${count.index + 1}"  }}
  189  cd ..
  190  cd terraform-17-count/
  191  terraform init
  192  cd ..
  193  cd terraform-18
  194  terraform init
  195  terraform plan
  196  cd ..
  197  ls
  198  cd terraform-19
  199  cd terraform-19-proyecto-final/
  200  terraform fmt;
  201  terraform init && terraform validate && terraform plan;
  202  terraform init
  203  pwd; ls -la;
  204  terraform fmt;
  205  terraform init && terraform validate && terraform plan;
  206  cd ..
  207  cd..
  208  cd ..
  209  ls
  210  cd CUADERNO_DE_TRABAJO1-TERRAFORM/
  211  cd "/Users/gabsitoo/Desktop/CURSO26_27/G/CUADERNO_DE_TRABAJO1-TERRAFORM" && git status && git remote -v;
  212  git init && git branch -M main && git remote add origin https://github.com/gaabsito/CUADERNO_DE_TRABAJO1-TERRAFORM.git;
  213  printf '\n.terraform/\n*.tfstate\n*.tfstate.*\n*.tfplan\ncrash.log\ncrash.*.log\n.env\n.env.*\n.aws/\n.DS_Store\nhistorial*.txt\n' >> .gitignore;
  214  git status --short; git ls-remote --heads origin;
  215  git add .gitignore;git add -- '*.tf' '*.tfvars' '.terraform.lock.hcl';git diff --cached --stat;
  217  git add .gitignore && git add -- '*.tf' '*.tfvars' '.terraform.lock.hcl' && git commit -m "Añadir ejercicios de Terraform" && git push -u origin main;
  218  git add .gitignore && git add -- '**/*.tf' '**/*.tfvars' && git commit -m "Añadir ejercicios de Terraform" && git push -u origin main;
  219  terraform destroy
  220  node --version
  221  npm i -g @nestjs/cli
  222  node --version
  223  sudo npm i -g @nestjs/cli
  224  nest new prueba1-nest
  225  nest new 01-prueba-nest
  226  cd 01-prueba-nest/
  227  npm install
  228  sudo chown -R "$(id -u):$(id -g)" "/Users/gabsitoo/.npm"
  229  npm install
  230  npm run start:dev
  231  npm run start:dev
  232  PORT=3001 npm run start:dev
  233  lls
  234  lsç
  235  ls
  236  cd patrones-nest/
  237  npx nest generate module clientes
  238  npx nest generate controller clientes --no-spec
  239  npx nest generate service clientes --no-spec
  240  npx nest generate module clientes
  241  npx nest generate controller clientes --no-spec
  242  npx nest generate service clientes --no-spec
  243  curl -X POST http://localhost:3000/clientes \  -H "Content-Type: application/json" \  -d '{"nombre":"Ana"}'
  244  curl -X POST http://localhost:3000/clientes -H "Content-Type: application/json" -d '{"nombre":"Ana"}'
  245  curl -X POST 'http://localhost:3000/clientes' -H 'Content-Type: application/json' -d '{"nombre":"Ana"}'
  246  curl -X POST 'http://localhost:3000/clientes' -H 'Content-Type: application/json' -d '{"nombre":"Ana"}'
  247  clear
  248  curl -X POST 'http://localhost:3000/clientes' -H 'Content-Type: application/json' -d '{"nombre":"Ana"}'
  249  npx @nestjs/cli@latest new patrones-nest --package-manager npm --strict
  250  √
  251  cd patrones-nest
  252  npm run start:dev
  253  npm run start:dev
  254  npm run start:dev
  255  npm run start:dev
  256  npm run start:dev
  257  cd patrones-nest/
  258  cat > src/clientes/clientes.module.ts <<'EOF'import { Module } from '@nestjs/common';import { ClientesController } from './clientes.controller.js';import { ClienteDao } from './cliente.dao.js';@Module({  controllers: [ClientesController],  providers: [ClienteDao],})export class ClientesModule {}EOF
  259  pwdcat src/clientes/clientes.module.ts
  260  pwd
  261  cat src/clientes/clientes.module.ts
  262  /Users/gabsitoo/Desktop/CURSO26_27/G/devops/01-NESTJS/patrones-nest/src/clientes/clientes.module.ts
  263  sudo /Users/gabsitoo/Desktop/CURSO26_27/G/devops/01-NESTJS/patrones-nest/src/clientes/clientes.module.ts
  264  curl -X POST localhost:3000/clientes -H 'Content-Type: application/json' -d '{"nombre":"Ana"}'
  265  curl localhost:3000/clientes
  266  curl -X POST localhost:3000/clientes -H 'Content-Type: application/json' -d '{"nombre":"Luis"}'
  267  curl localhost:3000/clientes
  268  npx tsx src/clientes/dependency-injection.ts
  269  cd patrones-nest
  270  npx tsx src/clientes/dependency-injection.ts
  273  aws sts get-caller-identity
  277  aws sts get-caller-identity
  278  cd /Users/gabsitoo/Desktop/CURSO26_27/G/CHALLENGE_01
  279  terraform -chdir=infra init
  280  terraform -chdir=infra validate
  281  terraform -chdir=infra plan -out=deploy.tfplan
  282  terraform -chdir=infra apply deploy.tfplan
  283  aws s3api head-bucket --bucket brisa-hoteles-793629871707-us-east-1
  284  terraform -chdir=infra state list
  285  cat infra/.terraform.lock.hcl
  286  aws s3api get-object-lock-configuration --bucket brisa-hoteles-793629871707-us-east-1
  287  cp infra/terraform.tfstate "infra/terraform.tfstate.backup-$(date +%Y%m%d-%H%M%S)"
  288  terraform -chdir=infra state rm aws_s3_bucket.web
  289  cp infra/terraform.tfstate "infra/terraform.tfstate.backup-$(date +%Y%m%d-%H%M%S)"
  290  terraform -chdir=infra state rm aws_s3_bucket.web
  291  terraform -chdir=infra fmt
  292  terraform -chdir=infra init -upgrade
  293  terraform -chdir=infra validate
  294  terraform -chdir=infra state rm aws_s3_bucket.web
  295  terraform -chdir=infra state list
  296  terraform -chdir=infra plan -out=deploy.tfplan
  297  terraform -chdir=infra apply deploy.tfplan
  298  terraform -chdir=infra fmt
  299  terraform -chdir=infra validate
  300  terraform -chdir=infra plan -out=deploy.tfplan
  301  terraform -chdir=infra apply deploy.tfplan
  302  terraform -chdir=infra output -raw website_urlç
  303  terraform -chdir=infra output -raw website_url
  304  cd /Users/gabsitoo/Desktop/CURSO26_27/G
  305  git clone https://github.com/gaabsito/CHALLENGE01.git CHALLENGE01-GITHUB
  306  history
MacBook-Air-de-Gabriel:G gabsitoo$ 