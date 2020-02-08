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

  // method to transform the data to fit Launch schema data type
  launchReducer(launch) {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
    };
  }
}

module.exports = LaunchAPI;
