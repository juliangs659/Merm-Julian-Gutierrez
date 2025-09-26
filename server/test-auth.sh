#!/bin/bash

echo "=== Pruebas de Autenticación ==="
echo ""

echo "1. Probando Health Check..."
curl -X GET http://localhost:5001/api/health
echo -e "\n"

echo "2. Login con admin/admin..."
ADMIN_RESPONSE=$(curl -s -X POST http://localhost:5001/api/auth/login -H "Content-Type: application/json" -d '{"username":"admin","password":"admin"}')
echo $ADMIN_RESPONSE
echo -e "\n"

echo "3. Login con julian/123..."
USER_RESPONSE=$(curl -s -X POST http://localhost:5001/api/auth/login -H "Content-Type: application/json" -d '{"username":"julian","password":"123"}')
echo $USER_RESPONSE
echo -e "\n"

echo "4. Login con credenciales incorrectas..."
curl -s -X POST http://localhost:5001/api/auth/login -H "Content-Type: application/json" -d '{"username":"admin","password":"wrong"}'
echo -e "\n"

echo "5. Acceso a endpoint protegido con token..."
TOKEN=$(echo $ADMIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
curl -s -X GET http://localhost:5001/api/auth/me -H "Authorization: Bearer $TOKEN"
echo -e "\n"

echo "=== Pruebas completadas ==="
