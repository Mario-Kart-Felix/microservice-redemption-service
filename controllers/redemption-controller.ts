import { ControllerDelegate } from "../common/middlewares/controller";
import App from "../app";
import {User} from "../adapters/interfaces/user-interface";
import {Catalogue} from "../adapters/interfaces/catalogue-interface";
import { stringify } from "querystring";

export let redemption: ControllerDelegate<{
    customer_id: string,
    RewardRef:string
}, {
}> = {
    expectations: {
        body: {
            customer_id: {
                type: "string",
                required: true
            },
            RewardRef: {
                type: "string",
                required: true
            }
        }
    },
    perform: async(request) => {
        // deduct point
        let userRequest:User.Request = {
            customer_id : request.body.customer_id
        };

        let responseUser = await request.call(App.user.deductPoint(
            userRequest
        ));

        // deduct item
        let catalogueRequest:Catalogue.Request = {
            RewardRef : request.body.RewardRef
        };

        let responseCatalogue = await request.call(App.catalogue.deductItems(
            catalogueRequest
        ));
        return {
            status: 200
        };
    }
};

