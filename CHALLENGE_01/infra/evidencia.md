
The default interactive shell is now zsh.
To update your account to use zsh, please run `chsh -s /bin/zsh`.
For more details, please visit https://support.apple.com/kb/HT208050.
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ ls
README.md       infra           web             web.txt
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ mv web/style.css web/styles.csssed -i '' 's/style\.css/styles.css/g' web/index.html infra/main.tf
mv: infra/main.tf is not a directory
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ mv web/style.css web/styles.css
mv: web/style.css: No such file or directory
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ cat infra/main.tf
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
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra plan -out=deploy.tfplan

Planning failed. Terraform encountered an error while generating this plan.

╷
│ 
│   with provider["registry.terraform.io/hashicorp/aws"],
│   on main.tf line 12, in provider "aws":
│   12: provider "aws" {
│ 
│ Please see https://registry.terraform.io/providers/hashicorp/aws
│ 
│ 
╵
{
    "UserId": "AROA3RSAGZZNQLA7BMZIZ:user1609577=Gabriel_Galan",
    "Account": "793629871707",
    "Arn": "arn:aws:sts::793629871707:assumed-role/voclabs/user1609577=Gabriel_Galan"
}
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra plan -out=deploy.tfplan
data.aws_s3_bucket.web: Reading...
data.aws_s3_bucket.web: Read complete after 1s [id=brisa-hoteles-793629871707-us-east-1]
aws_s3_bucket_public_access_block.web: Refreshing state... [id=brisa-hoteles-793629871707-us-east-1]
aws_s3_bucket_server_side_encryption_configuration.web: Refreshing state... [id=brisa-hoteles-793629871707-us-east-1]
aws_s3_bucket_website_configuration.web: Refreshing state... [id=brisa-hoteles-793629871707-us-east-1]
aws_s3_bucket_policy.web: Refreshing state... [id=brisa-hoteles-793629871707-us-east-1]
aws_s3_object.web["style.css"]: Refreshing state... [id=brisa-hoteles-793629871707-us-east-1/style.css]
aws_s3_object.web["index.html"]: Refreshing state... [id=brisa-hoteles-793629871707-us-east-1/index.html]
aws_s3_object.web["app.js"]: Refreshing state... [id=brisa-hoteles-793629871707-us-east-1/app.js]

Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create
  ~ update in-place
  - destroy

Terraform will perform the following actions:

  # aws_s3_bucket_policy.web will be updated in-place
  ~ resource "aws_s3_bucket_policy" "web" {
        id     = "brisa-hoteles-793629871707-us-east-1"
      ~ policy = jsonencode(
          ~ {
              ~ Statement = [
                  ~ {
                      ~ Resource  = [
                            # (1 unchanged element hidden)
                            "arn:aws:s3:::brisa-hoteles-793629871707-us-east-1/index.html",
                          ~ "arn:aws:s3:::brisa-hoteles-793629871707-us-east-1/style.css" -> "arn:aws:s3:::brisa-hoteles-793629871707-us-east-1/styles.css",
                        ]
                        # (4 unchanged attributes hidden)
                    },
                ]
                # (1 unchanged attribute hidden)
            }
        )
        # (2 unchanged attributes hidden)
    }

  # aws_s3_object.web["index.html"] will be updated in-place
  ~ resource "aws_s3_object" "web" {
        id                            = "brisa-hoteles-793629871707-us-east-1/index.html"
      ~ source_hash                   = "2cc02d926181c74c876793ee3e8e53c4" -> "20ebe94c69893ddb4b5b08e44f943e45"
        tags                          = {}
      + version_id                    = (known after apply)
        # (26 unchanged attributes hidden)
    }

  # aws_s3_object.web["style.css"] will be destroyed
  # (because key ["style.css"] is not in for_each map)
  - resource "aws_s3_object" "web" {
      - arn                           = "arn:aws:s3:::brisa-hoteles-793629871707-us-east-1/style.css" -> null
      - bucket                        = "brisa-hoteles-793629871707-us-east-1" -> null
      - bucket_key_enabled            = false -> null
      - cache_control                 = "public, max-age=300" -> null
      - content_type                  = "text/css; charset=utf-8" -> null
      - etag                          = "788c78bb6aab5bc3dcd361d555d7c5b7" -> null
      - force_destroy                 = false -> null
      - id                            = "brisa-hoteles-793629871707-us-east-1/style.css" -> null
      - key                           = "style.css" -> null
      - metadata                      = {} -> null
      - region                        = "us-east-1" -> null
      - server_side_encryption        = "AES256" -> null
      - source                        = "./../web/style.css" -> null
      - source_hash                   = "788c78bb6aab5bc3dcd361d555d7c5b7" -> null
      - storage_class                 = "STANDARD" -> null
      - tags                          = {} -> null
      - tags_all                      = {
          - "ManagedBy" = "Terraform"
          - "Project"   = "challenge-01-hoteles"
        } -> null
        # (13 unchanged attributes hidden)
    }

  # aws_s3_object.web["styles.css"] will be created
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
      + key                    = "styles.css"
      + kms_key_id             = (known after apply)
      + region                 = "us-east-1"
      + server_side_encryption = (known after apply)
      + source                 = "./../web/styles.css"
      + source_hash            = "788c78bb6aab5bc3dcd361d555d7c5b7"
      + storage_class          = (known after apply)
      + tags_all               = {
          + "ManagedBy" = "Terraform"
          + "Project"   = "challenge-01-hoteles"
        }
      + version_id             = (known after apply)
    }

