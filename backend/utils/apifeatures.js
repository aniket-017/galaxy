class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
 
  search() {
    const keyword = this.queryStr.keyword
      ? {
          $or: [
            {
              Description: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
           
            {
              SpecifiedStandard: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              CertificationStatus: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              SurfaceFinish: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              HotForge: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              ColdForge: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              Shade: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              CoatedMaterial: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            // {
            //   MildSteelGrade: {
            //     $regex: this.queryStr.keyword,
            //     $options: "i",
            //   },
            // },
            // {
            //   AlloySteelGrade: {
            //     $regex: this.queryStr.keyword,
            //     $options: "i",
            //   },
            // },
            {
              Brand: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
           
            // Add more fields as needed
          ],
        }
      : {};
  
      console.log(keyword);
    this.query = this.query.find({ ...keyword });
  
    return this;
  }
  

  filter() {
    const querycopy = { ...this.queryStr };

    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete querycopy[key]);

    let queryStr = JSON.stringify(querycopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    if (this.queryStr.CoatedMaterial) {
        const coatedMaterials = this.queryStr.CoatedMaterial.split(",");
        queryStr = JSON.stringify({
            ...JSON.parse(queryStr),
            CoatedMaterial: { $in: coatedMaterials }
        });
    }

    // Update the query string based on other filters (e.g., CertificationStatus, SurfaceFinish) selected by the user in the frontend.

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
}



  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
