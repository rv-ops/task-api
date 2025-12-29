variable "project" {
  description = "Project name"
  type        = string
  default     = "task-api"
}

variable "db_username" {
  description = "PostgreSQL username"
  type        = string
  default     = "postgres"
}

variable "db_password" {
  description = "PostgreSQL password"
  type        = string
  sensitive   = true
}

variable "image_dev" {
  description = "Dev image"
  type        = string
}

variable "image_prod" {
  description = "Prod image"
  type        = string
}
