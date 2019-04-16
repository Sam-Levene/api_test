"use strict"

const expect = require("chai").expect
const path = require("path")
const { Pact } = require("@pact-foundation/pact")
const { getEmployees } = require("../index")

describe("The Dummy API Example", () => {
  let url = "http://localhost"
  const port = 8888

  const provider = new Pact({
    port: port,
    log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    spec: 2,
    consumer: "MyConsumer",
    provider: "MyProvider",
    pactfileWriteMode: "merge",
  })

  const EXPECTED_BODY = {
	  "id":"25142",
	  "employee_name":"40002",
	  "employee_salary":"123",
	  "employee_age":"23",
	  "profile_image":""
    }

  // Setup the provider
  before(() => provider.setup())

  // Write Pact when all tests done
  after(() => provider.finalize())

  // verify with Pact, and reset expectations
  afterEach(() => provider.verify())

  describe("get /employees", () => {
    before(done => {
      const interaction = {
        state: "i have a list of employees",
        uponReceiving: "a request for all employees",
        withRequest: {
          method: "GET",
          path: "/api/v1/employees",
          headers: {
            Accept: "application/json",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: EXPECTED_BODY,
        },
      }
      provider.addInteraction(interaction).then(() => {
        done()
      })
    })

    it("returns the correct response", done => {
      const urlAndPort = {
        url: url,
        port: port,
      }
      getEmployees(urlAndPort).then(response => {
        expect(response.data).to.include(EXPECTED_BODY)
        done()
      }, done)
    })
  })
})