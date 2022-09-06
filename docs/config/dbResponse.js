const self = module.exports = {

    errorData: (err, response, strMessage) => {
        response.status(200).json({
            status: 500,
            message: strMessage || "Error occurred!",
            count: 0,
            data: err
        });
    },

    insertData: (result, response, strMessage) => {
        response.status(200).json({
            status: 200,
            message: strMessage || "Data has been inserted successfully!",
            count: 0,
            data: result
        });
    },

    updateData: (result, response, strMessage) => {
        response.status(200).json({
            status: 200,
            message: strMessage || "Data has been updated successfully!",
            count: 0,
            data: result
        });
    },

    deleteData: (result, response, strMessage) => {
        response.status(200).json({
            status: 200,
            message: strMessage || "Data has been deleted successfully!",
            count: 0,
            data: result
        });
    },

    emptyData: (result, response, strMessage) => {
        response.status(200).json({
            status: 404,
            message: strMessage || "Data has been not found!",
            count: 0,
            data: []
        });
    },

    existData: (result, response, strMessage) => {
        response.status(200).json({
            status: 409,
            message: strMessage || "Data has been already inserted!",
            count: 0,
            data: []
        });
    },

    existData1: (result, response, strMessage) => {
        response.status(200).json({
            status: 409,
            message: strMessage || "Data has been already inserted!",
            count: 0,
            data: result
        });
    },

    Forbidden: (result, response, strMessage) => {
        response.status(200).json({
            status: 403,
            message: strMessage || "No Access!",
            count: 0,
            data: []
        });
    },

    sendAll: (result, response, strMessage) => {
        response.status(200).json({
            status: 200,
            message: strMessage || "Data has been loaded successfully!",
            count: 0,
            data: result
        });
    },

    sendData: (result, response, strMessage) => {
        let Count = 0;

        if (result.length == 2)
            Count = result[1][0].cnt;
        else
            Count = result.length;

        response.status(200).json({
            status: 200,
            message: strMessage || "Data has been loaded successfully!",
            count: Count,
            data: result[0]
        });
    },
};