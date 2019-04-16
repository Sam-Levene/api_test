"use strict"

const axios = require("axios")

exports.getEmployees = endpoint => {
  const url = endpoint.url
  const port = endpoint.port

  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: "/api/v1/employees",
    headers: { Accept: "application/json" },
  })
}