var siteServer = "https://backend-product-minimarket.herokuapp.com";
exports.Site = {
  ori: siteServer,
  getProduct: `${siteServer}/product/get-product`,
  getCategoryProduct: `${siteServer}/product/get-category-product`,
  uploadProduct: `${siteServer}/product/upload-product`,
  updateProduct: `${siteServer}/product/update-product`,
  removeProduct: `${siteServer}/product/remove-product`,
  registerAdmin: `${siteServer}/user/register-admin`,
  loginAdmin: `${siteServer}/user/login-admin`,
  checkToken: `${siteServer}/user/check-token`,
};
