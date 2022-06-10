import  axiosInstance  from '@core/utils/axios.js'

const authHeader = (tokenParam) => {
    const token = tokenParam;
    console.log(token)
    if ( token ) {
        console.log({'Authorization': 'Bearer ' + token})
        return {'Authorization': 'Bearer ' + token};
    } else {
        return {};
    }
}

export const addProduct = ( productDto, token ) => axiosInstance.post( "/product/add", productDto, {headers:authHeader(token)} )

export const authenticateUser = ( credentialsDto ) => axiosInstance.post( "/authenticate", credentialsDto )

export const registerUser = ( registerDto ) => axiosInstance.post( "/register", registerDto )

export const getOrdersByUser = ( username, token ) => axiosInstance.get( "/order/find/username/" + username, { headers: authHeader( token ) } )

export const findProductByCategory = ( category) => axiosInstance.get( `/product/find/category/${category}`)
