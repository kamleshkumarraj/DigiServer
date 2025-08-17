import { asyncErrorHandler } from "../errors/asynError.js";

export const registerBatch = asyncErrorHandler(async (req, res, next) => {
    const { batchName, classRoomId } = req.body;

    // Check if batch already exists
    const existingBatch = await Batch.findOne({ batchName, classRoomId });
    if (existingBatch) {
        return next(new ErrorHandler("Batch already exists!", 400));
    }

    // Create new batch
    const newBatch = await Batch.create({ batchName, classRoomId });

    res.status(201).json({
        success: true,
        message: "Batch created successfully!",
        data: newBatch
    });
});