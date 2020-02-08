"use strict";

const { RESTDataSource } = require("apollo-datasource-rest");

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spacexdata.com/v2/";
  }

  // method that maps over the launches and transforms the response from our REST endpoint with this.launchReducer
  async getAllLaunches() {
    const response = await this.get("launches"); // makes GET request to https://api.spacexdata.com/v2/launches & stores the returned launches in the response variable
    return Array.isArray(response)
      ? response.map(launch => this.launchReducer(launch)) 
      : []; // if there are no responses then an empty array is returned
  }
}

module.exports = LaunchAPI;
