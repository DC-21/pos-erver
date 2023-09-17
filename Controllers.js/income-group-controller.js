const IncomeGroups = require("../models/Groups-codes");
const axios = require("axios");

let fetchedData = [];

async function fetchGroupsCodes(req,res) {
  try {
    const loginUrl =
      "http://23.254.128.117:7048/BusinessCentral140/ODataV4/Company('Mulonga%20Water%20Supply')/IncomeGroups";

    const username = "WEBUSER";
    const password = "Pass@123";
    const authCredentials = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );

    const headers = {
      Authorization: `Basic ${authCredentials}`,
    };

    const dataResponse = await axios.get(loginUrl, { headers });
    const rawData = dataResponse.data.value;

    const formattedData = rawData.map((incomegroups) => ({
      code: incomegroups.Code,
      name: incomegroups.Name,
    }));

    fetchedData = formattedData;
    console.log("Data fetched:", fetchedData);
    res
      .status(200)
      .json({ message: "Data fetched successfully.", data: fetchedData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "An error occurred while fetching data." });
  }
}

module.exports={fetchGroupsCodes};
