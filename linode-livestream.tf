terraform {
  required_providers {
    linode = {
      source = "linode/linode"
      version = "1.18.0"
    }
  }
}

variable "LINODE_API_TOKEN" {
	description = "linode api token"
	type = string
	sensitive = true
}
variable "ROOT_PASSWORD" {
	description = "root password on the box"
	type = string
	sensitive = true
}
variable "SSH_KEY" {
	description = "public ssh key to authorize"
	type = string
	sensitive = true
}
provider "linode" {
  token = var.LINODE_API_TOKEN
}

resource "linode_instance" "livestream" {
  image = "linode/debian11"
  label = "livestream"
  group = "livestream"
  region = "us-west"
  #type = "g6-nanode-1"
  #type = "g6-standard-4"
  #type = "g6-standard-6"
  #type = "g6-standard-16"
  type = "g6-standard-4"
  authorized_keys = [ var.SSH_KEY ]
  root_pass = var.ROOT_PASSWORD
}

output "ip_address" {
  value = linode_instance.livestream.ip_address
}
