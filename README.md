# EOS Power Up Resource Watcher

This script is meant to be run as a cron job that checks if an accounts CPU and NET resources are below a certain threshold.

If the resources are low it will call a `powerup` action to top aff available resources for the contract.

Parameters are defined in the `.env.example` file.