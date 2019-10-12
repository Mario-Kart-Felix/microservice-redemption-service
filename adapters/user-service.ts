import Adapter from "../common/adapters/adapter";
import { ServiceOperation } from "../common/adapters/web-service";
import {
    User
} from "./interfaces/user-interface";

export interface UserService extends Adapter {
    deductPoint(
        request: User.Request
    ): ServiceOperation<User.Response>;
}

export default UserService;
