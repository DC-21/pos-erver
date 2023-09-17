const IncomeGroups = require("../models/Groups-codes");
const axios = require("axios");

let fetchedData = [];

async function fetchGroupsCodes(req, res) {
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
async function postIncomeGroupCodes(req, res) {
  try {
    // Use the data stored in the global variable to save to the database
    console.log("Data to be saved:", fetchedData);

    // Check if there is data in the fetchedData array
    if (fetchedData.length === 0) {
      return res.status(400).json({ message: "No data to save." });
    }

    // Save the fetchedData array to the database using Sequelize bulkCreate
    await IncomeGroups.bulkCreate(fetchedData);

    // Clear the data in the global variable after saving to the database
    fetchedData = [];

    res.status(200).json({ message: "Data saved successfully." });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "An error occurred while saving data." });
  }
}

async function updateIncomeGroupCodes(req, res) {
  try {
    // Check if there is data in the fetchedData array
    if (fetchedData.length === 0) {
      return res
        .status(400)
        .json({ message: "No data to update. Please fetch data first." });
    }
    for (const incomeGroupCode of fetchedData) {
      const { code, name } = incomeGroupCode;
      const existingIncomeGroupCode = await IncomeGroups.findOne({
        where: {
          code: code,
        },
      });

      if (existingIncomeGroupCode) {
        await existingIncomeGroupCode.update({
          code: code,
          name: name,
        });
        console.log("Income Group Codes", code, "updated successfully.");
      } else {
        console.log(
          "Income Group Codes",
          code,
          "not found in the database. Skipping."
        );
      }
    }

    fetchedData = [];

    res
      .status(200)
      .json({ message: "All income group codes updated successfully." });
  } catch (error) {
    console.error("Error updating income group codes data:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating G/L accounts data." });
  }
}

module.exports = { fetchGroupsCodes, postIncomeGroupCodes,updateIncomeGroupCodes };
