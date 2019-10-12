import { ServiceType, ServiceRequest } from "../../common/adapters/web-service";
import { WebService } from "../../common/adapters/implementations/web-service";
import { UserService as UserService } from "../user-service";
import * as UserInterface from "../interfaces/user-interface";

export default class UserServiceImplementation
    extends WebService implements UserService
{
    constructor(){
        super("user", ServiceType.ThirdPartyService);
    }

    deductPoint(
        request: UserInterface.User.Request
    ){
        return (
            serviceRequest: ServiceRequest
        ) => new Promise<UserInterface.User.Response>((
            resolve, reject
        ) => {
            serviceRequest(this).to(`/v1/deductPoint`)
                .postJSON(request)
                .then((response) => resolve(response.body))
                .catch(reject);
        });
    }
}
