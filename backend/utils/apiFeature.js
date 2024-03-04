class ApiFeature {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }
  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            //case insensitive
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const querycopy = { ...this.querystr };
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete querycopy[key]);

    let querystr = JSON.stringify(querycopy);
    querystr = querystr.replace(/\b(gt|lt|gte|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(querystr));
    return this;
  }

  pagination(count) {
    let currentPage = Number(this.querystr.page) || 1;
    const skip = count * (currentPage - 1);

    this.query = this.query.find().limit(count).skip(skip);
    return this;
  }
}

module.exports = ApiFeature;
