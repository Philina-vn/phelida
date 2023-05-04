FROM amazoncorretto:19
COPY /src/main/resources/db/migration /src/main/resources/db/migration
COPY /src/main/images /src/main/images
ADD /build/libs/phelida-0.0.1-SNAPSHOT.jar phelida-backend.jar
ENTRYPOINT ["java", "-jar", "phelida-backend.jar"]
