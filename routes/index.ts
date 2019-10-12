import Router from "../common/router";

import loyalty from "./redemption";

const router = Router();

router.use("/v1", loyalty);

export default router;
