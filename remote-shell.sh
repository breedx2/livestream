#!/bin/bash

# ssh into the remote instance

ssh owncast@$(terraform output -raw ip_address)

