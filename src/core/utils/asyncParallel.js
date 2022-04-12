let fn = ( promises ) => {
    return Promise.all( promises.map( item => item() ) );
};

export default fn;
