class CourseFeature {
    constructor(query , queryString){
        this.query = query;
        this.queryString = queryString
    }
    search(){
        const keyword = this.queryString.keyword ?  {
            courseName : {
                $regex : this.queryString.keyword ,
                $options : "i"
            }
        } : {}
        console.log(keyword)
        this.query = this.query.find({...keyword})
        return this;
    }
    filter() {
    const queryCopy = { ...this.queryString };
    console.log(queryCopy);

    // Removing fields from the query
    const removeFields = ['keyword', 'limit', 'page'];
    removeFields.forEach(elem => delete queryCopy[elem]);

    // Update the query object with the filtered query
    this.query = this.query.find(queryCopy);
    console.log(queryCopy);

    // Advanced filter for roles, semesters, etc.
    let queryString = JSON.stringify(queryCopy);
    queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `${match}`);
    console.log(queryString);

    // Update the query object with the advanced filter
    this.query = this.query.find(JSON.parse(queryString));

    // Return the updated query object
    return this;
}

    pagination(resPerPage) {
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query = this.query.limit(resPerPage).skip(skip);
        return this; // Return the updated query object
    }
}

module.exports = CourseFeature