export class ImageModel {
    url = '';
    width = 0;
    height = 0;

    constructor( item ) {
        this.url = item.url;
        this.width = item.width;
        this.height = item.height;
    }
}

export class ResponsiveImageModel {
    type =  '';
    original = ''
    sizes =  [];

    constructor(  ) {
        this.type = '';
        this.original = '';
        this.sizes = [];
    }
    transform( image ) {
        this.type = image.category;
        this.original = ( image.items || [] ).find( elem => !elem.width );
        this.sizes = ( image.items || [] )
            .filter( item => item.width )
            .map( item => new ImageModel( item  ) )
            .sort( ( first, second ) => first.width - second.width );
        return this;
    }
}
