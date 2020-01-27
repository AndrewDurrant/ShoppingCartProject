
// getting the products
export class Products {
  async getProducts() {
    try {
      let result = await fetch('products.json');
      let data = await result.json();

      // we are destructuring the json object and getting back simplified item objects

      // assigning items array to variable and mapping over it
      let products = data.items;
      products = products.map(item => {
        // destructuring objects into more accessible variables
        const {
          title,
          price
        } = item.fields;
        const {
          id
        } = item.sys;
        const image = item.fields.image.fields.file.url;
        // return simplified object for item
        return {
          title,
          price,
          id,
          image
        };
      })
      return products;

    } catch (error) {
      console.log(error);
    }

  }
}