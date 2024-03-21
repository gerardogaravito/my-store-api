class CategoriesService {
  constructor() {
  }

  find(categoryId, productId) {
    return { categoryId, productId }
  }
}

module.exports = CategoriesService
