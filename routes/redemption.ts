import Router from "../common/router";
import App from "../app";

import {
    redemption
} from "../controllers/redemption-controller";
const router = Router(() => App);

router.route("/redemption").post(redemption);

export default router;
