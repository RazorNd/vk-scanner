#!/bin/bash

set -e

ls -la cache

pushd app

./mvnw clean package -DskipTests=true

popd

cp app/target/skaner-*.jar jars/skanner.jar

cp -vr ~/.m2/repository/ cache/
ls -la cache
