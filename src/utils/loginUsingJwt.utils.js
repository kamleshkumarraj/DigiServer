import { asyncErrorHandler } from "../errors/asynError.js";

export const loginWithJWT = asyncErrorHandler(async (user, res, type = "User") => {
    const token = user.getJWTToken();
    const option = {
        expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly : true,
        sameSite : "None"
    }
    res.cookie('token', token, option).status(200).json({
        success : true,
        message : `${type} logged in successfully !`,
        token
    })
})