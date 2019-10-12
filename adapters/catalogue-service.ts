import Adapter from "../common/adapters/adapter";
import { ServiceOperation } from "../common/adapters/web-service";
import {
    Catalogue
} from "./interfaces/catalogue-interface";

export interface CatalogueService extends Adapter {
    deductItems(
        request: Catalogue.Request
    ): ServiceOperation<Catalogue.Response>;
}

export default UserService;
