import  axiosInstance  from '@core/utils/axios.js'

const authHeader = (tokenParam) => {
    const token = tokenParam;
    //console.log(token)
    if ( token ) {
        //console.log({'Authorization': 'Bearer ' + token})
        return {'Authorization': 'Bearer ' + token};
    } else {
        return {};
    }
}

export const addProduct = ( productDto, token ) => axiosInstance.post( "/product/add", productDto, { headers: authHeader( token ) } )

export const bidDto = ( bidDto, token ) => axiosInstance.post( "/product/add/bid", bidDto, {headers:authHeader(token)} )

export const authenticateUser = ( credentialsDto ) => axiosInstance.post( "/authenticate", credentialsDto )

export const registerUser = ( registerDto ) => axiosInstance.post( "/register", registerDto )

export const getOrdersByUser = ( username, token ) => axiosInstance.get( "/order/find/username/" + username, { headers: authHeader( token ) } )

export const findProductByCategory = ( category ) => axiosInstance.get( `/product/find/category/${category}` )

export const sellProduct = ( productId, token ) => axiosInstance.post( `/product/sell/${productId}`, null, { headers: authHeader( token ) } )

export const addOrder = ( orderDetails, token ) => axiosInstance.post( `/order/add`, orderDetails, { headers: authHeader( token ) } )

export const findProductsByUsername = ( username, token ) => axiosInstance.get( `/product/find/username/${username}`, { headers: authHeader( token ) } )

export const pay = ( amount, token, currency ) => axiosInstance.post( '/payment', { amount, token, currency })
