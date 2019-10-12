import { BasicApplication, BasicApplicationOptions } from "./common/app";

import { internal as Config } from "./common/config";
import Routes from "./routes";
import Database from "./adapters/database";
import MockDatabase from "./adapters/implementations/mock-database";
import MongoDBDatabase from "./adapters/implementations/mongodb-database";
import MessageBroker from "./common/adapters/messaging";
import MockBroker from "./common/adapters/implementations/mock-messaging";
import { CatalogueService } from "./adapters/catalogue-service";
import {
    default as RealCatalogueService
} from "./adapters/implementations/catalogue-service";
import {
    default as MockCatalogueService
} from "./adapters/implementations/mock-catalogue-service";

import { UserService } from "./adapters/user-service";
import {
    default as RealUserService
} from "./adapters/implementations/user-service";
import {
    default as MockUserService
} from "./adapters/implementations/mock-user-service";
const SERVICE_NAME = "microservice-redemption-service";

class CustomApplication extends
    BasicApplication<Database, MessageBroker> {
    catalogue : CatalogueService;
    user : UserService;
    constructor(
        options: BasicApplicationOptions<
            Database, MessageBroker
        > & {
            catalogue:CatalogueService
            user : UserService;
        },
        override?: {
            [env: string]: Partial<BasicApplicationOptions<
                Database, MessageBroker
            >> & {
                catalogue:CatalogueService
                user : UserService;
            };
        }
    ){
        super(options, override);
        this.catalogue = options.catalogue;
        this.user = options.user;
        let environment = process.env["NODE_ENV"] || "";
        if (override && override[environment]) {
            let overrideOptions = override[environment];
            if (overrideOptions.catalogue) {
                this.catalogue = overrideOptions.catalogue;
            }
            if (overrideOptions.user) {
                this.user = overrideOptions.user;
            }
        }

    }
}

export default new CustomApplication({
    module: module,
    database: new MockDatabase(),
    broker: new MockBroker(),
    catalogue: new RealCatalogueService(),
    user: new RealUserService()
}, {
    local: {
        database: new MockDatabase(),
        broker: new MockBroker(),
        catalogue: new MockCatalogueService(),
        user: new MockUserService()
    },
    test: {
        database: new MockDatabase(),
        broker: new MockBroker(),
        catalogue: new MockCatalogueService(),
        user: new MockUserService()
    }
}).routes(Routes).start();
