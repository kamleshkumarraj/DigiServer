import { asyncErrorHandler } from "../errors/asynError.js";

export const loginWithJWT = asyncErrorHandler(async (user, res) => {
    const token = user.getJWTToken();

    const option = {
        expires : new Date(Date.now() + 4 * 60 * 60 * 1000),
        httpOnly : true,
    }
    
    res.cookie(`token`, token, option).status(200).json({
        success : true,
        message : `User logged in successfully !`,
        token
    })

})