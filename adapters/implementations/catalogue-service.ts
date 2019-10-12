import { ServiceType, ServiceRequest } from "../../common/adapters/web-service";
import { WebService } from "../../common/adapters/implementations/web-service";
import { CatalogueService as CatalogueService } from "../catalogue-service";
import * as CatalogueInterface from "../interfaces/catalogue-interface";

export default class UserServiceImplementation
    extends WebService implements CatalogueService
{
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
            serviceRequest(this).to(`/v1/deductItems`)
                .postJSON(request)
                .then((response) => resolve(response.body))
                .catch(reject);
        });
    }
}
