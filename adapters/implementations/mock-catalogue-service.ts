import { ServiceType, ServiceRequest } from "../../common/adapters/web-service";
import { WebService } from "../../common/adapters/implementations/web-service";
import { CatalogueService } from "../catalogue-service";
import * as CatalogueInterface from "../interfaces/catalogue-interface";

export default class MockCatalogueService
    extends WebService implements CatalogueService
{
    available = true;

    constructor(){
        super("catalogue", ServiceType.ThirdPartyService);
    }

    deductItems(
        request: CatalogueInterface.Catalogue.Request
    ){
        return (
            serviceRequest: ServiceRequest
        ) => new Promise<CatalogueInterface.Catalogue.Response>((
            resolve, reject
        ) => {
            if (!this.available) {
                return reject(new Error("E000000"));
            }
            return {};
        });
    }
}
