kubectl apply -f pv-local.yml
kubectl apply -f mypostgres-pvc.yml

kubectl apply -f mypostgres-clusterip.yml
kubectl apply -f mypostgres-secret.yml
kubectl apply -f mypostgres-configMap.yml
kubectl apply -f mypostgres-deployment.yml

kubectl apply -f myredis-clusterip.yml
kubectl apply -f myredis-configMap.yml
kubectl apply -f myredis-deployment.yml

kubectl apply -f game_rental_backend-clusterip.yml
kubectl apply -f game_rental_backend-deployment.yml
kubectl apply -f game_rental_backend-node-port.yml

kubectl apply -f mynginx-clusterip.yml
kubectl apply -f mynginx-deployment.yml
kubectl apply -f mynginx-node-port.yml

kubectl apply -f myingress.yml