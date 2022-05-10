"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/guides/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
     /**
   * Create a cart record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    // console.log('backend create state', ctx.state)
    const { total, dishes, email } = ctx.request.body;

    // Register the cart in the database
    const cart = await strapi.services.cart.create({
      total,
      dishes,
      email
    });
    
    return cart;
  },

  update: async (ctx) => {
    // console.log('backend update', ctx.request.body)
    const { total, dishes, id, email } = ctx.request.body;
    //update cart in the database
    const cart = await strapi.services.cart.update({
      total,
      dishes,
      id, 
      email
    });
    return cart;
  },

  find: async (ctx) => {
    // console.log('backend find', ctx.request.params)
    const {email} = ctx.request.params
    const cart = await strapi.services.cart.find({
      email: email
    })
    return cart;
  },

  delete: async (ctx) => {
    // console.log('backend delete', ctx.request.params)
    const { email } = ctx.request.params
    const cart = await strapi.services.cart.delete({email:email})
    return cart;
  }
};
