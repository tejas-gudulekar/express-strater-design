import Keycloak from "keycloak-connect";
import { redisStore } from "../redis-session";

/*
  Checking if required environment is present
*/
const keycloakURL = process.env.KEYCLOAK_URL;
if (!keycloakURL) throw Error("Environment: KEYCLOAK_URL is not defined");
const keycloakRealm = process.env.KEYCLOAK_REALM;
if (!keycloakRealm) throw Error("Environment: KEYCLOAK_REALM is not defined");
const keycloakClientId = process.env.KEYCLOAK_CLIENTID;
if (!keycloakClientId) throw Error("Environment: KEYCLOAK_CLIENTID is not defined");
const keycloakPrivateKey = process.env.KEYCLOAK_PRIVATE_KEY;
if (!keycloakPrivateKey) throw Error("Environment: KEYCLOAK_PRIVATE_KEY is not defined");
const keycloakPort = process.env.KEYCLOAK_PORT;
if (!keycloakPort) throw Error("Environment: KEYCLOAK_PORT is not defined");

const kcConfig = {
  clientId: keycloakClientId,
  bearerOnly: true,
  serverUrl: keycloakURL,
  realm: keycloakRealm,
  realmPublicKey: keycloakPrivateKey,
  "ssl-required": "external",
  resource: keycloakClientId,
  "confidential-port": keycloakPort,
  "auth-server-url": keycloakURL,
  "use-resource-role-mappings": true,
};

// const keycloak = new Keycloak({ store: memoryStore });
const keycloak = new Keycloak({ store: redisStore }, kcConfig);

export default keycloak;
