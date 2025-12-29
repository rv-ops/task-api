terraform {
  required_version = ">= 1.5.0"

  backend "s3" {
    bucket         = "task-api-terraform-state-ap-south-1"
    key            = "infra/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