Plan: 1 to add, 2 to change, 1 to destroy.

─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

Saved the plan to: deploy.tfplan

To perform exactly these actions, run the following command to apply:
    terraform apply "deploy.tfplan"
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ terraform -chdir=infra apply deploy.tfplan
aws_s3_object.web["style.css"]: Destroying... [id=brisa-hoteles-793629871707-us-east-1/style.css]
aws_s3_bucket_policy.web: Modifying... [id=brisa-hoteles-793629871707-us-east-1]
aws_s3_object.web["styles.css"]: Creating...
aws_s3_object.web["index.html"]: Modifying... [id=brisa-hoteles-793629871707-us-east-1/index.html]
aws_s3_object.web["style.css"]: Destruction complete after 1s
aws_s3_bucket_policy.web: Modifications complete after 2s [id=brisa-hoteles-793629871707-us-east-1]
aws_s3_object.web["styles.css"]: Creation complete after 2s [id=brisa-hoteles-793629871707-us-east-1/styles.css]
aws_s3_object.web["index.html"]: Modifications complete after 2s [id=brisa-hoteles-793629871707-us-east-1/index.html]

Apply complete! Resources: 1 added, 2 changed, 1 destroyed.

Outputs:

bucket_name = "brisa-hoteles-793629871707-us-east-1"
website_url = "http://brisa-hoteles-793629871707-us-east-1.s3-website-us-east-1.amazonaws.com"
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ aws s3 cp web/ s3://brisa-hoteles-793629871707-us-east-1/ --recursive
upload: web/app.js to s3://brisa-hoteles-793629871707-us-east-1/app.js
upload: web/styles.css to s3://brisa-hoteles-793629871707-us-east-1/styles.css
upload: web/index.html to s3://brisa-hoteles-793629871707-us-east-1/index.html
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ history
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
  188  provider "aws" {  region = "us-east-1"}resource "aws_vpc" "vpc_aula" {  cidr_block = "10.80.0.0/16"}resource "aws_subnet" "subnets" {  count = 3  vpc_id     = aws_vpc.vpc_aula.id  cidr_block = cidrsubnet(aws_vpc.vpc_aula.cidr_block, 8, count.index + 1)  tags = {    Name = "subnet-${count.index + 1}" }}
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
  307  cd ..
  308  cd..
  309  node --version
  310  npx create-expo-app@latest cuaderno-rn --template blank-typescript
  311  npx create-expo-app@latest cuaderno-gabriel-01 --template blank-typescript
  312  npx create-expo-app@latest cuaderno-gabriel-01 --template blank-typescript
  313  cd cuaderno-gabriel-01
  314  npm install
  315  npm start
  316  npx expo start
  317  npx expo login
  318  npx expo start
  319  ls
  320  mv web/style.css web/styles.csssed -i '' 's/style\.css/styles.css/g' web/index.html infra/main.tf
  321  mv web/style.css web/styles.css
  322  cat infra/main.tf
  323  terraform -chdir=infra plan -out=deploy.tfplan
  325  terraform -chdir=infra plan -out=deploy.tfplan
  326  terraform -chdir=infra apply deploy.tfplan
  327  aws s3 cp web/ s3://brisa-hoteles-793629871707-us-east-1/ --recursive
  328  history
MacBook-Air-de-Gabriel:CHALLENGE_01 gabsitoo$ 
