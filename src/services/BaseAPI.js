import instance from "./config/instanceAxios"

export const getItems = async (url, params)=>{
    try{
        const response = await instance().get(url, {
            params: params
        })
        return response
    }
    catch(error){
        return error;
    }
}

export const createFormData = async (url, data)=>{
    try{
        const response = await instance().post(url, data, {
            headers: { 
                'Content-Type': 'multipart/form-data',
             },
        })
        return response
    }
    catch(e){
        console.log("errors: ", e.message())
        return null;
    }
}

export const postItem = async (url, data)=>{
    try{
        const response = await instance().post(url, data)
        return response
    }
    catch(error){
        return error;
    }
}

export const deleteItem = async (url, data)=>{
    try{
        const response = await instance().delete(url, data)
        return response
    }
    catch(error){
        return error;
    }
}