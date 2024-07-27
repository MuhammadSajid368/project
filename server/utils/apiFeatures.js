class APIFeatures {
    constructor(query , queryString){
        this.query = query;
        this.queryString = queryString
    }
    search(){
        const keyword = this.queryString.keyword ?  {
            email : {
                $regex : this.queryString.keyword ,
                $options : "i"
            }
        } : {}
        console.log(keyword)
        this.query = this.query.find({...keyword})
        return this;
    }
    filter(){
        const queryCopy = {
            ...this.queryString
        }
        console.log(queryCopy)
        
        /// removing fields from the query
        const removeFields = ['keyword' , 'limit' , 'page']
        removeFields.forEach(elem => delete queryCopy[elem])
        this.query = this.query.find(queryCopy)
        console.log(queryCopy)

        //// Advance filter for role , semeester etc
        let queryString = JSON.stringify(queryCopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g , match => `${match}`)
        console.log(queryString)
        this.query = this.query.find(JSON.parse(queryString))
    }
    pagination(resPerPage){
        const currentPage = Number(this.queryString.page) || 1
        const skip = resPerPage * (currentPage - 1)
        this.query = this.query.limit(resPerPage).skip(skip)
        return this
    }
}


export  {APIFeatures} 