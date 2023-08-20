class ApiFeatures {
  constructor(query, queryObject) {
    this.query = query;
    this.queryObject = queryObject;
  }

  filter() {
    const queryObj = { ...this.queryObject };
    const excludedFileds = ['page', 'sort', 'limit', 'fields'];
    excludedFileds.forEach((field) => delete queryObj[field]);

    // Handle price filter
    if (queryObj.price) {
      queryObj.price = { $lte: queryObj.price };
    }

    this.query = this.query.find(queryObj);
    return this;
  }

  sort() {
    if (this.queryObject.sort) {
      const sortBy = this.queryObject.sort;
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-rating');
    }

    return this;
  }

  paginate() {
    const limit = this.queryObject.limit * 1 || 6;
    const page = this.queryObject.page * 1 || 1;
    const skip = limit * (page - 1);

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  limit() {
    this.query = this.query.select('-__v');
    return this;
  }
}

module.exports = ApiFeatures;
