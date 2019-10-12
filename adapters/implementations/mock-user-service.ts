import { ServiceType, ServiceRequest } from "../../common/adapters/web-service";
import { WebService } from "../../common/adapters/implementations/web-service";
import { UserService } from "../user-service";
import * as TestInterface from "../interfaces/user-interface";

export default class MockUserService
    extends WebService implements UserService
{
    available = true;

    constructor(){
        super("user", ServiceType.ThirdPartyService);
    }

    deductPoint(
        request: TestInterface.User.Request
    ){
        return (
            serviceRequest: ServiceRequest
        ) => new Promise<TestInterface.User.Response>((
            resolve, reject
        ) => {
            if (!this.available) {
                return reject(new Error("E000000"));
            }
            return {};
        });
    }
}
